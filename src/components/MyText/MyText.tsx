import { Theme, useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

export interface MyTextProps extends TextProps {
  font?:
    | 'Poppins-Black'
    | 'Poppins-BlackItalic'
    | 'Poppins-Bold'
    | 'Poppins-BoldItalic'
    | 'Poppins-ExtraBold'
    | 'Poppins-ExtraBoldItalic'
    | 'Poppins-ExtraLight'
    | 'Poppins-ExtraLightItalic'
    | 'Poppins-Italic'
    | 'Poppins-Light'
    | 'Poppins-LightItalic'
    | 'Poppins-Medium'
    | 'Poppins-MediumItalic'
    | 'Poppins-Regular'
    | 'Poppins-SemiBold'
    | 'Poppins-SemiBoldItalic'
    | 'Poppins-Thin'
    | 'Poppins-ThinItalic';
}

const MyText: React.FC<MyTextProps> = ({ font = 'Poppins-Regular', style, children, ...props }) => {
    const { colors, dark }: Theme = useTheme();
  return (
    <Text
      {...props}
      style={[
        { fontFamily: font, color: colors.text },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default MyText;
