import React from 'react';
import { View } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import MI from 'react-native-vector-icons/MaterialIcons';

import { ServiceTickets as STickets } from '../../forms';
import { handleStopwatch } from '../utils/headerFunctions';
import Settings from '../../screens/Settings';
import Contact1 from '../../screens/Contacts/View/Contacts';
import NewResponseScreen from '../../screens/NewResponse';

const Stack = createNativeStackNavigator();

const StackLvl2 = ({ navigation, route }: any) => {
  const { colors, dark }: Theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
        },
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen
        name="STickets"
        component={STickets}
        options={({ route, navigation }: any) => ({
          title: route?.params?.title,
          headerStyle: { backgroundColor: colors.primary },
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{ right: 6 }}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <II
                size={30}
                name="stopwatch-outline"
                color={'#fff'}
                onPress={() => handleStopwatch(route?.params)}
              />
              <View style={{ width: 15 }} />
              <MI
                onPress={() =>
                  navigation.navigate('Stack2', {
                    screen: 'EditTicket',
                    params: route?.params,
                  })
                }
                size={30}
                name="edit"
                color={'#fff'}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Contact1"
        component={Contact1}
        options={({ route, navigation }) => ({
          title: 'Contact',
          headerStyle: { backgroundColor: colors.primary },
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{ right: 6 }}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => null,
        })}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({ route, navigation }) => ({
          title: 'Settings',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: dark ? colors.primary : '#F9F9F9',
          },
          headerTitleStyle: {
            color: dark ? '#fff' : '#000',
          },
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{ right: 6 }}
              color={dark ? '#fff' : '#5F6368'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => null,
        })}
      />
      <Stack.Screen
        name="NewResponse"
        component={NewResponseScreen}
        options={({ route, navigation }) => ({
          title: 'New Response',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: dark ? colors.primary : '#F9F9F9',
          },
          headerTitleStyle: {
            color: dark ? '#fff' : '#000',
          },
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{ right: 6 }}
              color={dark ? '#fff' : '#5F6368'}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackLvl2;
