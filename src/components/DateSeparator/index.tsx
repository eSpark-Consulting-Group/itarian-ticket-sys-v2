import React from 'react';
import { View, Text } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { Divider } from 'react-native-paper';

import styles from './style';

const DateSeparator = ({ text }: { text: string }) => {
  const { colors }: Theme = useTheme();

  return (
    <View style={styles.container}>
      <Divider
        style={{
          ...styles.divider_1,
          backgroundColor: colors.text,
          opacity: 0.2,
        }}
      />
      <Text style={{ ...styles.centerContent, color: colors.text }}>
        {text}
      </Text>
      <Divider
        style={{
          ...styles.divider_2,
          backgroundColor: colors.text,
          opacity: 0.2,
        }}
      />
    </View>
  );
};

export default DateSeparator;
