import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { Divider, Menu } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';

import { CstmPressable } from '../CstmPressable';
import { styles } from './style';

interface Item {
  text: string;
}
export const CstmMenu = ({
  children = <></>,
  menuItems = [],
  hideMenu = () => {},
  visible = false,
  onChange = value => {},
}: {
  children: React.ReactNode;
  menuItems: Item[];
  hideMenu: () => void;
  visible: boolean;
  onChange: (value: string) => void;
}) => {
  const { colors, dark }: Theme = useTheme();
  const solidColor = dark ? '#000000' : '#ffffff';

  return (
    <Menu
      visible={visible}
      onDismiss={hideMenu}
      style={{ width: moderateScale(170) }}
      contentStyle={{ backgroundColor: solidColor }}
      anchor={children}>
      <FlatList
        data={menuItems}
        renderItem={({ item, index }) => {
          return (
            <>
              <MenuItem
                itemName={item.text}
                textColor={colors.text}
                dark={dark}
                onPress={() => {
                  hideMenu();
                  onChange(item.text);
                }}
              />
              {index == 0 && (
                <Divider
                  style={{ backgroundColor: colors.text, opacity: 0.2 }}
                />
              )}
            </>
          );
        }}
      />
    </Menu>
  );
};

const MenuItem = ({
  itemName,
  onPress,
  leftIcon,
  rightIcon,
  textColor = '#000',
  checkVisible,
  dark,
}: {
  itemName: string;
  onPress: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor?: string;
  checkVisible?: boolean;
  dark?: boolean;
}) => {
  return (
    <CstmPressable
      onPress={onPress}
      android_ripple={{ color: dark ? '#ffffff0e' : '#0000000e' }}>
      <View style={styles.menuItemButtonStyle}>
        <View style={{ flexDirection: 'row' }}>
          {leftIcon}
          <Text style={{ color: textColor, marginHorizontal: 5 }}>
            {itemName}
          </Text>
        </View>
        <View style={styles.menuIconContainer}>
          {checkVisible && rightIcon}
        </View>
      </View>
    </CstmPressable>
  );
};
