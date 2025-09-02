import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FA from 'react-native-vector-icons/FontAwesome';
import II from 'react-native-vector-icons/Ionicons';

import Agenda from '../../screens/Agenda';
import Contacts from '../../screens/Contacts';
import Settings from '../../screens/Settings';
import { TicketStatus, ToolsScreen } from '../../screens';
import Dashboard from '../../screens/Dashboard';
import { Text } from 'react-native-paper';
import { Touchable, TouchableOpacity } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { colors, dark }: Theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0.5,
          borderTopColor: '#F2F2F2',
          backgroundColor: '#F2F2F2',
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
        options={({ route, navigation }) => ({
          headerShown: true,

          title: 'Tools',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: dark ? colors.card : '#F9F9F9',
          },
          headerTitleStyle: {
            color: dark ? '#fff' : '#000',
            fontFamily: 'Helvetica Neue',
          },

          headerRight: () => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingRight: '2%',
                }}
                onPress={() =>
                  navigation.navigate('Stack3', {
                    screen: 'NewResponse',
                  })
                }
              >
                <II size={24} name="add" color={dark ? '#fff' : '#1185E6'} />
                <Text
                  style={{ color: dark ? '#fff' : '#1185E6', fontSize: 16 }}
                >
                  New Response
                </Text>
              </TouchableOpacity>
            );
          },
        })}
      />
      {/* <Tab.Screen name="Settings" component={Settings} /> */}
      <Tab.Screen name="Users" component={Contacts} />
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Tickets" component={Agenda} />
      <Tab.Screen name="Report" component={TicketStatus} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
