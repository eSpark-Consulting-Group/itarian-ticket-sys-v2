import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Switch,
  DimensionValue,
} from 'react-native';
import { useTheme, Theme } from '@react-navigation/native';
import { useHookstate, State } from '@hookstate/core';
import { moderateScale } from 'react-native-size-matters';
import EI from 'react-native-vector-icons/Entypo';

// @ts-ignore
import store from 'react-native-simple-store';

import { globalState } from '../../stores/globalAppState';
import { useUpdateEffect } from '../../utils/hooks';
import { screenItemList } from '../../constants/SampleArrays';
import { getNavigtionApps } from '../../utils/helperFunctions';
import { BiometricVerification, CstmPressable } from '../../components';

const SettingsScreen = () => {
  const themeValue: State<string> = useHookstate(globalState.theme);
  const biometricState: State<boolean> = useHookstate(globalState.useBiometric);
  const dScreen: State<string> = useHookstate(globalState.defaultScreenId);
  const dSName: State<string> = useHookstate(globalState.defaultScreenName);
  const dNavName: State<string> = useHookstate(
    globalState.defaultnNavigationName,
  );

  const [isSwitchOn, setIsSwitchOn] = useState(themeValue.get() === 'dark');
  const [visible, setVisible] = useState(false);
  const [defaultScreen, setdefaultScreen] = useState(dSName.get());

  const [navigationVisible, setnavigationVisible] = useState(false);
  const [defaultNavigitonList, setDefaultNavigationList] = useState([]);
  const [defaultNav, setdefaultNav] = useState(dNavName.get());
  const [showScanner, setShowScanners] = useState(false);

  const dropdownRef = useRef<View>(null);
  const [dropdownTop, setDropdownTop] = useState<number>(0);
  const navigationDropdownRef = useRef<any>(null);
  const [navDropdownTop, setNavDropdownTop] = useState(0);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  // const checkBiometricAvailable = () => {
  //   FingerprintScanner.isSensorAvailable()
  //     .then(biometryType => {
  //       setShowScanners(true);
  //     })
  //     .catch(error => {
  //       setShowScanners(false);
  //       Alert.alert(error.name, error.message, [
  //         {
  //           text: 'Open Security',
  //           style: 'default',
  //           onPress: () => AndroidOpenSettings.securitySettings(),
  //         },
  //         { text: 'Cancel', style: 'cancel' },
  //       ]);
  //     });
  // };

  const onAuthenticBiometric = () => {
    store.update('bioMetric', { bioMetric: true });
    biometricState.set(true);
    setShowScanners(false);
  };

  // const onToggleBiometrics = () => {
  //   if (!biometricState.get()) {
  //     checkBiometricAvailable();
  //   } else {
  //     store.update('bioMetric', { bioMetric: !biometricState.get() });
  //     biometricState.set(!biometricState.get());
  //   }
  // };

  useUpdateEffect(() => {
    themeValue.set(isSwitchOn ? 'dark' : 'light');
    store.update('theme', { theme: isSwitchOn ? 'dark' : 'light' });
  }, [isSwitchOn]);

  const handleDefaultSwitch = (id: string, name: string) => {
    dScreen.set(id);
    dSName.set(name);
    store.update('dSName', { dSName: name, dSId: id });
    setdefaultScreen(name);
  };

  const handleDefaultNaveSwitch = (id: string, name: string) => {
    dNavName.set(name);
    store.update('dNavName', { dNavName: name });
    setdefaultNav(name);
  };

  useEffect(() => {
    getNavigtionApps()
      .then((arr: any) => {
        console.log('=====, ', arr);

        setDefaultNavigationList(arr);
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  }, []);

  const { colors, dark }: Theme = useTheme();

  return (
    <View style={{ padding: 20 }}>
      {/* Theme Toggle */}
      <Text style={{ color: colors.text, opacity: 0.6, marginBottom: 10 }}>
        Theme
      </Text>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
      >
        <Text style={{ color: colors.text, marginRight: 10 }}>Light</Text>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          thumbColor={colors.primary}
          trackColor={{ true: '#5b57578f', false: '#5b57578f' }}
        />
        <Text style={{ color: colors.text, marginLeft: 10 }}>Dark</Text>
      </View>

      {/* Default Home Screen Selection */}
      <Text style={{ color: colors.text, opacity: 0.6, marginBottom: 10 }}>
        Default Home Screen
      </Text>
      <TouchableOpacity
        ref={dropdownRef}
        onPress={() => {
          dropdownRef.current?.measureInWindow((x, y, width, height) => {
            setDropdownTop(y - 20); // position list just below the touchable
            setVisible(!visible);
          });
        }}
        style={{ marginBottom: 10 }}
      >
        <View
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: colors.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: colors.text }}>{defaultScreen}</Text>
          <EI
            name={visible === true ? 'chevron-up' : 'chevron-down'}
            size={22}
            style={{ paddingHorizontal: 5 }}
            color={colors.primary}
          />
        </View>
      </TouchableOpacity>

      {visible && (
        <View
          style={{
            position: 'absolute',
            top: dropdownTop, // <- you may set this based on layout
            left: 20, // adjust to align with Touchable
            right: 20,
            zIndex: 100,
            backgroundColor: colors.background,
            borderRadius: 8,
            elevation: 5, // for Android shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        >
          <FlatList
            data={screenItemList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <MenuItem
                itemName={item.name}
                textColor={colors.text}
                dark={dark}
                onPress={() => {
                  setVisible(false);
                  handleDefaultSwitch(item.id, item.name);
                }}
              />
            )}
          />
        </View>
      )}

      {/* Default Navigation App */}
      <Text
        style={{
          color: colors.text,
          opacity: 0.6,
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        Default Navigation App
      </Text>

      <TouchableOpacity
        ref={navigationDropdownRef}
        onPress={() => {
          navigationDropdownRef.current?.measureInWindow(
            (x: any, y: any, width: DimensionValue, height: DimensionValue) => {
              setNavDropdownTop(y - 20);
              setnavigationVisible(!navigationVisible);
            },
          );
        }}
        style={{ marginBottom: 10 }}
      >
        <View
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: colors.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: colors.text }}>
            {defaultNav || 'Select default navigation'}
          </Text>
          <EI
            name={navigationVisible ? 'chevron-up' : 'chevron-down'}
            size={22}
            style={{ paddingHorizontal: 5 }}
            color={colors.primary}
          />
        </View>
      </TouchableOpacity>

      {navigationVisible && (
        <View
          style={{
            position: 'absolute',
            top: navDropdownTop,
            left: 20,
            right: 20,
            zIndex: 100,
            backgroundColor: colors.background,
            borderRadius: 8,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        >
          <FlatList
            data={defaultNavigitonList}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }: any) => (
              <MenuItem
                itemName={item.name}
                textColor={colors.text}
                dark={dark}
                onPress={() => {
                  setnavigationVisible(false);
                  handleDefaultNaveSwitch(index.toString(), item.name);
                }}
              />
            )}
          />
        </View>
      )}

      {/* <Text
        style={{
          color: colors.text,
          opacity: 0.6,
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        Biometrics
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.text }}>Use Biometrics for Login</Text>
        <Switch
          value={biometricState.get()}
          onValueChange={onToggleBiometrics}
          thumbColor={colors.primary}
          trackColor={{ true: '#5b57578f', false: '#5b57578f' }}
        />
      </View> */}

      {showScanner && (
        <BiometricVerification
          onAuthenticate={onAuthenticBiometric}
          onCancel={() => setShowScanners(false)}
        />
      )}
    </View>
  );
};

// helper
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
  const rippleColor = dark ? '#ffffff1a' : '#0000000e';

  return (
    <CstmPressable onPress={onPress} android_ripple={{ color: rippleColor }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {leftIcon}
          <Text style={{ color: textColor, marginHorizontal: 5 }}>
            {itemName}
          </Text>
        </View>
        <View
          style={{ width: moderateScale(30), flexDirection: 'row-reverse' }}
        >
          {checkVisible && rightIcon}
        </View>
      </View>
    </CstmPressable>
  );
};

export default SettingsScreen;
