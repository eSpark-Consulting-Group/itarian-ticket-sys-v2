import { useHookstate } from '@hookstate/core';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
import { CstmButton, Loader, SingleLineField } from '../../components';
import { alert_Dur } from '../../constants';
import { addCollaborator } from '../../screens/Agenda/utils/functions';
import { addUser } from '../../screens/Contacts/utils/functions';
import { userStore } from '../../stores/userStore';
import { create_UUID, showMessageSafe } from '../../utils/helperFunctions';

export const CreateUser = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onCreate = async () => {
    if (!Boolean(name) || !Boolean(email)) {
      showMessageSafe({
        message: 'Please fill required fields',
        type: 'warning',
        icon: 'auto',
        duration: alert_Dur,
      });
      return;
    }
    setLoading(true);
    try {
      const result = await addUser({
        data: {
          type: 'users',
          attributes: {
            provider_id: create_UUID(),
            email: email,
            user_name: email,
            first_name: name,
            last_name: '\u200A',
            role: 'user',
            is_active: true,
            password: '\u200A',
          },
        },
      });
      const response = await addCollaborator({
        data: {
          type: 'ticketcollaborators',
          relationships: {
            user: {
              data: {
                type: 'users',
                id: result?.data?.data?.id,
              },
            },
            ticket: {
              data: {
                type: 'tickets',
                id: route?.params?.ticketDetails?.id,
              },
            },
          },
        },
      });
      if (response?.status) {
        showMessageSafe({
          message: 'Collaborator added Successfully',
          type: 'success',
          icon: 'auto',
          duration: alert_Dur,
        });
        navigation.goBack();
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
    setLoading(false);
  };

  return (
    <>
      <Loader isShow={loading} />
      <ScrollView
        style={{
          flex: 1,
        }}>
        <SingleLineField
          title={name}
          inputable
          subTitle="Name*"
          onChangeText={setName}
          enable={false}
        />
        <SingleLineField
          enable={false}
          subTitle="Email*"
          title={email}
          inputable
          onChangeText={setEmail}
        />
      </ScrollView>
      <View>
        <CstmButton
          loader={false}
          title="Create User"
          onPress={() => {
            onCreate();
          }}
        />
      </View>
    </>
  );
};
