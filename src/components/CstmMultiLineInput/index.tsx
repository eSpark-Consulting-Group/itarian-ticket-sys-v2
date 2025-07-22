import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';

import styles from './style';
import GapView from '../GapView';

const CstmMultiLine = ({
  title,
  value,
  width = '100%',
  onChangeText,
  placeholder,
}: {
  title?: string;
  value?: string;
  width?: string | number;
  placeholder?: string;
  onChangeText?: (text: string) => void;
}) => {
  const { colors, dark }: Theme = useTheme();

  return (
    <View style={{ width: width }}>
      {title && (
        <>
          <Text
            style={{
              color: colors.text,
              ...styles.labelStyle,
            }}>
            {title}
          </Text>
        </>
      )}
      <TextInput
        multiline
        value={value}
        placeholderTextColor={colors.text + '55'}
        style={{
          color: colors.text,
          width: '100%',
          borderColor: dark ? '#ffffff80' : '#00000080',
          ...styles.multilineDisplay,
        }}
        placeholder={placeholder}
        onChangeText={onChangeText}
        returnKeyType="send"
        autoCorrect={false}
        maxLength={100}
      />
    </View>
  );
};

export default CstmMultiLine;
