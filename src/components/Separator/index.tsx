import { Theme, useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';

import styles from './style';
import MyText from '../MyText/MyText';

const Separator = ({
  text,
  width,
}: {
  text?: string;
  width?: number | string;
}) => {
  const { colors }: Theme = useTheme();

  const length = width ?? 100;

  return (
    <View style={styles.container}>
      <Divider
        style={{
          ...styles.divider,
          backgroundColor: colors.text,
          opacity: 0.2,
          width: length,
        }}
      />
      <MyText style={{ ...styles.centerContent, color: colors.text }}>
        {text}
      </MyText>
      <Divider
        style={{
          ...styles.divider,
          backgroundColor: colors.text,
          opacity: 0.2,
          width: length,
        }}
      />
    </View>
  );
};

export default Separator;
