import React from 'react';
import { StyleSheet, View } from 'react-native';

import EmptyListMsg from '../EmptyListMsg';

const NotFound = ({
  label,
  iconName = 'selection-search',
  display = 'flex',
}: {
  label: string;
  iconName?: string;
  display?: 'flex' | 'none';
}): JSX.Element => {
  return (
    <View style={{ ...styles.content, display }}>
      <EmptyListMsg iconName={iconName} label={label} />
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
