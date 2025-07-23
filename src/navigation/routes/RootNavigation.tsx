import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useHookstate, State } from '@hookstate/core';
import QuickActions, { ShortcutItem } from 'react-native-quick-actions';

//@ts-ignore
import store from 'react-native-simple-store';

import { Login, OTPScreen, PinScreen } from '../../screens/index';
import { DarkTheme, LightTheme } from '../../theme/colors';
import Drawer from './Drawer';
import { globalState } from '../../stores/globalAppState';
import StackLvl1 from './StackLvl1';
import StackLvl2 from './StackLvl2';
import StackLvl3 from './StackLvl3';
import { userStore } from '../../stores/userStore';
import { AppStatusBar, NoInternetModal } from '../../components';
import NetInfo from '@react-native-community/netinfo';
import { showMessage } from 'react-native-flash-message';
import { alert_Dur } from '../../constants';
import { SafeAreaView } from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  Draw: undefined;
  Stack1: undefined;
  Stack2: { screen: string; params?: object };
  Stack3: undefined;
  OTPScreen: undefined;
  Pin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const themeValue: State<string> = useHookstate(globalState.theme);
  const biometricState: State<boolean> = useHookstate(globalState.useBiometric);
  const pinCode: State<any> = useHookstate(userStore.pinCode);
  const shortCutScreen: State<any> = useHookstate(globalState.shortCutScreen);
  const dSName: State<string> = useHookstate(globalState.defaultScreenName);
  const dScreen: State<any> = useHookstate(globalState.defaultScreenId);
  const user: State<any> = useHookstate(userStore.user);
  const dNavName: State<string> = useHookstate(
    globalState.defaultnNavigationName,
  );

  const [isConnected, setIsConnected] = useState<any>(true);
  //! ----------------------------------------------------

  //! ---------------------------------------------------

  useEffect(() => {
    store.get('pinCode').then((res: any) => {
      if (res) {
        pinCode.set(res);
      }
    });
    store.get('user').then((res: any) => {
      // console.log("res res user user", res)
      if (res) user.set(res);
    });
    store.get('dSName').then((res: any) => {
      if (res) {
        dSName.set(res?.dSName);
        dScreen.set(res?.dSId);
      }
    });
    store.get('dNavName').then((res: any) => {
      if (res) {
        dNavName.set(res?.dNavName);
      }
    });
    store.get('bioMetric').then((res: any) => {
      if (res) {
        biometricState.set(res?.bioMetric);
      }
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, [themeValue.get()]);

  useEffect(() => {
    store.get('theme').then((res: any) => {
      if (res) {
        themeValue.set(res?.theme);
      }
    });
  }, []);

  const handleColdBoot = (data: ShortcutItem) => {
    shortCutScreen.set(data.type);
  };

  QuickActions.popInitialAction()
    .then(data => {
      if (data != null) handleColdBoot(data);
    })
    .catch(err => console.log('err', err));

  const pinWiseInitial = pinCode.get() ? 'Pin' : 'Login';

  console.log('isConnected?', isConnected, user.get()?.email);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AppStatusBar
          backgroundColor={LightTheme?.colors.primary}
          barStyle="light-content"
        />
        <NoInternetModal
          visible={!isConnected}
          colors={
            themeValue.get() === 'light' ? LightTheme.colors : DarkTheme.colors
          }
        />
        <NavigationContainer
          linking={{
            prefixes: ['app://'],
          }}
          theme={themeValue.get() === 'light' ? LightTheme : DarkTheme}
        >
          <Stack.Navigator initialRouteName={pinWiseInitial}>
            {!user.get()?.email ? (
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Pin"
                  component={PinScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="OTPScreen"
                  component={OTPScreen}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <Stack.Group
                screenOptions={{
                  presentation: 'modal',
                  animation: 'slide_from_bottom',
                }}>
                <Stack.Screen
                  name="Draw"
                  component={Drawer}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Stack1"
                  component={StackLvl1}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Stack2"
                  component={StackLvl2}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Stack3"
                  component={StackLvl3}
                  options={{ headerShown: false }}
                />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
