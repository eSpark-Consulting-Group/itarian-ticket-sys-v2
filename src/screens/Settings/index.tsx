// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, FlatList } from 'react-native';
// import { Theme, useTheme } from '@react-navigation/native';
// import { List, Divider, Switch, Menu } from 'react-native-paper';
// import { useHookstate, State } from '@hookstate/core';
// import { moderateScale } from 'react-native-size-matters';
// // @ts-ignore
// import store from 'react-native-simple-store';

// import { globalState } from '../../stores/globalAppState';
// import { useUpdateEffect } from '../../utils/hooks';
// import { screenItemList } from '../../constants/SampleArrays';
// import { getNavigtionApps } from '../../utils/helperFunctions';
// import { BiometricVerification, CstmPressable } from '../../components';
// const SettingsScreen = () => {
//   const themeValue: State<string> = useHookstate(globalState.theme);
//   const biometricState: State<boolean> = useHookstate(globalState.useBiometric);
//   const dScreen: State<string> = useHookstate(globalState.defaultScreenId);
//   const dSName: State<string> = useHookstate(globalState.defaultScreenName);
//   const dNavName: State<string> = useHookstate(
//     globalState.defaultnNavigationName,
//   );

//   const [isSwitchOn, setIsSwitchOn] = useState(
//     themeValue.get() == 'light' ? false : true,
//   );
//   const [visible, setVisible] = useState(false);
//   const [defaultScreen, setdefaultScreen] = useState(dSName.get());

//   const [navigationVisible, setnavigationVisible] = useState(false);
//   const [defaultNavigitonList, setDefaultNavigationList] = useState([]);
//   const [defaultNav, setdefaultNav] = useState(dNavName.get());
//   const [showScanner, setShowScanners] = useState(false);

//   const onToggleSwitch = () => {
//     setIsSwitchOn(!isSwitchOn);
//   };

//   // const checkBiometricAvailable = () => {
//   //   FingerprintScanner.isSensorAvailable()
//   //     .then(biometryType => {
//   //       console.log('Biometric', biometryType);
//   //       setShowScanners(true);
//   //     })
//   //     .catch(error => {
//   //       setShowScanners(false);
//   //       Alert.alert(error.name, error.message, [
//   //         {
//   //           text: 'Open Security',
//   //           style: 'default',
//   //           onPress: () => AndroidOpenSettings.securitySettings(),
//   //         },
//   //         {
//   //           text: 'Cancel',
//   //           style: 'cancel',
//   //         },
//   //       ]);
//   //     });
//   // };

//   const onAuthenticBiometric = () => {
//     store.update('bioMetric', {
//       bioMetric: true,
//     });
//     biometricState.set(true);
//     setShowScanners(false);
//   };

//   // const onToggleBiometrics = () => {
//   //   if (!biometricState.get()) {
//   //     checkBiometricAvailable();
//   //   } else {
//   //     store.update('bioMetric', {
//   //       bioMetric: !biometricState.get(),
//   //     });
//   //     biometricState.set(!biometricState.get());
//   //   }
//   // };

//   useUpdateEffect(() => {
//     // watch the swtich state for theme change
//     if (isSwitchOn) {
//       themeValue.set('dark');
//       store.update('theme', {
//         theme: 'dark',
//       });
//     } else {
//       themeValue.set('light');
//       store.update('theme', {
//         theme: 'light',
//       });
//     }
//   }, [isSwitchOn]);

//   const handleDefaultSwitch = (id: string, name: string) => {
//     dScreen.set(id);
//     dSName.set(name);
//     store.update('dSName', {
//       dSName: name,
//       dSId: id,
//     });
//     setdefaultScreen(name);
//   };

//   const handleDefaultNaveSwitch = (id: string, name: string) => {
//     dNavName.set(name);
//     store.update('dNavName', {
//       dNavName: name,
//     });
//     setdefaultNav(name);
//   };

//   const hideMenu = () => {
//     console.log('hideMenu');
//     setVisible(false);
//   };
//   const openMenu = () => {
//     console.log('openMenu', visible);
//     setVisible(true);
//   };

//   const hideNavMenu = () => {
//     setnavigationVisible(false);
//   };
//   const openNavMenu = () => {
//     setnavigationVisible(true);
//   };

//   useEffect(() => {
//     getNavigtionApps()
//       .then(arr => {
//         setDefaultNavigationList(arr);
//       })
//       .catch(err => {
//         console.log('err', err);
//       });
//   }, []);
//   const { colors, dark }: Theme = useTheme();

//   console.log('visible', visible);

//   return (
//     <View>
//       <List.Section>
//         <List.Subheader style={{ color: colors.text, opacity: 0.6 }}>
//           Theme
//         </List.Subheader>
//         <List.Item
//           title="Current Theme"
//           titleStyle={{ color: colors.text, opacity: 0.75 }}
//           right={() => (
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <List.Icon
//                 icon="weather-sunny"
//                 color={colors.primary}
//                 style={{ opacity: 1 }}
//               />
//               <Switch
//                 value={isSwitchOn}
//                 onValueChange={onToggleSwitch}
//                 thumbColor={colors.primary}
//                 color={colors.primary}
//                 trackColor={{ true: '#5b57578f', false: '#5b57578f' }}
//               />
//               <List.Icon icon="weather-night" color={colors.primary} />
//             </View>
//           )}
//         />
//         <Divider
//           style={{
//             backgroundColor: colors.text,
//             opacity: 0.25,
//             transform: [{ scale: 2 }],
//           }}
//         />
//         <List.Subheader style={{ color: colors.text, opacity: 0.6 }}>
//           Default Home Screen
//         </List.Subheader>
//         <TouchableOpacity onPress={openMenu}>
//           <List.Item
//             title={defaultScreen}
//             titleStyle={{ color: colors.text, opacity: 0.75 }}
//             right={() => (
//               <View style={{ flexDirection: 'row' }}>
//                 <Menu
//                   visible={visible}
//                   onDismiss={hideMenu}
//                   style={{
//                     width: moderateScale(170),
//                     height: moderateScale(200),
//                   }}
//                   contentStyle={{ backgroundColor: colors.background }}
//                   anchor={
//                     <List.Icon
//                       icon="chevron-right"
//                       color={colors.primary}
//                       style={{ opacity: 1 }}
//                     />
//                   }
//                 >
//                   <FlatList
//                     data={screenItemList}
//                     renderItem={({ item, index }) => {
//                       return (
//                         <MenuItem
//                           itemName={item.name}
//                           textColor={colors.text}
//                           dark={dark}
//                           onPress={() => {
//                             hideMenu();
//                             handleDefaultSwitch(item.id, item.name);
//                           }}
//                         />
//                       );
//                     }}
//                   />
//                 </Menu>
//               </View>
//             )}
//           />
//         </TouchableOpacity>

//         <Divider
//           style={{
//             backgroundColor: colors.text,
//             opacity: 0.25,
//             transform: [{ scale: 2 }],
//           }}
//         />
//         <List.Subheader style={{ color: colors.text, opacity: 0.6 }}>
//           Default Navigation App
//         </List.Subheader>
//         <TouchableOpacity onPress={openNavMenu}>
//           <List.Item
//             title={defaultNav || 'Select default navigation'}
//             titleStyle={{ color: colors.text, opacity: 0.75 }}
//             right={() => (
//               <View style={{ flexDirection: 'row' }}>
//                 <Menu
//                   visible={navigationVisible}
//                   onDismiss={hideNavMenu}
//                   style={{
//                     width: moderateScale(170),
//                     height: moderateScale(200),
//                   }}
//                   contentStyle={{ backgroundColor: colors.background }}
//                   anchor={
//                     <List.Icon
//                       icon="chevron-right"
//                       color={colors.primary}
//                       style={{ opacity: 1 }}
//                     />
//                   }
//                 >
//                   <FlatList
//                     data={defaultNavigitonList}
//                     renderItem={({ item, index }: any) => {
//                       return (
//                         <MenuItem
//                           itemName={item.name}
//                           textColor={colors.text}
//                           dark={dark}
//                           onPress={() => {
//                             hideNavMenu();
//                             handleDefaultNaveSwitch(index, item.name);
//                           }}
//                         />
//                       );
//                     }}
//                   />
//                 </Menu>
//               </View>
//             )}
//           />
//         </TouchableOpacity>
//         {/* <Divider
//           style={{
//             backgroundColor: colors.text,
//             opacity: 0.25,
//             transform: [{scale: 2}],
//           }}
//         />
//         <List.Subheader style={{color: colors.text, opacity: 0.6}}>
//           Biometrics
//         </List.Subheader>
//         <List.Item
//           title="Use Biometrics for Login"
//           titleStyle={{color: colors.text, opacity: 0.75}}
//           right={() => (
//             <Switch
//               value={biometricState.get()}
//               onValueChange={onToggleBiometrics}
//               thumbColor={colors.primary}
//               color={colors.primary}
//               trackColor={{true: '#5b57578f', false: '#5b57578f'}}
//             />
//           )}
//         /> */}
//       </List.Section>
//       {showScanner && (
//         <BiometricVerification
//           onAuthenticate={onAuthenticBiometric}
//           onCancel={() => setShowScanners(false)}
//         />
//       )}
//     </View>
//   );
// };

// //*---------- Helper Components

// const MenuItem = ({
//   itemName,
//   onPress,
//   leftIcon,
//   rightIcon,
//   textColor = '#000',
//   checkVisible,
//   dark,
// }: {
//   itemName: string;
//   onPress: () => void;
//   leftIcon?: React.ReactNode;
//   rightIcon?: React.ReactNode;
//   textColor?: string;
//   checkVisible?: boolean;
//   dark?: boolean;
// }) => {
//   const rippleColor = dark ? '#ffffff1a' : '#0000000e';

//   return (
//     <CstmPressable onPress={onPress} android_ripple={{ color: rippleColor }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           padding: 10,
//           justifyContent: 'space-between',
//         }}
//       >
//         <View style={{ flexDirection: 'row' }}>
//           {leftIcon}
//           <Text style={{ color: textColor, marginHorizontal: 5 }}>
//             {itemName}
//           </Text>
//         </View>
//         <View
//           style={{
//             width: moderateScale(30),
//             flexDirection: 'row-reverse',
//           }}
//         >
//           {checkVisible && rightIcon}
//         </View>
//       </View>
//     </CstmPressable>
//   );
// };

// export default SettingsScreen;

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Switch } from 'react-native';
import { useTheme, Theme } from '@react-navigation/native';
import { useHookstate, State } from '@hookstate/core';
import { moderateScale } from 'react-native-size-matters';
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
      .then(arr => {
        setDefaultNavigationList(arr);
      })
      .catch(err => {
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
            setDropdownTop(y - 22); // position list just below the touchable
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
          }}
        >
          <Text style={{ color: colors.text }}>{defaultScreen}</Text>
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
        onPress={() => setnavigationVisible(!navigationVisible)}
      >
        <View
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.text }}>
            {defaultNav || 'Select default navigation'}
          </Text>
        </View>
      </TouchableOpacity>
      {navigationVisible && (
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

// MenuItem Component
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
