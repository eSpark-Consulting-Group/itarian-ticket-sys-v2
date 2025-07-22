import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';

import GapView from '../GapView';
import styles from './style';

const CstmTitleInput = ({
  title,
  value,
  onChangeText,
  width = '100%',
  keyboardType = 'default',
  placeholder,
}: {
  title?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  width?: string | number;
  keyboardType?: KeyboardTypeOptions | undefined;
  placeholder?: string;
}) => {
  const { colors, dark }: Theme = useTheme();
  const [val, setVal] = useState();

  return (
    <View style={{ width: width }}>
      {title && (
        <>
          <GapView mode="vertical" />
          <Text style={{ color: colors.text, opacity: 0.8 }}>{title}</Text>
        </>
      )}
      <GapView mode="vertical" length={5} />
      <TextInput
        placeholderTextColor={colors.text + '55'}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={val ?? value}
        style={{
          ...styles.input,
          width: '100%',
          color: colors.text,
          borderColor: colors.text + '77',
        }}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        selectionColor={colors.primary}
      />
    </View>
  );
};

export default CstmTitleInput;
