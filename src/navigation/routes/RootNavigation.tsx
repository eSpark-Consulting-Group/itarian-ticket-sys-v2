import React, { useEffect, useState } from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useHookstate, State } from '@hookstate/core';
import QuickActions, { ShortcutItem } from 'react-native-quick-actions';

//@ts-ignore
import store from 'react-native-simple-store';

import { Login, OTPScreen, PinScreen } from '../../screens/index';
import { DarkTheme, LightTheme } from '../../theme/colors';
import { globalState } from '../../stores/globalAppState';
import StackLvl1 from './StackLvl1';
import StackLvl2 from './StackLvl2';
import StackLvl3 from './StackLvl3';
import { userStore } from '../../stores/userStore';
import { AppStatusBar, NoInternetModal } from '../../components';
import NetInfo from '@react-native-community/netinfo';
import { MenuProvider } from 'react-native-popup-menu';
import Splash from '../../screens/Splash/Splash';

import BottomTabs from './BottomTabs';
import { useTheme } from 'react-native-paper';

export type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
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
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<any>(true);
  const { dark, colors }: Theme = useTheme();

  useEffect(() => {
    fetchUserData();
    store.get('pinCode').then((res: any) => res && pinCode.set(res));
    store.get('dSName').then((res: any) => {
      if (res) {
        dSName.set(res?.dSName);
        dScreen.set(res?.dSId);
      }
    });
    store
      .get('dNavName')
      .then((res: any) => res && dNavName.set(res?.dNavName));
    store
      .get('bioMetric')
      .then((res: any) => res && biometricState.set(res?.bioMetric));

    const unsubscribe = NetInfo.addEventListener(state =>
      setIsConnected(state.isConnected),
    );
    return () => unsubscribe();
  }, [themeValue.get()]);

  const fetchUserData = async () => {
    try {
      const res = await store.get('user');
      if (res) user.set(res);
    } catch (error) {
      console.log('Error fetching user data:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    store.get('theme').then((res: any) => res && themeValue.set(res?.theme));
  }, []);

  const handleColdBoot = (data: ShortcutItem) => {
    shortCutScreen.set(data.type);
  };

  QuickActions.popInitialAction()
    .then(data => data && handleColdBoot(data))
    .catch(err => console.log('err', err));

  const pinWiseInitial = pinCode.get()
    ? 'Pin'
    : !user.get()?.email
    ? 'Login'
    : 'Tabs';

  if (isFetching) return <Splash />;

  return (
    <SafeAreaProvider>
      <AppStatusBar
        backgroundColor={LightTheme?.colors.primary}
        // backgroundColor={dark ? 'pink' : 'black'}
        barStyle="light-content"
      />
      <NoInternetModal
        visible={!isConnected}
        colors={
          themeValue.get() === 'light' ? LightTheme.colors : DarkTheme.colors
        }
      />
      <MenuProvider>
        <NavigationContainer
          linking={{ prefixes: ['app://'] }}
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
                }}
              >
                <Stack.Screen
                  name="Tabs"
                  component={BottomTabs}
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
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default App;
