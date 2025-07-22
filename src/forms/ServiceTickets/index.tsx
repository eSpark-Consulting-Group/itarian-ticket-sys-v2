import React, { useEffect, useState } from 'react';
import { Platform, UIManager, Alert } from 'react-native';
import { State, useHookstate } from '@hookstate/core';
import { TabView, SceneMap } from 'react-native-tab-view';

import { ModalView, FloatButton, Loader, CstmTabBar } from '../../components';
import {
  CollaboratorAdditionalButtons,
  STicketsAdditionalButtons,
} from '../../constants/ButtonsList';
import { contactNameList } from '../../constants/SelectionList';
import { AdditionalButtons } from '../../types';
import { companyStore } from '../../stores/companyStore';
import Overview from './Overview';
import {
  addCollaborator,
  deleteTicket,
} from '../../screens/Agenda/utils/functions';
import { globalState } from '../../stores/globalAppState';
import Threads from './Threads';
import Collaborators from './Collaborators';
import { SelectItems, showMessageSafe } from '../../utils/helperFunctions';
import { userStore } from '../../stores/userStore';
import { alert_Dur } from '../../constants';
import { showMessage } from 'react-native-flash-message';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ServiceTickets = ({ navigation, route }: any) => {
  const [index, setIndex] = React.useState(0);

  const companies: any = useHookstate(companyStore.companies)?.get();
  const [actionButtons, setActionButtons] = useState<AdditionalButtons[]>(
    STicketsAdditionalButtons,
  );
  const [companyContact, setCompanyContact] = useState<any>({
    contact: contactNameList[0],
    company: companies[0],
  });
  const users: State<any> = useHookstate(userStore.users);
  const [loader, setLoader] = useState(false);
  const [CollaboratorActionButtons, setCollaboratorActionButtons] = useState<
    AdditionalButtons[]
  >(CollaboratorAdditionalButtons);

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[0].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewTicket',
      });
    };
    setActionButtons(tempArr);

    const arr = [...CollaboratorAdditionalButtons];
    arr[0].onPress = () =>
      SelectItems(
        {
          from: 'STickets',
          index: 0,
          list: users?.get()?.filter((value: any) => value?.role == 'user'),
          selectedItem: undefined,
          stack: 'Stack1',
          title: route?.params?.title,
          headerTitle: 'Select Collaborator',
          searchable: true,
        },
        0,
        navigation,
        route,
        'STickets',
        'Stack1',
      );
    arr[1].onPress = () => {
      navigation.navigate('Stack2', {
        screen: 'CreateUser',
        params: {
          ticketDetails: route?.params?.ticket_info?.data,
        },
      });
    };

    setCollaboratorActionButtons(arr);
  };

  useEffect(() => {
    if (route?.params?.companyContact) {
      setCompanyContact({ ...route.params?.companyContact });
    }
  }, [route?.params]);

  useEffect(() => {
    updatePress();
    navigation.setParams({
      ...route?.params,
      companyContact: companyContact,
    });
  }, []);

  const deleteTicketFunc = (id: number) => {
    setLoader(true);
    deleteTicket(id)
      .then(res => {
        setLoader(false);
        if (res?.status) {
          navigation?.goBack();
        }
      })
      .catch(err => {
        console.log('delete Tickets failed', err);
        setLoader(false);
      });
  };

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (
      route?.params?.item?.toString() &&
      route?.params?.item != 'GoneTo' &&
      route?.params?.headerTitle == "Select Collaborator"
    ) {
      const obj = {
        data: {
          type: 'ticketcollaborators',
          relationships: {
            user: {
              data: {
                type: 'users',
                id: route?.params?.selected?.id,
              },
            },
            ticket: {
              data: {
                type: 'tickets',
                id: route?.params?.ticket_info?.data?.id,
              },
            },
          },
        },
      };
      addCollaboratorFunc(obj);
    }
  }, [route?.params?.selected]);

  const addCollaboratorFunc = async (obj: any) => {
    try {
      const result = await addCollaborator(obj);
      if (result?.status) {
        showMessageSafe({
          message: 'Collaborator added Successfully',
          type: 'success',
          icon: 'auto',
          duration: alert_Dur,
        });
      } else {
        showMessageSafe({
          message:
            result?.message?.data?.errors[0]?.detail ?? 'Something went wrong',
          type: 'danger',
          icon: 'auto',
          duration: 2000,
        });
      }
    } catch (error) {}
  };

  return (
    <ModalView>
      <Loader isShow={loader} />
      <TabComp onChangeCurrentIndex={setIndex} />
      {index == 0 ? (
        <FloatButton
          icon="delete"
          onPress={() => {
            Alert.alert(
              'Delete Ticket?',
              'Are you sure you want to delete this Ticket permanently',
              [
                {
                  text: 'Yes',
                  style: 'default',
                  onPress: () =>
                    deleteTicketFunc(route?.params?.ticket_info?.data?.id),
                },
                {
                  text: 'No',
                  style: 'cancel',
                  onPress: () => console.log('Pressed Cancel on Delete'),
                },
              ],
            );
          }}
        />
      ) : (
        <>
          {index == 1 ? (
            <FloatButton
              onPress={() => {
                navigation.navigate('Stack2', {
                  screen: 'CreateThread',
                  params: {
                    ticketDetails: route?.params?.ticket_info?.data,
                  },
                });
              }}
            />
          ) : (
            <FloatButton AdditionalButtons={CollaboratorActionButtons} />
          )}
        </>
      )}
    </ModalView>
  );
};

const renderScene = SceneMap({
  first: Overview,
  second: Threads,
  third: Collaborators,
});

function TabComp({ onChangeCurrentIndex = (e: number) => {} }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Overview' },
    { key: 'second', title: 'Threads' },
    { key: 'third', title: 'Collaborators' },
  ]);

  useEffect(() => {
    console.log('Current index index', index);
    onChangeCurrentIndex(index);
  }, [index]);
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={props => <CstmTabBar {...props} />}
    />
  );
}

export default ServiceTickets;
