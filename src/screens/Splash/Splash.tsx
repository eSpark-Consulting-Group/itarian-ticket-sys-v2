import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

import styles from './style';
import { LightTheme } from '../../theme/colors';
// import MyText from '../../components/MyText/MyText';

const Splash: React.FC<{}> = () => {
  const { colors } = LightTheme;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.primary} />
      <Text style={styles.textStyle}>Loading...</Text>
    </View>
  );
};

export default Splash;
