import React from 'react';
import { View, } from 'react-native';

import styles from './style';
import MyText from '../MyText/MyText';

const CstmErrorText = ({ errorMsg }: { errorMsg: string | undefined }) => {
  return (
    <View style={styles.container}>
      <View style={styles.adjuster} />
      <View style={styles.center}>
        <MyText style={{ color: '#d80303' }}>{errorMsg}</MyText>
      </View>
      <View style={styles.adjuster} />
    </View>
  );
};

export default CstmErrorText;
