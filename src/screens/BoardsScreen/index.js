import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Image, Dimensions, ScrollView, ActivityIndicator, RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Avatar from '../../commons/Avatar';
import Colors from '../../constants/Colors';
import mediaQuery from '../../services/mediaQuery';
import CoursesApi from '../../api/courses';
import {
  sideStageStyleSelector,
  stageStyleSelector,
  boardTitleBlockStyleSelector,
  backgroungGradientStyleSelector,
  stageCardStyleSelector,
  backgroundCardStyleSelector,
  avatarNameStyleSelector,
  cardTextStyleSelector,
} from './stylesSelectorBS';

const colors = [Colors.gradientFinish, Colors.gradientStart];
const windowWidth = (Dimensions.get('window').width);
const mediaSize = mediaQuery();

/* eslint-disable global-require */

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: () => null,
  second: () => null,
  third: () => null,
});

const renderTabBar = (props) => (

  <TabBar
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    indicatorStyle={{ backgroundColor: 'white', height: '100%', borderRadius: 30 }}
    style={{ backgroundColor: 'inherit' }}
    activeColor={Colors.mainOrange}
    pressColor="#2A2A2A"
    pressOpacity={1}
  />
);

const StageCard = ({
  number, backGroundSt, numberS, data,
}) => (
  <View style={[styles.backgroundCard,
    backgroundCardStyleSelector(mediaSize),
    backGroundSt,
    styles.backborder]}
  >

    <View style={[styles.stageCard, stageCardStyleSelector(mediaSize)]}>
      <Text style={numberS}>{number}</Text>

      <View style={styles.cardAvatar}>
        <View style={styles.ava}>
          <Avatar size="medium" src={require('../../../assets/icons/avatar.png')} />
        </View>
        <Text style={[styles.avatarName, avatarNameStyleSelector(mediaSize)]}>
          {data?.userFirstName}
          {'\n'}
          {data && data.userLastName}
        </Text>
      </View>
      <View style={styles.infoBlock}>
        <View style={styles.cardInfo}>
          <Image
            style={styles.lightningIcon}
            source={require('../../../assets/icons/Vector-black.png')}
          />
          <Text style={cardTextStyleSelector(mediaSize)}>
            {data?.courseDist}
            {' '}
            mph
          </Text>
        </View>
        <View style={styles.cardInfo}>
          <Image
            style={styles.icons}
            source={require('../../../assets/icons/trending-up-black.png')}
          />

          <Text style={cardTextStyleSelector(mediaSize)}>
            {data?.courseAlt}
            {' '}
            m
          </Text>
        </View>
        <View style={styles.cardInfo}>

          <Image
            style={styles.icons}
            source={require('../../../assets/icons/clock-black.png')}
          />

          <Text style={cardTextStyleSelector(mediaSize)}>
            {`${Math.floor(data?.courseTime / 60)}m ${data?.courseTime % 60}s`}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

const SideCard = ({ data }) => (
  <View style={styles.sideCardBlock}>

    <View style={styles.sideCardAvatar}>
      <Avatar size="medium" src={require('../../../assets/icons/avatar.png')} />
    </View>

    <View style={styles.sideCardRight}>
      <Text style={styles.sideCardName}>{`${data?.userFirstName} ${data?.userLastName}`}</Text>
      <View style={styles.sideCardInfo}>
        <View style={styles.sideCardIcons}>
          <Image
            style={styles.sideCardIcon}
            source={require('../../../assets/icons/Vector-black.png')}
          />
          <Text>
            {data?.courseDist}
            {' '}
            mph
          </Text>
        </View>
        <View style={styles.sideCardIcons}>
          <Image
            style={styles.sideCardIcon}
            source={require('../../../assets/icons/trending-up-black.png')}
          />

          <Text>
            {data?.courseAlt}
            {' '}
            m
          </Text>
        </View>
        <View style={styles.sideCardIcons}>

          <Image
            style={styles.sideCardIcon}
            source={require('../../../assets/icons/clock-black.png')}
          />

          <Text>
            {`${Math.floor(data?.courseTime / 60)}m ${data?.courseTime % 60}s`}
          </Text>
        </View>
      </View>
    </View>
  </View>
);
/* eslint-enable global-require */

const BoardsScreen = () => {
  const [leaderCourses, setLeaderCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Today' },
    { key: 'second', title: 'Week' },
    { key: 'third', title: 'All Time' },
  ]);

  const getLeaderBoardCourses = async () => {
    try {
      const token = await AsyncStorage.getItem('runnerUpToken');
      setLoading(true);
      const resp = await CoursesApi.getCoursesResults(token);
      setLeaderCourses(resp);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      setLoading(false);
      console.log('-----get leaderboard courses error', error);
    }
  };

  const getLeaderBoardCoursesWeekly = async () => {
    try {
      const token = await AsyncStorage.getItem('runnerUpToken');
      setLoading(true);
      const resp = await CoursesApi.getCoursesResultsWeekly(token, 'week');
      setLeaderCourses(resp);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('-----get leaderboard courses error', error);
    }
  };

  const getLeaderBoardCoursesAllTime = async () => {
    try {
      const token = await AsyncStorage.getItem('runnerUpToken');
      setLoading(true);
      const resp = await CoursesApi.getCoursesResultsAllTime(token, 'allTime');
      setLeaderCourses(resp);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('-----get leaderboard courses error', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getLeaderBoardCourses();
    }, [])
  );

  return (

    <View style={styles.container}>
      <View style={[styles.boardTitleBlock, boardTitleBlockStyleSelector(mediaSize)]}>
        <Text style={styles.boadrTitle}>Leaderboard</Text>
      </View>
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getLeaderBoardCourses();
            }}
          />
            )}
      >
        <View style={styles.mainStage}>

          {
            loading ?
              (
                <View style={[styles.activityIndicatorContainer, stageStyleSelector(mediaSize)]}>
                  <ActivityIndicator
                    size="large"
                    style={styles.loadingIndicator}
                    color={Colors.gradientFinish}
                  />
                </View>
              )
              : (
                <View style={[styles.stage, stageStyleSelector(mediaSize)]}>
                  <LinearGradient
                    style={[styles.backgroungGradient, backgroungGradientStyleSelector(mediaSize)]}
                    colors={colors}
                  />
                  <StageCard
                    number={1}
                    backGroundSt={styles.firstBackgroundCard}
                    numberS={styles.first}
                    data={leaderCourses[0]}
                  />
                  <StageCard
                    number={2}
                    backGroundSt={styles.secondBackgroundCard}
                    numberS={styles.second}
                    data={leaderCourses[1]}
                  />
                  <StageCard
                    number={3}
                    backGroundSt={styles.thirdBackgroundCard}
                    numberS={styles.third}
                    data={leaderCourses[2]}
                  />

                </View>
              )
}

          <View style={styles.bottomButtonsBlock}>
            <TabView
              renderTabBar={renderTabBar}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={(e) => {
                if (e === 0) {
                  getLeaderBoardCourses();
                  setIndex(e);
                } else if (e === 1) {
                  getLeaderBoardCoursesWeekly();
                  setIndex(e);
                } else if (e === 2) {
                  getLeaderBoardCoursesAllTime();
                  setIndex(e);
                }
              }}
              initialLayout={initialLayout}
              tabBarPosition="bottom"
            />
          </View>

        </View>
        {}
        <View style={[styles.sideStage, sideStageStyleSelector(mediaSize)]}>

          {
  (!loading && (
    leaderCourses.map((result, idx) => {
      if (idx > 4) {
        return (
          <SideCard
            data={result}
            key={result.resultsId}
          />
        );
      }
      return null;
    })
  ))
              }

        </View>
      </ScrollView>

    </View>

  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: windowWidth,
  },
  mainStage: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 34,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sideStage: {
    paddingHorizontal: 20,
    width: '100%',
  },
  stage: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  boardTitleBlock: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
  },
  boadrTitle: {
    fontFamily: 'jost-bold-italic',
    fontSize: 28,
    color: '#FFFFFF',
  },
  backgroungGradient: {
    position: 'absolute',
    width: windowWidth + ((windowWidth / 100) * 6),
    top: 50,
    bottom: 0,
    left: '-6%',
    right: 0,
    transform: [{ rotate: '6.48deg' }],
  },
  backgroundCard: {
    borderRadius: 10,
  },
  stageCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
  },
  bottomButtonsBlock: {
    flexDirection: 'row',
    marginTop: 15,
  },
  avatarName: {
    fontFamily: 'jost-500',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  firstBackgroundCard: {
    backgroundColor: '#EDB91D',
    alignSelf: 'flex-start',
  },
  secondBackgroundCard: {
    backgroundColor: '#BDBDBD',
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  thirdBackgroundCard: {
    backgroundColor: '#CA772D',
    alignSelf: 'flex-end',
  },
  number: {
    fontFamily: 'jost-bold-italic',
    fontSize: 20,

  },
  first: {
    fontFamily: 'jost-bold-italic',
    fontSize: 20,
    color: '#EDB91D',
  },
  second: {
    fontFamily: 'jost-bold-italic',
    fontSize: 20,
    color: '#BDBDBD',
  },
  third: {
    fontFamily: 'jost-bold-italic',
    fontSize: 20,
    color: '#CA772D',
  },
  cardAvatar: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ava: {
    marginTop: -5,
    marginBottom: 5,
  },
  cardAva: {
  },
  infoBlock: {
    flex: 1,
    marginTop: 25,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardInfo: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },
  icons: {
    height: 18,
    width: 18,
    resizeMode: 'stretch',
    marginHorizontal: 10,
  },
  lightningIcon: {
    height: 18,
    width: 16,
    resizeMode: 'stretch',
    marginHorizontal: 10,
  },
  sideCardBlock: {
    flexDirection: 'row',
    width: '98%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginVertical: 7,
    padding: 15,
  },
  sideCardAvatar: {
    flex: 1,
    justifyContent: 'center',
  },
  sideCardRight: {
    flex: 3,
    justifyContent: 'space-around',
  },
  sideCardName: {
    fontFamily: 'jost-500',
    fontSize: 16,
  },
  sideCardInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sideCardIcons: {
    flexDirection: 'row',
    marginRight: 8,
    marginTop: 3,
  },
  sideCardIcon: {
    height: 16,
    width: 16,
    resizeMode: 'stretch',
    marginRight: 6,
  },
  loadingIndicator: {
  },
  activityIndicatorContainer: {
    justifyContent: 'center',
  },
});

export default BoardsScreen;
