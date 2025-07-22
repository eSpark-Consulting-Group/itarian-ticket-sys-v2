import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';

const ModalView = ({
  children,
  bgColor,
}: {
  children?: ReactNode;
  bgColor?: string;
}) => {
  const { colors }: Theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: bgColor ?? colors.background,
      }}>
      {children}
    </View>
  );
};

export default ModalView;
