import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme, Theme } from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { CstmPressable } from '../CstmPressable';

export default function RoundedIcon({
  enable = true,
  icon,
  onPress,
  iconStyle = {},
}: {
  enable?: boolean;
  icon?: string;
  onPress?: () => void;
  iconStyle?: ViewStyle;
}) {
  const { colors, dark }: Theme = useTheme();
  return (
    <View
      style={{
        borderColor: colors.text,
        opacity: enable ? 0.7 : 0.5,
        ...styles.iconStyle,
        ...iconStyle,
      }}>
      <CstmPressable
        disabled={!enable}
        onPress={onPress}
        android_disableSound
        android_ripple={{
          color: enable ? (dark ? '#ffffff1f' : '#0000000e') : 'transparent',
          borderless: true,
        }}>
        <MCI name={icon!} size={22} color={colors.text} style={styles.icon} />
      </CstmPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    borderWidth: 2,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 8,
  },
});
