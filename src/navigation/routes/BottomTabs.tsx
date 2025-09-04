import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FA from 'react-native-vector-icons/FontAwesome';
import II from 'react-native-vector-icons/Ionicons';

import Agenda from '../../screens/Agenda';
import Contacts from '../../screens/Contacts';
import Settings from '../../screens/Settings';
import {
  Search,
  TicketsScreen,
  TicketStatus,
  ToolsScreen,
} from '../../screens';
import Dashboard from '../../screens/Dashboard';
import { Text } from 'react-native-paper';
import { Touchable, TouchableOpacity } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { V3Header } from '../../components';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { colors, dark }: Theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0.5,
          borderTopColor: '#F2F2F2',
          backgroundColor: dark ? colors.background : '#F2F2F2',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string | undefined;
          if (route.name === 'Tools') iconName = 'pencil';
          else if (route.name === 'Users') iconName = 'person-outline';
          else if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Tickets')
            return <MCI name="ticket-outline" size={24} color={color} />;
          else if (route.name === 'Report')
            return <FA name="bar-chart" size={22} color={color} />;
          return iconName ? (
            <Ionicons name={iconName} size={24} color={color} />
          ) : null;
        },
      })}
    >
      <Tab.Screen
        name="Tools"
        component={ToolsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <V3Header
              title="Tools"
              showBack={false} // or true if you want back arrow
              rightText={{
                label: 'New Response',
                onPress: () =>
                  navigation.navigate('Stack3', {
                    screen: 'NewResponse',
                  }),
              }}
            />
          ),
        })}
      />
      {/* <Tab.Screen name="Settings" component={Settings} /> */}
      <Tab.Screen
        name="Users"
        component={Contacts}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <V3Header
              title="Users"
              showBack={false} // or true if you want back arrow
              rightText={{
                label: 'New User',
                onPress: () =>
                  navigation.navigate('Stack3', {
                    screen: 'NewResponse',
                  }),
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <V3Header
              title="Dashboard"
              rightIcons={[
                {
                  name: 'notifications-outline',
                  onPress: () => console.log('Notif tapped'),
                },
                {
                  name: 'settings-outline',
                  onPress: () =>
                    navigation.navigate('Stack3', { screen: 'Settings' }),
                },
              ]}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Tickets"
        component={TicketsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <V3Header
              title="Tickets"
              showBack={false} // or true if you want back arrow
              rightText={{
                label: 'New Ticket',
                onPress: () =>
                  navigation.navigate('Stack3', {
                    screen: 'NewResponse',
                  }),
              }}
            />
          ),
        })}
      />

      <Tab.Screen name="Report" component={TicketStatus} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
