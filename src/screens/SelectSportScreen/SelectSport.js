import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
// import { MaterialIcons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../commons/Button';
import Colors from '../../constants/Colors';
import adjust from '../../services/adjust';

const windowHeight = Dimensions.get('window').height;

export default function Courses({ navigation }) {
  const [selectedSport, SetselectedSport] = React.useState([]);
  const onPressNext = () => {
    if (selectedSport[0]) {
      navigation.navigate('AddCourse', {
        mode: 'create',
        eventType: selectedSport[0],
        course: {},
      });
    } else {
      Alert.alert('Select a type of sport');
    }
  };

  const handleSelect = (sportType) => {
    let filteredValues = [];
    if (selectedSport.includes(sportType)) {
      filteredValues = selectedSport.filter(
        (selection) => selection !== sportType
      );
    } else {
      filteredValues.push(sportType);
    }
    SetselectedSport(filteredValues);
  };

  return (
    /* eslint-disable global-require */
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/background/signBackground.png')}
        style={styles.image}
      >
        <View style={styles.courseContainer}>
          <LinearGradient
            colors={['#FF670A', '#FF9D0A']}
            style={styles.courseBoxBig}
          >
            <TouchableOpacity
              onPress={() => handleSelect('Running')}
              style={[
                styles.innerCourseBox,
                selectedSport[0] === 'Running' ? styles.selectedBox : null,
              ]}
            >
              <Image
                style={styles.footerIcon}
                source={require('../../../assets/icons/courses/course-running.png')}
              />
              <Text style={styles.fontStyle}>
                <Text style={styles.courseBoxText}>Running</Text>
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            style={styles.courseBoxBig}
            colors={['#F3B617', '#FFD911']}
          >
            <TouchableOpacity
              onPress={() => handleSelect('Cycling')}
              style={[
                styles.innerCourseBox,
                selectedSport[0] === 'Cycling' ? styles.selectedBox : null,
              ]}
            >
              <Image
                style={styles.footerIcon}
                source={require('../../../assets/icons/courses/course-cycling.png')}
              />
              <Text style={styles.fontStyle}>
                <Text style={styles.courseBoxText}>Cycling</Text>
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#1291FF', '#50C1F7']}
            style={styles.courseBoxSmall}
          >
            <TouchableOpacity
              onPress={() => handleSelect('Swimming')}
              style={[
                styles.innerCourseBox,
                selectedSport[0] === 'Swimming' ? styles.selectedBox : null,
              ]}
            >
              <Image
                style={styles.footerIcon}
                source={require('../../../assets/icons/courses/course-swimming.png')}
              />
              <Text style={styles.fontStyle}>
                <Text style={styles.courseBoxText}>Swimming</Text>
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#4CD964', '#20BE56']}
            style={styles.courseBoxBig}
          >
            <TouchableOpacity
              onPress={() => handleSelect('Trekking')}
              style={[
                styles.innerCourseBox,
                selectedSport[0] === 'Trekking' ? styles.selectedBox : null,
              ]}
            >
              <Image
                style={styles.footerIcon}
                source={require('../../../assets/icons/courses/course-trekking.png')}
              />
              <Text style={styles.fontStyle}>
                <Text style={styles.courseBoxText}>Trekking</Text>
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.nextButtonContainer}>
          <Button
            onPress={onPressNext}
            title="Next"
            height={50}
            width={300}
            borderRadius={25}
            colors={
              selectedSport[0]
                ? [Colors.gradientFinish, Colors.gradientStart]
                : ['#D3D3D3', '#9E9E9E']
            }
          />
        </View>
      </ImageBackground>
    </View>
    /* eslint-enable global-require */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: windowHeight,
    position: 'relative',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: windowHeight + 50,
    marginTop: -40,
  },
  submit: {
    color: 'white',
    fontFamily: 'jost-500',
  },
  fontStyle: {
    fontFamily: 'jost-bold-italic',
    textAlign: 'center',
  },
  courseContainer: {
    flex: 1,
    width: '100%',
    // height: 0.2 * windowHeight,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'baseline', // or 'flex-end'
    marginBottom: '-15%',
    marginTop: '38.5%',
    position: 'relative',
  },
  courseBoxBig: {
    height: '28%', // 215px
    width: '41.5%', // 156px
    borderRadius: 30,
    margin: 10,
    marginBottom: 4,
  },
  courseBoxSmall: {
    height: '28%', // 200px
    width: '41.5%', // 156px
    borderRadius: 30,
    margin: 9,
    marginBottom: 2,
  },
  innerCourseBox: {
    height: '95%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
  },
  selectedBox: {
    backgroundColor: 'transparent',
  },
  courseBoxText: {
    fontSize: adjust(24),
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  nextButtonContainer: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0.21 * windowHeight,
  },
});
