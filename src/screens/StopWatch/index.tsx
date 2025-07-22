import React, { useEffect, useState, useReducer } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useTheme, Theme } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import FD from 'react-native-vector-icons/Foundation';
import FT from 'react-native-vector-icons/Fontisto';
import Ions from 'react-native-vector-icons/Ionicons';
import { State, useHookstate } from '@hookstate/core';

//@ts-ignore
import store from 'react-native-simple-store';

import styles from './style';
import { Stopwatch } from '../../types';
import { NotFound, SimpleLoader, StopWatch } from '../../components';
import { globalState } from '../../stores/globalAppState';

const StopWatchScreen = ({ navigation }: any) => {
  const { colors, dark }: Theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [_, forceUpdate] = useReducer(x => x + 1, 0);
  const stopWatchDataList: State<any> = useHookstate(globalState.stopwatch);
  const solidColor = dark ? '#000000' : '#ffffff';
  const [stopwatchs, SetStopwatch] = useState<Stopwatch[]>(
    JSON.parse(JSON.stringify(stopWatchDataList?.get())),
  );
  let timerStopwatch = JSON.parse(JSON.stringify(stopwatchs));

  useEffect(() => {
    // useRef value stored in .current property
    let timer = setInterval(() => {
      const temp = JSON.parse(JSON.stringify(stopwatchs));
      store.update('stopwatch', {
        stopwatch: stopwatchs,
      });
      stopWatchDataList.set(temp);
    }, 5000);

    // clear on component unmount
    return () => {
      clearInterval(timer);
    };
  }, [stopwatchs]);

  const RenderList = ({ item, index }: { item: Stopwatch; index: number }) => {
    const handlePlayPause = () => {
      if (item?.isPlaying === true) {
        const temp = stopwatchs; //* Force Copy Method
        temp[index].isPlaying = false;
        SetStopwatch(temp);
        forceUpdate();
      } else if (item?.isPlaying === false) {
        const temp = stopwatchs; //* Force Copy Method
        temp[index].isPlaying = true;
        SetStopwatch(temp);
        forceUpdate();
      }
    };

    const handleDelete = (index: number) => {
      Alert.alert(
        'Delete StopWatch Entry?',
        'Your stopwatch entry will be deleted permanently',
        [
          {
            text: 'Yes',
            style: 'default',
            onPress: confirmDelete,
          },
          {
            text: 'No',
            style: 'cancel',
            onPress: () => console.log('Pressed Cancel on Delete'),
          },
        ],
      );
      function confirmDelete() {
        const temp = stopwatchs;
        temp.splice(index, 1);
        SetStopwatch(temp);
        forceUpdate();
      }
    };

    return (
      <View
        key={item.ticket_no}
        style={{ ...styles.listContainer, backgroundColor: solidColor }}>
        <View>
          <View
            style={{
              ...styles.listInner,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  backgroundColor: colors.primary,
                  ...styles.priorityContainer,
                }}>
                <Ions name="pricetag" color={'#ffffff'} size={18} />
              </View>
              <View
                style={{
                  ...styles.listItemContainer,
                }}>
                <View
                  style={{
                    ...styles.horizontalItemStyles,
                  }}>
                  <Text style={{ ...styles.title, color: colors.text }}>
                    Ticket {item.ticket_no}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ ...styles.title, color: colors.text }}>
                    {item.summary}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    ...styles.horizontalItemStyles,
                  }}>
                  <View
                    style={{
                      ...styles.horizontalItemStyles,
                      flex: 0.15,
                      padding: 8,
                    }}>
                    <TouchableOpacity
                      style={{ paddingHorizontal: 8 }}
                      onPress={() => handleDelete(index)}>
                      <FD name="trash" size={20} color={colors.primary} />
                    </TouchableOpacity>
                    <View style={{ width: 8 }} />
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 8,
                      }}
                      onPress={() => handlePlayPause()}>
                      <FD
                        name={item.isPlaying ? 'pause' : 'play'}
                        size={22}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        ...styles.horizontalItemStyles,
                        justifyContent: 'flex-end',
                      }}>
                      <FT
                        name="stopwatch"
                        size={18}
                        color={colors.primary}
                        style={{ alignSelf: 'center', marginRight: 5 }}
                      />
                      <StopWatch
                        key={parseInt(item.ticket_no.replace('#', ''))}
                        start={item.isPlaying}
                        startTime={item.timer}
                        getTime={time => {
                          const temp = stopwatchs; //* Force Copy Method
                          temp[index] && (temp[index].timer = time);
                          timerStopwatch = temp;
                          SetStopwatch(temp);
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Stack1', {
                          screen: 'NewTimeSheet',
                        });
                      }}
                      disabled={item.isPlaying}>
                      <Text
                        style={{
                          color: colors.primary,
                          textAlign: 'right',
                        }}>
                        {item.isPlaying
                          ? item.created_at
                          : 'Create a Time Entry'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                ...styles.horizontalItemStyles,
              }}>
              <View></View>
            </View>
          </View>
        </View>
        {index !== stopWatchDataList.get()?.length - 1 && (
          <Divider
            style={{ backgroundColor: colors.text, ...styles.dividerStyle }}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      {isLoading ? (
        <SimpleLoader />
      ) : stopwatchs?.length !== 0 ? (
        <FlatList data={stopwatchs} renderItem={RenderList} />
      ) : (
        <NotFound label="Timers" />
      )}
    </View>
  );
};

export default StopWatchScreen;
