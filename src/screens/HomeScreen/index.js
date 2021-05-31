/* eslint-disable global-require */
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../commons/Button';
import UserApi from '../../api/user';
import CoursesApi from '../../api/courses';
import adjust from '../../services/adjust';

const windowHeight = Dimensions.get('window').height;

export default function Courses({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAll = async () => {
    try {
      const token = await AsyncStorage.getItem('runnerUpToken');
      setLoading(true);
      const resp = await CoursesApi.getAll(token);
      setCourses(resp);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('----get all error---', error);
    }
  };
  const onRefresh = () => {
    getAll();
  };

  useFocusEffect(
    React.useCallback(() => {
      getAll();
    }, [])
  );

  const getMe = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('runnerUpToken');
      const resp = await UserApi.getMeCall(token);
      await AsyncStorage.setItem('userId', resp.id);

      await AsyncStorage.setItem('fullName', `${resp.firstName} ${resp.lastName}`);
      // setUser(resp);
    } catch (error) {
      console.log('----error on get me------', error);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    getMe();
  }, []);

  // const onPressAdd = () => {
  //   navigation.navigate('SelectSport');
  // };

  const onPressCard = (id) => {
    navigation.navigate('CourseDetails', { id });
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.buttonContainer}>
        <Button
          onPress={onPressAdd}
          alignSelf="flex-end"
          fontSize={20}
          title="+"
          width={60}
          height={60}
          borderRadius={30}
        />
      </View> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardContainer}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        {!loading &&
          courses[0] &&
          courses.map((course) => (
            <TouchableOpacity
              id={course.id}
              activeOpacity={0.9}
              onPress={() => onPressCard(course.id)}
              key={course.id}
            >
              <LinearGradient
                colors={['#FF670A', '#FF9D0A']}
                style={styles.courseCard}
              >
                <View style={styles.innerCourseCard}>
                  <View style={styles.cardHeader}>
                    <View style={styles.headerFirstColumn}>
                      <View style={styles.cardAvatarContainer}>
                        <Image
                          style={styles.cardAvatar}
                          source={require('../../../assets/icons/avatar.png')}
                        />
                      </View>
                    </View>
                    <View style={styles.headerSecondColumn}>
                      <Text numberOfLines={1} style={styles.textHeader}>
                        <Text>{course.title}</Text>
                      </Text>
                      <View style={styles.courseData}>
                        <View style={styles.cardDataIcon}>
                          <Image
                            source={require('../../../assets/icons/zap.png')}
                          />
                          <Text
                            style={{ fontFamily: 'jost-500', color: '#666' }}
                          >
                            {Math.round(
                              (course.distance /
                                // eslint-disable-next-line no-mixed-operators
                                parseInt(course.duration, 10)) *
                                100
                            ) / 100}
                            mph
                          </Text>
                        </View>
                        <View style={styles.separationLine} />
                        <View style={styles.cardDataIcon}>
                          <Image
                            source={require('../../../assets/icons/trending-up.png')}
                          />
                          <Text
                            style={{ fontFamily: 'jost-500', color: '#666' }}
                          >
                            {course.distance}
                            {course.distanceMetricSystem}
                          </Text>
                        </View>
                        <View style={styles.separationLine} />
                        <View style={styles.cardDataIcon}>
                          <Image
                            source={require('../../../assets/icons/clock.png')}
                          />
                          <Text
                            style={{ fontFamily: 'jost-500', color: '#666' }}
                          >
                            {course.duration}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.courseItinerary}>
                    <Image
                      style={styles.courseItineraryImg}
                      source={require('../../../assets/start-finish.png')}
                    />
                    <View style={styles.courseItineraryText}>
                      <View style={styles.itineraryBlock}>
                        <Text style={styles.itineraryPoint}>Start</Text>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.itineraryLocation}>
                          {course.startPoint}
                        </Text>
                      </View>
                      <View style={styles.itineraryBlockFinish}>
                        <Text style={styles.itineraryPoint}>Finish</Text>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.itineraryLocation}>
                          {course.endPoint}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.startButtonContainer}>
                      <Button
                        title="Start"
                        alignSelf="flex-end"
                        fontSize={22}
                        fontStyle="italic"
                        fontWeight="bold"
                        width={150}
                        height={60}
                        borderRadius={30}
                      />
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
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
    backgroundColor: '#2A2A2A',
  },
  fontStyle: {
    fontFamily: 'jost-bold-italic',
    textAlign: 'center',
  },
  // Courses
  cardContainer: {
    paddingBottom: 65,
  },
  courseCard: {
    flex: 1,
    width: '93%',
    borderRadius: 30,
    marginBottom: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  innerCourseCard: {
    flex: 1,
    width: '98.5%',
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: 30,
    overflow: 'hidden',
    paddingBottom: 15,
  },
  headerFirstColumn: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  headerSecondColumn: { width: '70%' },
  cardAvatarContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
    height: 54,
    width: 54,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 4,
  },
  cardAvatar: {
    height: 50,
    width: 50,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonContainer: {
    width: '95%',
    marginBottom: 15,
    marginRight: 20,
  },
  textHeader: {
    fontFamily: 'jost-500',
    textAlign: 'left',
    fontStyle: 'italic',
    fontSize: adjust(15.7),
    marginTop: 18,
    width: '90%',
  },
  courseData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '80%',
  },
  cardDataIcon: {
    width: 60,
    height: 30,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  separationLine: {
    height: 35,
    width: 1,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 5,
  },
  courseItinerary: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  courseItineraryImg: {
    left: 20,
    top: 15,
  },
  courseItineraryText: {
    width: '45%',
    left: 25,
    top: 10,
  },
  itineraryPoint: {
    color: '#808080',
    fontSize: adjust(11),
    fontStyle: 'italic',
  },
  itineraryLocation: {
    fontFamily: 'jost-500',
    fontStyle: 'italic',
    fontSize: adjust(12),
    marginTop: 2,
  },
  itineraryBlock: {
    height: 61,
  },
  itineraryBlockFinish: {
    paddingBottom: 20,

  },
  startButtonContainer: {
    flex: 1,
    top: '7%',
    left: 30,
  },
});
