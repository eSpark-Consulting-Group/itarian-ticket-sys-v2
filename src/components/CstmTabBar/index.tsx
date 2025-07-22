import React, { useEffect, useReducer, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import _ from 'lodash';

import styles from './styles';
import { ModalField } from '..';
import { WINDOW_WIDTH } from '../../constants';
import { CstmPressable } from '../CstmPressable';

interface Item {
  key: string;
  title: string;
}

export default function CstmTabBar(props: any) {
  const { dark, colors }: Theme = useTheme();
  const { routes, index: routeIndex } = props.navigationState;
  const [translateValue] = useState(new Animated.Value(0));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [elevation, setElevation] = useState(0);
  var highlight = dark ? '#000000' : '#fff';

  const handleWidth =
    routes?.length < 3 ? WINDOW_WIDTH * 0.405 : WINDOW_WIDTH * 0.305;
  const factor = routes?.length < 3 ? 1.03 : WINDOW_WIDTH > 600 ? 1.025 : 1.045;

  const animateHeader = (index: any) => {
    Animated.timing(translateValue, {
      toValue: index * factor * handleWidth,
      // The translateX value should change depending on the chosen route
      duration: 200,
      useNativeDriver: true,
    }).start(); // the animation that animates the active tab circle
    setCurrentIndex(index);
    let elevationVal = index == routeIndex ? 2 : 0;
    setElevation(elevationVal);
  };

  useEffect(() => {
    animateHeader(routeIndex);
  }, [routeIndex]);

  const renderList = (item: Item, index: number) => {
    const handleTabNavigation = (hitIndex: number) => {
      animateHeader(hitIndex);
      switch (hitIndex) {
        case 0:
          props.jumpTo('first');
          return;
        case 1:
          props.jumpTo('second');
          return;
        case 2:
          props.jumpTo('third');
          return;
      }
    };

    return (
      <View
        key={item?.key}
        style={{
          flexDirection: 'row',
          // backgroundColor: colors.background,
          zIndex: -1,
        }}>
        <CstmPressable
          onPress={() => {
            handleTabNavigation(index);
          }}
          android_ripple={{ color: 'transparent' }}>
          <View
            style={{
              width: handleWidth,
              ...styles.itemStyle,
              backgroundColor: colors.background,
            }}>
            <Text style={{ ...styles.textStyle, color: colors.text }}>
              {item.title}
            </Text>
          </View>
        </CstmPressable>
        {index !== routes?.length - 1 && <View style={styles.dividerStyle} />}
      </View>
    );
  };

  return (
    <ModalField pressEnable={false}>
      <View
        style={{
          ...styles.container,
          backgroundColor: colors.background,
        }}>
        <View>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { height: '100%', justifyContent: 'center' },
            ]}>
            <Animated.View
              style={[
                {
                  width: handleWidth,
                  transform: [{ translateX: translateValue }],
                },
              ]}>
              <View
                style={{
                  elevation,
                  ...styles.itemStyle,
                  backgroundColor: highlight,
                  height: '100%',
                  bottom: WINDOW_WIDTH > 600 ? 18 : 17,
                }}>
                <Text style={{ ...styles.textStyle, color: colors.text }}>
                  {props?.navigationState?.routes[currentIndex].title}
                </Text>
              </View>
            </Animated.View>
          </View>
        </View>
        {!_.isUndefined(routes) && routes?.map(renderList)}
      </View>
    </ModalField>
  );
}
