// /**
//  * @format
//  */

// import { AppRegistry } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);



/**
 * @format
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {AppRegistry, DeviceEventEmitter, Linking, LogBox, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
// import QuickActions, {ShortcutItem} from 'react-native-quick-actions';
import FlashMessage from 'react-native-flash-message';
import {Provider, Text, PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';

import App from './App';
import Splash from './src/screens/Splash/Splash';
import {name as appName} from './app.json';
import { globalState } from './src/stores/globalAppState';
import { useHookstate } from '@hookstate/core';
import { DarkTheme, LightTheme } from './src/theme/colors';

// QuickActions.setShortcutItems([
//   {
//     type: 'TimeSheets', // Required
//     title: 'Time Sheet', // Optional, if empty, `type` will be used instead
//     subtitle: 'Go to Time Sheet Screen',
//     icon: 'ic_file_clock', // Icons instructions below
//     userInfo: {
//       url: 'app://D/TS', // Provide any custom data like deep linking URL
//     },
//   },
//   {
//     type: 'SBoard', // Required
//     title: 'Service Board', // Optional, if empty, `type` will be used instead
//     subtitle: 'Go to Service Board Screen',
//     icon: 'ic_support', // Icons instructions below
//     userInfo: {
//       url: 'app://D/SB', // Provide any custom data like deep linking URL
//     },
//   },
//   {
//     type: 'ExpReports', // Required
//     title: 'Expense Report', // Optional, if empty, `type` will be used instead
//     subtitle: 'Go to Expense Report Screen',
//     icon: 'ic_coins', // Icons instructions below
//     userInfo: {
//       url: 'app://D/ER', // Provide any custom data like deep linking URL
//     },
//   },
// ]);

// DeviceEventEmitter.addListener('quickActionShortcut', data => {
//   const {userInfo} = data;
//   console.log('chala');
//   Linking.openURL(userInfo?.url);
// });

const Screen = () => {
  const [state, setState] = useState(false);
  const themeValue = useHookstate(globalState.theme);
  
  useEffect(() => {
    RNBootSplash.hide();

    setTimeout(() => {
      setState(true);
    }, 1000);
  }, []);
  LogBox.ignoreLogs([
    'Deprecation warning: value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date()',
    "The navigation state parsed from the URL contains routes not present in the root navigator. This usually means that the linking configuration doesn't match the navigation structure",
    'Non-serializable values were found in the navigation state',
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
  ]);
  return state === true ? (
    <PaperProvider theme={DefaultTheme}>
      <App />
      {/* <View>
        <Text>Welcome to iTarian Ticket System</Text>
      </View> */}
      <FlashMessage position="top" />
    </PaperProvider>
  ) : (
    <Splash />
  );
};

AppRegistry.registerComponent(appName, () => Screen);
