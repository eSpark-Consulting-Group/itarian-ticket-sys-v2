import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useTheme, Theme } from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import { CstmPressable } from '../CstmPressable';
import GapView from '../GapView';

const ModalHeader = ({
  right,
  title,
  subTitle,
  icon,
  subIcon,
  empty = false,
  children,
  onPress,
  disabled = true,
  searchHeader = false,
}: {
  icon?: string;
  right?: ReactNode;
  title?: string;
  subTitle?: string;
  subIcon?: string;
  empty?: boolean;
  children?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  searchHeader?: boolean;
}) => {
  const { colors, dark }: Theme = useTheme();

  const solidColor = dark ? '#000000' : '#ffffff';

  return (
    <CstmPressable
      disabled={disabled}
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: solidColor,
        padding: searchHeader ? 0 : 14,
      }}>
      <View
        style={{
          flexDirection: !empty ? 'row' : 'column',
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            {empty
              ? children
              : icon && (
                  <MCI
                    name={icon as string}
                    size={18}
                    color={colors.text}
                    style={{ alignSelf: 'center' }}
                  />
                )}
            <GapView mode="horizontal" length={5} />
            {!icon && <GapView mode="horizontal" length={14} />}
            <Text style={{ ...styles.title, color: colors.text }}>{title}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {subIcon && (
              <MCI
                name={subIcon as string}
                size={14}
                color={colors.text}
                style={{ alignSelf: 'center', opacity: 0.5 }}
              />
            )}
            {icon && <GapView mode="horizontal" length={18} />}
            <GapView mode="horizontal" length={5} />
            {subTitle && (
              <Text style={{ ...styles.subTitle, color: colors.text }}>
                {subTitle}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.rightContainer}>{right}</View>
      </View>
    </CstmPressable>
  );
};

export default ModalHeader;
