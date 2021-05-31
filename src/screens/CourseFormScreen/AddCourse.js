import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { format } from 'date-fns';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../constants/Colors';
import locateCurrentPosition from '../../services/location';

import adjust from '../../services/adjust';
import Button from '../../commons/Button';
import CoursesApi from '../../api/courses';
import DateModal from './DateModal';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function AddCourse({ navigation, route }) {
  const { course, mode, eventType } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [systemModalVisible, setSystemModalVisible] = useState(false);
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [startTime, setStartingTime] = useState('');
  const [distanceMetricSystem, setDistanceMetricSystem] = useState('mi');
  const [startCoordinates, setStartCoordinates] = useState(null);
  const [finishCoordinates, setFinishCoordinates] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [coords, setCoords] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({});

  const mili = course.startTime ? Date.parse(course.startTime) : 0;

  const movementType = 'walking'; // 'walking';
  const APIKEY = 'AIzaSyCE1K5XjF-5pIPfyqKmC1JUfT8Qj1TwzYc';

  const ASPECT_RATIO = windowWidth / windowHeight;
  const LATITUDE_DELTA = 0.05;
  const LONGITUDE_DELTA = 0.1 * ASPECT_RATIO;

  /* eslint-disable */
  const decode = (t, e) => {
    for (var n, o, u = 0, l = 0, r = 0, d = [],
      h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
      a = null, h = 0, i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5;
      while (a >= 32); n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
      do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5;
      while (a >= 32); o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c]);
    }
    return d = d.map((t) => ({ latitude: t[0], longitude: t[1] }));
  };
  /* eslint-enable */

  const formatCoordinates = (unformattedCoordinates) => `${unformattedCoordinates.latitude},${unformattedCoordinates.longitude}`;

  const getDirections = async () => {
    try {
      const origin = formatCoordinates(startCoordinates);
      const destination = formatCoordinates(finishCoordinates);
      const formatWaypoints = waypoints.map((point) => formatCoordinates(point)).join('|');
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${movementType}&waypoints=${formatWaypoints || ''}`);
      const respJson = await resp.json();
      const points = decode(respJson.routes[0].overview_polyline.points);
      setCoords(points);
      return coords;
    } catch (error) {
      Alert.alert('Can\'t place marker in this location');
      waypoints.splice(waypoints.length - 1, 1);
      console.log('---error---', error);
      return error;
    }
  };

  const getAddressFromCoordinates = async (coordinates) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}&key=${APIKEY}&language=en`;
    const resp = await fetch(url);
    const respJson = resp.json();
    return respJson;
  };

  if (startCoordinates) {
    getAddressFromCoordinates(startCoordinates).then((res) => {
      setStartPoint(res.results[0].formatted_address);
    });
  }

  if (finishCoordinates) {
    getAddressFromCoordinates(finishCoordinates).then((res) => {
      setEndPoint(res.results[0].formatted_address);
    });
  }

  useEffect(() => {
    if (startCoordinates && finishCoordinates) {
      getDirections();
    }
  }, [startCoordinates, finishCoordinates, waypoints]);

  useEffect(() => {
    if (mapModalVisible) {
      locateCurrentPosition();

      if (mode === 'create') {
        const getCurrentLocation = async () => {
          const currentLocation = await locateCurrentPosition();
          return currentLocation;
        };

        getCurrentLocation().then((res) => {
          setCurrentPosition(res);
        });
      } if (mode === 'edit') {
        setCurrentPosition({
          latitude: startCoordinates.latitude,
          longitude: finishCoordinates.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      }
    }
  }, [mapModalVisible]);

  const validate = (data) => {
    const keys = Object.keys(data);
    const inputValues = Object.values(data);
    // eslint-disable-next-line guard-for-in
    // eslint-disable-next-line no-restricted-syntax
    for (const key in keys) {
      if (inputValues[key] === '') {
        if (keys[key] === 'endPoint') {
          Alert.alert('Please fill in property "End Point" in the form');
        } else if (keys[key] === 'startPoint') {
          Alert.alert('Please fill in property "Start Point" in the form');
        } else if (keys[key] === 'startTime') {
          Alert.alert('Please fill in property "Starting Time" in the form');
        } else if (keys[key] === 'distanceMetricSystem') {
          Alert.alert(
            'Please fill in property "Distance Metric System" in the form'
          );
        } else {
          Alert.alert(`Please fill in property "${keys[key]}" in the form`);
        }
        return false;
      }
    }
    return true;
  };

  const confirmWaypoint = (newWaypoint) => {
    Alert.alert(
      'Confirm waypoint',
      'Are you sure you want to add waypoint?',
      [
        { text: 'NO', onPress: () => null, style: 'cancel' },
        { text: 'YES', onPress: () => setWaypoints((oldWaypoints) => [...oldWaypoints, newWaypoint]) },
      ],
      { cancelable: true }
    );
  };

  const dragWaypoint = (newValue, waypointIndex) => {
    // eslint-disable-next-line max-len
    const draggedWaypoint = waypoints.map((obj, index) => (waypointIndex === index ? newValue : obj));
    setWaypoints(draggedWaypoint);
  };

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const dateParts = selectedDate.split('-');
      const timeParts = selectedTime.split(':');
      const startingTime = new Date(
        +dateParts[0],
        +dateParts[1] - 1,
        +dateParts[2],
        +timeParts[0],
        +timeParts[1]
      );
      setStartingTime(startingTime);
    }
  }, [selectedTime, selectedDate]);

  useEffect(() => {
    if (mode === 'edit' && course.id) {
      setTitle(course.title);
      setDescription(course.desc);
      setEndPoint(course.endPoint);
      setStartPoint(course.startPoint);
      setDistance(course.distance);
      setDuration(course.duration);
      setDistanceMetricSystem(course.distanceMetricSystem);
      setPrice(course.price);
      setStartingTime(course.startTime);
      setStartCoordinates(course.startCoordinates);
      setFinishCoordinates(course.finishCoordinates);
      setWaypoints(course.waypoints);
    }
  }, []);

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('runnerUpToken');
    const creatorName = await AsyncStorage.getItem('username');
    const creatorId = await AsyncStorage.getItem('userId');
    const desc = description;
    const isComplete = false;
    const id = mode === 'edit' ? course.id : null;
    const data = {
      title,
      desc,
      endPoint,
      startPoint,
      price,
      duration,
      distance,
      distanceMetricSystem,
      startTime,
      creatorName,
      creatorId,
      isComplete,
      eventType,
      startCoordinates,
      finishCoordinates,
      waypoints,
    };
    console.log('---data check---', data);
    if (validate(data)) {
      // eslint-disable-next-line no-unused-expressions
      id
        ? CoursesApi.editCourse({ ...data, id }, token, navigation, id)
        : CoursesApi.createCourse(data, token, navigation);
    }
  };

  return (
    <View style={styles.container}>
      <DateModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setSelectedTime={setSelectedTime}
        setSelectedDate={setSelectedDate}
      />
      <Modal
        animationType="fade"
        transparent
        visible={systemModalVisible}
        onRequestClose={() => {
          setSystemModalVisible(!systemModalVisible);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setSystemModalVisible(!systemModalVisible);
          }}
        >
          <View style={styles.dataModalContainer}>
            <View style={styles.systemModal}>
              <TouchableOpacity
                style={styles.closeText}
                onPress={() => setSystemModalVisible(!systemModalVisible)}
              >
                <Ionicons name="close-outline" size={20} color="red" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.systemOption,
                  distanceMetricSystem === 'mi' ? styles.selected : null,
                ]}
                onPress={() => {
                  setDistanceMetricSystem('mi');
                  setSystemModalVisible(!systemModalVisible);
                }}
              >
                <Text style={styles.systemOptionText}>Imperial (miles)</Text>
                {distanceMetricSystem === 'mi' ? (
                  <Ionicons
                    size={20}
                    name="checkmark-outline"
                    color="green"
                    style={styles.checmarkIcon}
                  />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.systemOption,
                  distanceMetricSystem === 'km' ? styles.selected : null,
                ]}
                onPress={() => {
                  setDistanceMetricSystem('km');
                  setSystemModalVisible(!systemModalVisible);
                }}
              >
                <Text style={styles.systemOptionText}>Metric (km)</Text>
                {distanceMetricSystem === 'km' ? (
                  <Ionicons
                    size={20}
                    name="checkmark-outline"
                    color="green"
                    style={styles.checmarkIcon}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        animationType="slide"
        visible={mapModalVisible}
        onRequestClose={() => {
          setMapModalVisible(!mapModalVisible);
        }}
      >
        {currentPosition.latitude ? (
          <MapView
            showsPointsOfInterest={false}
            showsUserLocation
            initialRegion={currentPosition}
            style={{ flex: 1 }}
            onPress={(e) => {
              /* eslint-disable */
              startCoordinates === null
                ? setStartCoordinates(e.nativeEvent.coordinate)
                : (finishCoordinates === null
                  ? setFinishCoordinates(e.nativeEvent.coordinate)
                  : confirmWaypoint(e.nativeEvent.coordinate));
            }}
            /* eslint-enable */
          >
            {startCoordinates && (
            <Marker
              onDragEnd={(e) => {
                setStartCoordinates(e.nativeEvent.coordinate);
              }}
              draggable
              title="Start Location"
              coordinate={startCoordinates}
            />
            )}
            {finishCoordinates && (
            <Marker
              draggable
              onDragEnd={(e) => {
                setFinishCoordinates(e.nativeEvent.coordinate);
              }}
              title="Finish Location"
              coordinate={finishCoordinates}
            />
            )}
            {waypoints ? waypoints.map((waypoint, index) => (
              <Marker
              // eslint-disable-next-line react/no-array-index-key
                key={index}
                draggable
                onDragEnd={(e) => {
                  // setFinishCoordinates(e.nativeEvent.coordinate);
                  dragWaypoint(e.nativeEvent.coordinate, index);
                }}
                title={`Waypoint ${index}`}
                coordinate={waypoints[index]}
              />
            )) : null}
            {startCoordinates && finishCoordinates
              ? (
                <Polyline
                  strokeColor="#FF9D0A"
                  fillColor="rgba(255,0,0,0.5)"
                  strokeWidth={4}
                // eslint-disable-next-line max-len
                // coordinates={waypoints[0]
                //   ? [startCoordinates, ...waypoints, finishCoordinates]
                //   : [startCoordinates, finishCoordinates]}
                  coordinates={coords}
                />
              ) : null }
          </MapView>
        ) : <View style={styles.loadingScreen}><ActivityIndicator size="small" color={Colors.gradientFinish} /></View>}
      </Modal>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <Text style={styles.fontStyle}>
            <Text style={styles.headText}>Course info</Text>
          </Text>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTitle(text)}
              value={title}
              label="Title"
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Decription</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setDescription(text)}
              value={description}
              label="Description"
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Start point</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setMapModalVisible(!mapModalVisible)}
              label="Start point"
            >
              <Text style={styles.touchableOpacityText}>{startPoint}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>End point</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEndPoint(text)}
              value={endPoint}
              label="End point"
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Price</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPrice(text)}
              value={price}
              label="Price"
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Duration</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setDuration(text)}
              value={duration}
              label="Duration"
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Distance</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setDistance(text)}
              value={distance}
              label="Distance"
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>System Of Units</Text>
            <TouchableOpacity
              style={styles.inputSelect}
              onChangeText={(text) => setDistanceMetricSystem(text)}
              value={distanceMetricSystem}
              onPress={() => setSystemModalVisible(!systemModalVisible)}
              label="Metric System"
            >
              <Text style={styles.touchableOpacityText}>
                {distanceMetricSystem}
              </Text>
              <Ionicons
                style={styles.selectSystemIcon}
                name="chevron-down-outline"
                size={20}
                color="#9E9E9E"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Starting time</Text>
            <TouchableOpacity
              style={[styles.input, styles.dateInput]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>
                {mode === 'edit' && !selectedDate && (
                  <Text>{format(mili, 'yyyy-MM-dd HH:mm')}</Text>
                )}

                {selectedDate && (
                  <Text>{`${selectedDate} ${selectedTime}`}</Text>
                )}
              </Text>
              <Ionicons name="calendar" color="#9E9E9E" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.submitButton}>
            <Button
              onPress={handleSubmit}
              title="Submit Course"
              height={50}
              borderRadius={25}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: windowHeight,
    position: 'relative',
  },
  formContainer: {
    flex: 1,
    display: 'flex',
    width: '100%',
    padding: 20,
    paddingTop: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  submitButton: {
    marginBottom: 60,
    marginTop: 60,
  },
  headText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    justifyContent: 'center',
    lineHeight: 32,
    width: '100%',
  },
  fontStyle: {
    fontFamily: 'jost-bold-italic',
    textAlign: 'center',
    marginLeft: 40,
  },
  inputBlock: {
    paddingBottom: '5%',
  },
  input: {
    height: 50,
    width: '100%',
    paddingHorizontal: 20,
    fontFamily: 'jost-500',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 5,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputLabel: {
    color: 'gray',
    paddingLeft: '5%',
    marginBottom: 2,
    fontSize: 12,
    fontFamily: 'jost-500',
  },
  modalButtonContainer: {
    marginBottom: 15,
  },
  dataModalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    width: windowWidth,
    height: windowHeight,
  },
  systemModal: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    elevation: 3,
  },
  systemOption: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    flexDirection: 'row',
  },
  systemOptionText: {
    fontSize: adjust(13),
  },
  closeText: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignSelf: 'flex-end',
  },
  inputSelect: {
    height: 50,
    width: '100%',
    paddingHorizontal: 20,
    fontFamily: 'jost-500',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 5,
    flexDirection: 'row',
  },
  touchableOpacityText: {
    flex: 1,
    fontFamily: 'jost-500',
    textAlignVertical: 'center',
  },
  selectSystemIcon: {
    textAlignVertical: 'center',
  },
  selected: {
    backgroundColor: '#FF9D0A50',
  },
  checmarkIcon: {
    position: 'absolute',
    textAlignVertical: 'center',
    right: 50,
  },
  mapModal: {
    width: windowWidth,
    height: windowHeight,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
