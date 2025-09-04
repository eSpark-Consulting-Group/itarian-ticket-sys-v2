import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  useTheme,
  DrawerActions,
  useNavigation,
  useRoute,
  Theme,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import AD from 'react-native-vector-icons/AntDesign';
import OI from 'react-native-vector-icons/Octicons';
import EI from 'react-native-vector-icons/Entypo';
import { State, useHookstate } from '@hookstate/core';
import { moderateVerticalScale } from 'react-native-size-matters';
import { Avatar } from 'react-native-paper';

// @ts-ignore
import store from 'react-native-simple-store';

import { globalState } from '../../stores/globalAppState';
import {
  Agenda,
  Companies,
  Contacts,
  Search,
  Settings,
  SendFeedback,
  Profile,
  Teams,
  TicketPriorities,
  SlaPlans,
  Departments,
  Locations,
  HelpTopics,
  CannedResponse,
  Groups,
  TicketStatus,
} from '../../screens';
import { ParamList } from '../../types';
import { BUILD_VERSION } from '../../constants';
import Images from '../../assets/Images';
import { userStore } from '../../stores/userStore';
import { badgeApiCallForGlobalList } from '../../utils/apiCalls';
import { ticketStore } from '../../stores/ticketStore';
import { filterUser } from '../../screens/Profile/utils';
import { getAllUsers } from '../../screens/Agenda/utils/functions';
import { Loader } from '../../components';
import MyText from '../../components/MyText/MyText';

const Drawer = createDrawerNavigator<ParamList>();

const DrawerContent = (props: DrawerContentComponentProps) => {
  const currStatus: State<boolean> = useHookstate(userStore.currentStatus);
  const user: State<any> = useHookstate(userStore.user);
  const userDetails: any = useHookstate(userStore.userDetails)?.get();
  const dScreen: State<string> = useHookstate(globalState.defaultScreenId);
  const dSName: State<string> = useHookstate(globalState.defaultScreenName);
  const dNavName: State<string> = useHookstate(
    globalState.defaultnNavigationName,
  );
  const tickets: State<any> = useHookstate(ticketStore.tickets);
  const activeMember: State<any> = useHookstate(globalState.agendaMember);

  const { colors }: Theme = useTheme();
  const { index } = props.state;

  // Calculate top inset for Android notch
  const topInset =
    Platform.OS === 'android'
      ? initialWindowMetrics?.insets.top
      : 0;

  console.log('userDetails', userDetails);
  console.log('user', user.get());
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colors.primary,
        paddingTop: topInset ? topInset / 2 : 0,
      }}>
      <TouchableOpacity
        style={styles.header}
        onPress={() =>
          props.navigation.navigate({
            name: 'Profile',
            params: { prevScreen: 'Agenda' },
          })
        }>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Avatar.Image
              size={moderateVerticalScale(65, 0.5)}
              source={
                userDetails?.attributes?.profile_picture
                  ? {
                      uri: `data:image/jpeg;base64,${userDetails?.attributes?.profile_picture}`,
                    }
                  : Images.Avatar
              }
            />
          </View>
        </View>
        <View style={{ flex: 0.7 }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <MyText style={styles.drawerTitleStyle}>
              {userDetails?.attributes?.first_name +
                ' ' +
                userDetails?.attributes?.last_name ?? 'N/A'}
            </MyText>
            <MyText style={styles.drawerTitleStyle}>
              {user?.get()?.user_name}
            </MyText>
            <MyText style={{ ...styles.drawerTitleStyle, opacity: 0.7 }}>
              {userDetails?.attributes?.role?.charAt(0).toUpperCase() +
                userDetails?.attributes?.role?.slice(1)}
            </MyText>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.content}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <DrawerItemList {...props} />
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View>
          <DrawerItem
            focused={index == 7 ? true : false}
            activeBackgroundColor={'#ffffff1a'}
            activeTintColor={'#fff'}
            label={'Settings'}
            inactiveTintColor={'#fff'}
  
            icon={({ color, size, focused }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            )}
            labelStyle={styles.footerDrawerStyle}
            onPress={() => {
              props.navigation.navigate('Settings');
            }}
          />
          <DrawerItem
            focused={index == 8 ? true : false}
            activeBackgroundColor={'#ffffff1a'}
            activeTintColor={'#fff'}
            label={'Feedback'}
            inactiveTintColor={'#fff'}
            labelStyle={styles.footerDrawerStyle}
            icon={({ color, size, focused }) => (
              <MCI name="message-text" size={size} color={color} />
            )}
            onPress={() => {
              props.navigation.navigate('Feedback');
            }}
          />
          <DrawerItem
            label={'Logout'}
            inactiveTintColor={'#fff'}
            labelStyle={styles.footerDrawerStyle}
            icon={({ color, size, focused }) => (
              <MCI name="logout" size={size} color={color} />
            )}
            onPress={() => {
              user.set(false);
              dSName.set('Tickets');
              dScreen.set('Agenda');
              dNavName.set('');
              tickets?.set([]);
              activeMember?.set(null);
              store.delete(['user', 'dSName', 'dNavName', 'pinCode']);
              // props.navigation.navigate('Login');
            }}
          />
        </View>
        <MyText
          style={{
            fontSize: 12,
            fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : 'OpenSans-Medium',
            color: '#ffffff',
          }}>
          Build version ({BUILD_VERSION})
        </MyText>
      </View>
    </SafeAreaView>
  );
};

const Draw = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const activeMember: State<any> = useHookstate(globalState.agendaMember);
  const dScreen: State<any> = useHookstate(globalState.defaultScreenId);
  const shortCutScreen: State<any> = useHookstate(globalState.shortCutScreen);
  const userDetails: any = useHookstate(userStore.userDetails)?.get();
  const users: State<any> = useHookstate(userStore.users);
  const user: State<any> = useHookstate(userStore.user);
  const [currMember, setcurrMember] = useState<any>(null);
  const [calCurrMember, setCalCurrMember] = useState<any>(null);
  const [filterCount, setFilterCount] = useState<any>('0');
  const [isFetching, setIsFetching] = useState(false);
  const { colors }: Theme = useTheme();

  const noHeader = (): null => null;

  useEffect(() => {
    var filterVariables = route?.params?.params?.filter?.filter((val: any) => {
      if (val?.key && val?.value != null)
        return { key: val.key, value: val?.value };
    });
    setFilterCount(filterVariables?.length || '0');
    if (route?.params?.item) {
      if (route?.params?.from == 'Agenda') {
        setcurrMember(route?.params?.selected);
      } else {
        setcurrMember(currMember);
        setCalCurrMember(calCurrMember);
      }
    }
  }, [route?.params]);

  useEffect(() => {
    if (route?.params?.selected) {
      setcurrMember(route?.params?.selected);
      setCalCurrMember(route?.params?.selected);
    } else {
      filterUser(`filter[email][]=${user?.get()?.email}`).then((res: any) => {
        setcurrMember(currMember ?? res?.attributes);
        !currMember && activeMember?.set(res?.attributes);
      });
      setCalCurrMember(calCurrMember);
    }
   fetchBadgeApiCallForGlobalList()
  }, []);

  const fetchBadgeApiCallForGlobalList = async () => {
    setIsFetching(true);
    await badgeApiCallForGlobalList();
    setIsFetching(false);
  }

  return (
    <>
      <Drawer.Navigator
        initialRouteName={shortCutScreen?.get() || dScreen.get()}
        // useLegacyImplementation={true}
        backBehavior="history"
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          drawerType: 'slide',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.primary,
            borderBottomWidth: 1,
            elevation: 1,
          },
          headerTitleStyle: {
            color: '#ffffff',
          },
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
          drawerItemStyle: {
            opacity: 0.8,
          },
          headerLeft: () => (
            <Ionicons
              size={30}
              name="menu"
              color={'#fff'}
              onPress={() => {
                console.log('Menu Pressed');
                navigation.dispatch(DrawerActions.openDrawer());
              }}
              style={{ left: 10 }}
            />
          ),
        })}
      >
        <Drawer.Screen
          name="Search"
          component={Search}
          options={{
            drawerLabel: ({ color, focused }) => (
              <MyText style={{ color }}>Search</MyText>
            ),
            drawerIcon: ({ color, size, focused }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Agenda"
          component={Agenda}
          options={{
            headerTitle: () => (
              <CstmHeader
                title="Tickets"
                subTitle={!currMember ? 'Select Member' : currMember?.name}
              />
            ),
            drawerLabel: ({ color, focused }) => (
              <MyText style={{ color }}>Tickets</MyText>
            ),
            drawerIcon: ({ color, size, focused }) => (
              <MCI name="calendar" size={size} color={color} />
            ),
            headerRight: () => (
              <FA
                size={30}
                name="user"
                color={'#fff'}
                onPress={async () => {
                  console.log("awda");
                  
                  try {
                    setIsFetching(true);
                    await getAllUsers();
                    setIsFetching(false);
                    navigation.navigate('Stack2', {
                      screen: 'CstmItemSelector',
                      params: {
                        from: 'Agenda',
                        item: 'GoneTo',
                        data:
                          users
                            .get()
                            ?.filter((val: any) => val?.role != 'user') || [],
                        selected: currMember,
                        stack: 'Draw',
                        headerTitle: 'Select Member',
                        searchable: true,
                      },
                    });
                  } catch (error) {
                    setIsFetching(false);
                  }
                }}
                style={{ right: 10 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Companies"
          component={Companies}
          options={{
            headerRight: noHeader,
            headerTitle: () => <CstmHeader title="Organizations" />,
            drawerLabel: ({ color, focused }) => (
              <MyText style={{ color }}>Organizations</MyText>
            ),
            drawerIcon: ({ color, size, focused }) => (
              <MCI
                name="office-building-marker-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Contacts"
          component={Contacts}
          options={{
            headerTitle: () => <CstmHeader title="Users" />,
            drawerLabel: ({ color, focused }) => (
              <MyText style={{ color }}>Users & Staffs</MyText>
            ),
            drawerIcon: ({ color, size, focused }) => (
              <AD name="contacts" size={size} color={color} />
            ),
            headerRight: noHeader,
          }}
        />
        <Drawer.Screen
          name="Teams"
          component={Teams}
          options={{
            headerTitle: () => <CstmHeader title="Teams" />,
            drawerLabel: ({ color, focused }) => (
              <MyText style={{ color }}>Teams</MyText>
            ),
            drawerIcon: ({ color, size, focused }) => (
              <FA name="group" size={size} color={color} />
            ),
            headerRight: noHeader,
          }}
        />
        <Drawer.Screen
          name="SlaPlan"
          component={SlaPlans}
          options={{
            headerTitle: () => <CstmHeader title="Sla Plan" />,
            drawerLabel: ({ color, focused }) => (
              <MyText style={{ color }}>Sla Plan</MyText>
            ),
            drawerIcon: ({ color, size, focused }) => (
              <MCI name="clock" size={size} color={color} />
            ),
            headerRight: noHeader,
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          initialParams={{ status: false }}
          options={{
            headerRight: noHeader,
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            headerRight: noHeader,
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="Feedback"
          component={SendFeedback}
          initialParams={{ userData: userDetails }}
          options={{
            headerRight: noHeader,
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="TicketPriorities"
          component={TicketPriorities}
          options={{
            headerTitle: () => <CstmHeader title="Ticket Priorities" />,
            drawerLabel: ({ color, focused }) => (
              <MyText style={{ color }}>Ticket Priorities</MyText>
            ),
            drawerIcon: ({ color, size, focused }) => (
              <OI name="north-star" size={size} color={color} />
            ),
            headerRight: noHeader,
          }}
        />
        <Drawer.Screen
          name="TicketStatus"
          component={TicketStatus}
          options={{
            headerTitle: () => <CstmHeader title="Ticket Status" />,
            drawerLabel: ({ color, focused }) => (
              <MyText style={{ color }}>Ticket Status</MyText>
            ),
            drawerIcon: ({ color, size, focused }) => (
              <EI name="squared-plus" size={size} color={color} />
            ),
            headerRight: noHeader,
          }}
        />
        <Drawer.Screen
          name="Departments"
          component={Departments}
          options={{
            headerTitle: () => <CstmHeader title="Departments" />,
            drawerLabel: ({ color, focused }) => (
              <MyText style={{ color }}>Departments</MyText>
            ),
            drawerIcon: ({ color, size, focused }) => (
              <MCI name="home-group" size={size} color={color} />
            ),
            headerRight: noHeader,
          }}
        />
        <Drawer.Screen
          name="Locations"
          component={Locations}
          options={{
            headerTitle: () => <CstmHeader title="Locations" />,
            drawerLabel: ({ color, focused }) => (
              <MyText style={{ color }}>Locations</MyText>
            ),
            drawerIcon: ({ color, size, focused }) => (
              <EI name="location" size={size} color={color} />
            ),
            headerRight: noHeader,
          }}
        />
        <Drawer.Screen
          name="HelpTopics"
          component={HelpTopics}
          options={{
            headerTitle: () => <CstmHeader title="Help Topics" />,
            drawerLabel: ({ color, focused }) => (
              <MyText style={{ color }}>Help Topics</MyText>
            ),
            drawerIcon: ({ color, size, focused }) => (
              <Ionicons name="newspaper-outline" size={size} color={color} />
            ),
            headerRight: noHeader,
          }}
        />
        <Drawer.Screen
          name="CannedResponse"
          component={CannedResponse}
          options={{
            headerTitle: () => <CstmHeader title="Canned Response" />,
            drawerLabel: ({ color, focused }) => (
              <MyText style={{ color }}>Canned Response</MyText>
            ),
            drawerIcon: ({ color, size, focused }) => (
              <FA name="certificate" size={size} color={color} />
            ),
            headerRight: noHeader,
          }}
        />
        <Drawer.Screen
          name="Groups"
          component={Groups}
          options={{
            headerTitle: () => <CstmHeader title="Groups" />,
            drawerLabel: ({ color, focused }) => (
              <MyText style={{ color }}>Groups</MyText>
            ),
            drawerIcon: ({ color, size, focused }) => (
              <MCI name="group" size={size} color={color} />
            ),
            headerRight: noHeader,
          }}
        />
      </Drawer.Navigator>
      {isFetching && <Loader isShow={isFetching} />}
    </>
  );
};

const CstmHeader = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) => {
  return (
    <View>
      <MyText
        style={{
          color: '#fff',
          fontSize: 20,
          fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : 'OpenSans-Medium',
          textAlign: 'center',
        }}>
        {title}
      </MyText>
      {subTitle && (
        <MyText style={{ textAlign: 'center', color: '#fff', fontSize: 14 }}>
          {subTitle}
        </MyText>
      )}
    </View>
  );
};

export default Draw;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#fff',
    paddingVertical: 5,
  },
  avatar: {
    height: moderateVerticalScale(65, 0.5),
    width: moderateVerticalScale(65, 0.5),
    borderRadius: 100,
  },
  avatarContainer: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#fff',
    justifyContent: 'flex-end',
  },
  footerDrawerStyle: {
    opacity: 0.75,
    // right: 20,
  },
  drawerTitleStyle: {
    fontWeight: '700',
    color: '#fff',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
