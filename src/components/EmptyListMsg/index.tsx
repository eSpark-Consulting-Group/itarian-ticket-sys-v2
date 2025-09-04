import React from 'react';
import { View } from 'react-native';
import MyText from '../MyText/MyText';
import { Theme, useTheme } from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

const EmptyListMsg = ({
  label,
  iconName = 'selection-search',
}: {
  label: string;
  iconName?: string;
}): JSX.Element => {
  const { colors, dark }: Theme = useTheme();
  return (
    <View style={styles.emptyListContainer}>
      <MCI name={iconName} color={'#8585858a'} size={100} />
  <MyText style={{ color: colors.text, ...styles.emptyListLabel }}>
        No {label} Found
  </MyText>
      <View style={styles.emptyListAdjuster} />
    </View>
  );
};

export default EmptyListMsg;
