import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Searchbar as Search, Menu } from 'react-native-paper';
import { Theme, useTheme } from '@react-navigation/native';
import FA from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import AD from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale } from 'react-native-size-matters';
import { useHookstate, State } from '@hookstate/core';

import styles from './style';
import { globalState } from '../../stores/globalAppState';
import { CstmPressable } from '../CstmPressable';

const SearchBar = ({
  withTag = false,
  placeholder = 'Search',
  fontSize,
  value,
  setChangeText,
  onSubmit,
  onClear,
  searchType,
}: {
  withTag?: boolean;
  placeholder?: string;
  fontSize?: 'small' | 'medium' | 'large';
  value: string;
  setChangeText: (val: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
  searchType?: string;
}) => {
  const { colors, dark }: Theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [check, setCheckValue] = useState('tickets');

  const searchTagValue: State<string> = useHookstate(globalState.searchTag);

  useEffect(() => {
    console.log('searchType', searchType);

    if (searchType == 'configurations') {
      setCheckValue(searchType);
    }
  }, [searchType]);

  const onChangeSearch = (query: string): void => setChangeText(query);
  const showMenu = (): void => setVisible(!visible);
  const hideMenu = (): void => setVisible(false);

  function setCheck(value: string): void {
    switch (value) {
      case 'tickets':
        setCheckValue(value);
        setVisible(false);
        searchTagValue.set(value);
        return;
      case 'organizations':
        setCheckValue(value);
        setVisible(false);
        searchTagValue.set(value);
        return;
      case 'users':
        setCheckValue(value);
        setVisible(false);
        searchTagValue.set(value);
        return;
      case 'staff':
        setCheckValue(value);
        setVisible(false);
        searchTagValue.set(value);
        return;
      default:
        return;
    }
  }

  function renderTag(value: string): React.ReactNode {
    switch (value) {
      case 'tickets':
        return (
          <Ionicons name="pricetags-outline" color={colors.primary} size={22} />
        );
      case 'organizations':
        return (
          <MCI name="office-building-marker" size={22} color={colors.primary} />
        );
      case 'users':
        return <AD name="contacts" size={22} color={colors.primary} />;
      case 'staff':
        return <MCI name="account-supervisor-outline" size={22} color={colors.primary} />;
      default:
        return (
          <Ionicons name="pricetags-outline" color={colors.primary} size={22} />
        );
    }
  }

  function renderPh(value: string): string {
    switch (value) {
      case 'tickets':
        return 'Search Tickets';
      case 'organizations':
        return 'Search Organizations';
      case 'users':
        return 'Search Users';
      case 'staff':
        return 'Search Staff';
      default:
        return 'Search Tickets';
    }
  }

  function getSize(val: string | undefined): number {
    switch (val) {
      case 'small':
        return 13;
      case 'medium':
        return 14;
      case 'large':
        return 15;
      default:
        return 13;
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{ display: withTag ? 'flex' : 'none', ...styles.adjuster }}
      />
      {withTag && (
        <View
          style={{
            display: withTag ? 'flex' : 'none',
            ...styles.tagContainer,
          }}>
          <Menu
            visible={visible}
            onDismiss={hideMenu}
            contentStyle={{ backgroundColor: dark ? '#000000' : '#ffffff' }}
            anchor={
              <View
                style={{
                  marginTop: moderateScale(9, 0),
                  height: moderateScale(50, 0),
                }}>
                <TouchableOpacity
                  style={{
                    borderColor: colors.primary,
                    ...styles.tagButtonStyle,
                  }}
                  onPress={showMenu}>
                  {renderTag(check)}
                  <FA name="chevron-down" color={colors.primary} size={12} />
                </TouchableOpacity>
              </View>
            }>
            <MenuItem
              itemName="Tickets"
              textColor={colors.text}
              onPress={() => setCheck('tickets')}
              leftIcon={
                <Ionicons
                  name="pricetags-outline"
                  color={colors.primary}
                  size={22}
                />
              }
              checkVisible={check == 'tickets'}
              rightIcon={
                <Feather name="check" color={colors.primary} size={20} />
              }
            />
            <MenuItem
              itemName="Organizations"
              textColor={colors.text}
              onPress={() => setCheck('organizations')}
              leftIcon={
                <MCI
                  name="office-building-marker"
                  size={22}
                  color={colors.primary}
                />
              }
              checkVisible={check == 'organizations'}
              rightIcon={
                <Feather name="check" color={colors.primary} size={20} />
              }
            />
            <MenuItem
              itemName="Users"
              textColor={colors.text}
              onPress={() => setCheck('users')}
              leftIcon={<AD name="contacts" size={22} color={colors.primary} />}
              checkVisible={check == 'users'}
              rightIcon={
                <Feather name="check" color={colors.primary} size={20} />
              }
            />
            <MenuItem
              itemName="Staffs"
              textColor={colors.text}
              onPress={() => setCheck('staff')}
              leftIcon={<MCI name="account-supervisor-outline" size={22} color={colors.primary} />}
              checkVisible={check == 'staff'}
              rightIcon={
                <Feather name="check" color={colors.primary} size={20} />
              }
            />
          </Menu>
        </View>
      )}
      <View style={{ display: withTag ? 'flex' : 'none', width: 0 }} />
      <View
        style={{
          width: withTag ? '83%' : '100%',
          paddingHorizontal: withTag ? 8 : 10,
          padding: 8,
          ...styles.searchInputContainer,
        }}>
        <Search
          placeholder={withTag ? renderPh(check) : placeholder}
          value={value}
          selectionColor={colors.primary}
          placeholderTextColor={dark ? '#ffffff8a' : '#0000008a'}
          iconColor={dark ? '#ffffff8a' : '#0000008a'}
          onChangeText={onChangeSearch}
          onTouchCancel={() => console.log('chala')}
          onSubmitEditing={onSubmit}
          inputStyle={{
            color: colors.text,
            fontSize: getSize(fontSize),
          }}
          style={[
            styles.inputStyle,
            {
              backgroundColor: dark ? '#80808040' : '#dfdfdf',
            },
          ]}
          icon={() => (
            <Ionicons
              name="search"
              size={17}
              color={colors.text}
              style={{ opacity: 0.45 }}
            />
          )}
          clearIcon={() => (
            <MCI
              name="close"
              size={17}
              color={colors.text}
              style={{ opacity: 0.45 }}
              onPress={() => {
                value != '' ? onClear?.() : null;
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

//*---------- Helper Components

const MenuItem = ({
  itemName,
  onPress,
  leftIcon,
  rightIcon,
  textColor = '#000',
  checkVisible,
}: {
  itemName: string;
  onPress: () => void;
  leftIcon: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor?: string;
  checkVisible?: boolean;
}) => {
  return (
    <CstmPressable onPress={onPress} android_ripple={{ color: '#635a5a5c' }}>
      <View style={styles.menuItemButtonStyle}>
        <View style={{ flexDirection: 'row' }}>
          {leftIcon}
          <Text style={{ color: textColor, marginHorizontal: 5 }}>
            {itemName}
          </Text>
        </View>
        <View
          style={{
            width: moderateScale(30),
            flexDirection: 'row-reverse',
          }}>
          {checkVisible && rightIcon}
        </View>
      </View>
    </CstmPressable>
  );
};

export default SearchBar;
