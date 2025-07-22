import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';

import styles from './style';

const CstmButton = ({
  title,
  loader,
  onPress,
  disabled,
}: {
  title: string;
  loader?: boolean;
  onPress: () => void;
  disabled?: boolean;
}) => {
  const { colors }: Theme = useTheme();
  return (
    <View>
      <View style={styles.container}>
        {/* <---- Adjuster from Left ---> */}
        <View style={styles.adjuster} />

        {/* <---- Center ---> */}
        <TouchableOpacity
          disabled={loader || disabled}
          onPress={onPress}
          style={{
            ...styles.button,
            backgroundColor: colors.primary + (disabled ? '40' : ''),
          }}>
          {loader ? (
            <ActivityIndicator color={'#fff'} size={'large'} />
          ) : (
            <Text style={styles.text}>{title}</Text>
          )}
        </TouchableOpacity>

        {/* <---- Adjuster from Right ---> */}
        <View style={styles.adjuster} />
      </View>
    </View>
  );
};

export default CstmButton;
