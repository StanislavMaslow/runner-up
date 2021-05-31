import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, ActivityIndicator, Alert,
  Platform,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../../commons/Button';
import Colors from '../../constants/Colors';
import CoursesApi from '../../api/courses';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function CourseDetails({ navigation, route }) {
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState([]);
  const [currentUserId, setCurrentUserId] = useState([]);
  const [coords, setCoords] = useState([]);
  // const [initialRegion, setInitialRegion] = useState([]);

  const mapRef = React.useRef();

  const getCurrentUserId = async () => {
    const UserId = await AsyncStorage.getItem('userId');
    return UserId;
  };

  getCurrentUserId().then((res) => {
    setCurrentUserId(res);
  });

  const getCourseById = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('runnerUpToken');
      const resp = await CoursesApi.getCourseById(token, id);
      setCourse(resp);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const deleteCourseById = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('runnerUpToken');
      await CoursesApi.deleteCourse(token, navigation, id);
      navigation.navigate('Home');
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });

    /* eslint-disable  */
    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
    /* eslint-enable */
  }, []);

  useEffect(() => {
    getCourseById();
  }, []);

  const onPressStart = async () => {
    navigation.navigate('Courses'); // Temporary
  };

  const onPressEdit = () => {
    // add edit
    navigation.navigate('EditCourse', { course, mode: 'edit' });
  };
  /* eslint-disable global-require */

  const deletingPrevent = () => (
    Alert.alert(
      'Are you sure?',
      'You are about to delete this course. This action cannot be undone. Do you want to proceed?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'OK', onPress: () => deleteCourseById() },
      ]
    )
  );

  const movementType = 'walking'; // 'walking';
  const APIKEY = 'AIzaSyCE1K5XjF-5pIPfyqKmC1JUfT8Qj1TwzYc';
  // const ASPECT_RATIO = windowWidth / windowHeight;
  // const LATITUDE_DELTA = 0.34;
  // const LONGITUDE_DELTA = 0.8;

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

  const formatCoordinates = (unformattedCoordinates) => `${unformattedCoordinates.latitude},${unformattedCoordinates.longitude}`;

  const getDirections = async () => {
    try {
      const { startCoordinates, finishCoordinates, waypoints } = course;
      const origin = formatCoordinates(startCoordinates);
      const destination = formatCoordinates(finishCoordinates);
      const formatWaypoints = waypoints.map((point) => formatCoordinates(point)).join('|');
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${movementType}&waypoints=${formatWaypoints || ''}`);
      const respJson = await resp.json();
      const points = decode(respJson.routes[0].overview_polyline.points);
      setCoords(points);
      return coords;
    } catch (error) {
      Alert.alert('Something went wrong');
      console.log('---error---', error);
      return error;
    }
  };

  const onMapReadyHandler = React.useCallback(() => {
    if (Platform.OS === 'ios') {
      mapRef?.current?.fitToElements(false);
    } else {
      mapRef?.current?.fitToSuppliedMarkers(['origin', 'destination'], {
        animated: false,
        edgePadding: {
          top: 150,
          right: 100,
          bottom: 700,
          left: 150,
        },
      });
    }
  }, [mapRef]);

  useEffect(() => {
    if (course.startCoordinates && course.finishCoordinates) {
      getDirections();
    }
  }, [course.startCoordinates, course.finishCoordinates]);

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.routeContainer} category="h4" keyboardShouldPersistTaps="handled">
        {course.startCoordinates ? (
          <MapView
            keyboardShouldPersistTaps="handled"
            ref={mapRef}
            // initialRegion={{
            //   latitude: course.startCoordinates.latitude,
            //   longitude: course.startCoordinates.longitude,
            //   latitudeDelta: LATITUDE_DELTA,
            //   longitudeDelta: LONGITUDE_DELTA,
            // }}
            style={styles.mapBackground}
            onMapReady={onMapReadyHandler}

          >
            {course.startCoordinates && (
            <Marker
              title="Start Location"
              coordinate={course.startCoordinates}
              identifier="origin"
            />
            )}
            {course.finishCoordinates && (
            <Marker
              title="Finish Location"
              coordinate={course.finishCoordinates}
              identifier="destination"
            />
            )}
            {course.waypoints ? course.waypoints.map((waypoint, index) => (
              <Marker
              // eslint-disable-next-line react/no-array-index-key
                key={index}
                title={`Waypoint ${index}`}
                coordinate={course.waypoints[index]}
              />
            )) : null}
            <Polyline
              strokeColor="#FF9D0A"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={4}
              coordinates={coords}
            />

          </MapView>
        ) : <View style={styles.loadingScreen}><ActivityIndicator size="small" color={Colors.gradientFinish} /></View>}
        { course.creatorId === currentUserId ? (
          <TouchableOpacity onPress={() => (deletingPrevent())} style={styles.trashIcon}>
            <Icon name="delete" color="darkred" size={32} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.courseDetailContainer}>
        {loading ? (
          <View style={styles.loadingScreen}>
            <ActivityIndicator size="small" color={Colors.gradientFinish} />
          </View>
        ) : (
          <View>
            <View style={styles.detailsHeader}>
              <Image
                style={styles.cardAvatar}
                // eslint-disable-next-line global-require
                source={require('../../../assets/icons/avatar.png')}
              />
              <View style={styles.headerText}>
                <Text style={styles.creatorUsername}>{course.creatorName}</Text>
              </View>
              <View style={styles.rating}>
                <Image
                  style={styles.cardAvatar}
                  // eslint-disable-next-line global-require
                  source={require('../../../assets/star.png')}
                />
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>{course.rating}</Text>
                </View>
              </View>
            </View>
            <View style={styles.courseRoute}>
              <Image
                // eslint-disable-next-line global-require
                source={require('../../../assets/start-finish-details.png')}
              />
              <View style={styles.routeDetails}>
                <Text style={styles.routeTextStyle}>{course.startPoint}</Text>
                <View style={styles.horizontalLine} />
                <Text style={styles.routeTextStyle}>{course.endPoint}</Text>
              </View>
              {course.creatorId === currentUserId ? (
                <TouchableOpacity
                  onPress={onPressEdit}
                  style={styles.editRoute}
                >
                  <Icon name="create" size={20} />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.separationLine} />
            <View style={styles.courseInfoContainer}>
              <Text style={styles.trackingName}>{course.title}</Text>

              <View style={styles.courseInfo}>
                <View style={styles.courseInfoItem}>
                  {/* eslint-disable-next-line global-require */}
                  <Image source={require('../../../assets/details-map.png')} />
                  <Text style={styles.courseInfoItemText}>
                    {`${course.distance} ${course.distanceMetricSystem}`}
                  </Text>
                </View>
                <View style={styles.courseInfoItem}>
                  <Image
                    // eslint-disable-next-line global-require
                    source={require('../../../assets/details-clock.png')}
                  />
                  <Text style={styles.courseInfoItemText}>
                    {course.duration}
                  </Text>
                </View>
                <View style={styles.courseInfoItem}>
                  <Image
                    // eslint-disable-next-line global-require
                    source={require('../../../assets/details-money.png')}
                  />
                  <Text style={styles.courseInfoItemText}>{course.price}</Text>
                </View>
                <View />
                <View />
              </View>
            </View>
            <View style={styles.startButton}>
              <Button
                onPress={onPressStart}
                title="Start"
                width={300}
                height={50}
                borderRadius={30}
                alignSelf="center"
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBackground: {
    flex: 1,
    zIndex: -1,
    // resizeMode: 'cover',
    justifyContent: 'center',
    marginTop: -25,
    height: 0.55 * windowHeight,
    width: windowWidth,
  },
  trashIcon: {
    position: 'absolute',
    right: 25,
    top: 0,
  },
  courseDetailContainer: {
    flex: 1,
    display: 'flex',
    position: 'absolute',
    width: windowWidth,
    bottom: 0,
    flexDirection: 'column',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: 'white',
    paddingHorizontal: '8%',
    paddingTop: '6%',
    paddingBottom: '6%',
  },
  detailsHeader: {
    flexDirection: 'row',
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
  },
  creatorUsername: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontFamily: 'jost-500',
    marginLeft: 20,
  },
  rating: {
    height: 24,
    width: 50,
    borderRadius: 40,
    backgroundColor: '#f2f2f2',
    alignSelf: 'center',
    paddingTop: 5.5,
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'visible',
  },
  courseRoute: {
    marginTop: 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLine: {
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 0.6,
    margin: 13,
    marginLeft: -1,
  },
  routeDetails: {
    width: '70%',
    marginHorizontal: 10,
    marginBottom: 5,
    justifyContent: 'center',
  },
  routeTextStyle: {
    fontFamily: 'jost-500',
    fontStyle: 'italic',
    fontSize: 16,
    color: '#1D1918',
    // paddingBottom: 5
  },
  editRoute: {
    width: 38,
    height: 38,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  separationLine: {
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 0.5,
    marginTop: 15,
  },
  courseInfoContainer: {
    marginTop: 10,
  },
  courseInfo: {
    width: '100%',
    marginTop: 15,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  courseInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  courseInfoItemText: {
    fontFamily: 'jost-500',
    marginLeft: 5,
  },
  trackingName: {
    fontSize: 20,
    fontStyle: 'italic',
    fontFamily: 'jost-500',
  },
  startButton: {
    marginTop: 15,
  },
  loadingScreen: {
    padding: '50%',
  },
  ratingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5.5,
    paddingLeft: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
