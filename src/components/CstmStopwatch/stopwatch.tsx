import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';

const StopWatch = ({
  start = false,
  startTime = 0,
  getTime = time => {},
  id = 0,
}) => {
  const [voiceDuration, setvoiceDuration] = useState('00:00:00');
  const { colors, dark }: Theme = useTheme();
  var duration = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (start) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [start]);

  useEffect(() => {
    if (startTime) {
      setDuration(startTime);
    }
  }, [startTime]);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  const setDuration = timer => {
    var countDownDate = new Date();
    var now = new Date().getTime();
    var timeleft = now - countDownDate.getTime() + 1000 * timer;

    // Calculating the days, hours, minutes and seconds left
    var hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    ).toString();
    var minutes = Math.floor(
      (timeleft % (1000 * 60 * 60)) / (1000 * 60),
    ).toString();
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000).toString();

    var durationString = `${hours?.length == 1 ? '0' + hours : hours}:${
      minutes?.length == 1 ? '0' + minutes : minutes
    }:${seconds?.length == 1 ? '0' + seconds : seconds}`;
    setvoiceDuration(durationString);
  };

  const startTimer = () => {
    var countDownDate = new Date();
    // Run myfunc every second
    duration.current = setInterval(function () {
      var now = new Date().getTime();
      var timeleft = now - countDownDate.getTime() + 1000 * startTime;

      // Calculating the days, hours, minutes and seconds left
      var hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      ).toString();
      var minutes = Math.floor(
        (timeleft % (1000 * 60 * 60)) / (1000 * 60),
      ).toString();
      var seconds = Math.floor((timeleft % (1000 * 60)) / 1000).toString();

      var durationString = `${hours?.length == 1 ? '0' + hours : hours}:${
        minutes?.length == 1 ? '0' + minutes : minutes
      }:${seconds?.length == 1 ? '0' + seconds : seconds}`;
      setvoiceDuration(durationString);
      getTime(
        parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 60 * 60,
      );
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(duration.current);
  };

  return (
    <>
      <View
        style={[
          styles.searchSection,
          { backgroundColor: dark ? '#000' : '#fff' },
        ]}>
        <View>
          <Text
            style={{ color: colors.primary, fontWeight: 'bold', fontSize: 16 }}>
            {voiceDuration}
          </Text>
        </View>
      </View>
    </>
  );
};

export default StopWatch;

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
    height: 40,
  },
  input: {
    flex: 1,
    height: 70,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: '#fff',
    color: '#1B1A57',
    fontSize: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
  },
});
