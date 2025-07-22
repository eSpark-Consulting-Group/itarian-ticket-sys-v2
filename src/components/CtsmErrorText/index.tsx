import React from 'react';
import { View, Text } from 'react-native';

import styles from './style';

const CstmErrorText = ({ errorMsg }: { errorMsg: string | undefined }) => {
  return (
    <View style={styles.container}>
      <View style={styles.adjuster} />
      <View style={styles.center}>
        <Text style={{ color: '#d80303' }}>{errorMsg}</Text>
      </View>
      <View style={styles.adjuster} />
    </View>
  );
};

export default CstmErrorText;
