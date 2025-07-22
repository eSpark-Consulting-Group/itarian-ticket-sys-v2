import React from 'react';
import {
  Pressable,
  PressableAndroidRippleConfig,
  PressableProps,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
// import { Theme, useTheme } from '@react-navigation/native';

export function CstmPressable ({
  android_disableSound = false,
  children,
  onPress = () => {},
  style = {},
  disabled = false,
  android_ripple = {},
  otherProps = {},
}: {
  android_disableSound?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  android_ripple?: null | PressableAndroidRippleConfig;
  otherProps?: PressableProps;
}) {
  // const { dark }: Theme = useTheme();
  // const rippleColor = dark ? '#ffffff1a' : '#0000000e';

  return disabled ? (
    <View>
      {/* <TouchableWithoutFeedback> */}
        <View style={{ ...style }}>{children}</View>
      {/* </TouchableWithoutFeedback> */}
    </View>
  ) : (
    <Pressable
      disabled={disabled}
      style={style}
      onPress={onPress}
      android_disableSound={android_disableSound}
      android_ripple={{
        // color: rippleColor,
        ...android_ripple,
      }}
      {...otherProps}>
      {children}
    </Pressable>
  );
};

