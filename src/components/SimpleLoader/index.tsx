import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';

const SimpleLoader = () => {
  const { colors }: Theme = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 40,
  },
});

export default SimpleLoader;
