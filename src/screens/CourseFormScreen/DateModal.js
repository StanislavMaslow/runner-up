import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import DateTime from './DatePicker';
import Button from '../../commons/Button';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const timeValues = [
  { value: '8:30' },
  { value: '9:00' },
  { value: '9:30' },
  { value: '10:00' },
  { value: '10:30' },
  { value: '11:30' },
  { value: '12:30' },
  { value: '15:30' },
  { value: '17:00' },
];

export default function DateModal({
  modalVisible,
  setModalVisible,
  setSelectedTime,
  setSelectedDate,
}) {
  const [selectedTimeOption, setSelectedTimeOption] = useState(0);
  const handleSelectTime = (index) => {
    setSelectedTimeOption(index);
    setSelectedTime(timeValues[index].value);
    // setPressStatus((prevState) => {
    //   let aux = Array.from(prevState);
    //   aux = aux.map((item) => {
    //     if (item.value === pressStatus[index].value) {
    //       // eslint-disable-next-line no-param-reassign
    //       item.checked = !pressStatus[index].checked;
    //       setSelectedTime(item.value);
    //     } else {
    //       // eslint-disable-next-line no-param-reassign
    //       item.checked = false;
    //     }
    //     return item;
    //   });
    //   return aux;
    // });
  };

  const onChangeDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <View style={styles.navRow}>
            <TouchableOpacity style={styles.backIconContainer}>
              <Icon
                name="arrow-back"
                backgroundColor="#3b5998"
                size={20}
                color="white"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </TouchableOpacity>
            <Text style={styles.fontStyle}>
              <Text style={styles.headText}>Select Date & Time</Text>
            </Text>
          </View>
        </View>
        <DateTime
          date={new Date()}
          accessible
          changeDate={(date) => onChangeDate(date)}
          format="yyyy-MM-dd"
          dateSelectedWarpStyleDay={styles.selectionCircle}
        />

        <View style={styles.timeContainer}>
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontFamily: 'jost-400',
              fontSize: 22,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: 'white', paddingBottom: 10 }}>Time</Text>
          </Text>
          <View style={styles.timeValues}>
            {timeValues.map((timeValue, index) => (
              <TouchableHighlight
                key={timeValue.value}
                onPress={() => handleSelectTime(index)}
                activeOpacity={0.5}
                style={
                  index === selectedTimeOption
                    ? styles.timeBoxesPressed
                    : styles.timeBoxes
                }
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'jost-400',
                  }}
                >
                  {timeValue.value}
                </Text>
              </TouchableHighlight>
            ))}
          </View>
        </View>
        <Button
          title="Submit"
          width={300}
          height={50}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: windowHeight,
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    width: '100%',
  },
  header: {
    marginTop: '15%', // 60px
    marginBottom: 30,
    justifyContent: 'center',
    width: '100%',
    zIndex: 1,
  },
  navRow: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  headText: {
    color: 'white',
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
  timeContainer: {
    marginBottom: 5,
    marginTop: -20,
  },
  timeValues: {
    // marginTop: 10,
    width: windowWidth,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  timeBoxes: {
    width: '25%', // 100
    height: 45, // 45
    borderColor: '#c4c4c4',
    borderWidth: 0.5,
    borderRadius: 55,
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeBoxesPressed: {
    width: '25%', // 100
    height: 45, // 45
    borderColor: '#c4c4c4',
    backgroundColor: '#20BE56',
    borderWidth: 0.5,
    borderRadius: 55,
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionCircle: {
    borderRadius: 50,
  },
});
