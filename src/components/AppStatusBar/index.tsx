import React from 'react';
import { StatusBar } from 'react-native';

const AppStatusBar = ({
  backgroundColor,
  barStyle,
  ...props
}: {
  backgroundColor: string;
  barStyle: string;
}) => {
  return <StatusBar backgroundColor={backgroundColor} {...props} />;
};

export default AppStatusBar;
