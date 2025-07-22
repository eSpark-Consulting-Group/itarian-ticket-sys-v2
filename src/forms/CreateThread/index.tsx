import { useHookstate } from '@hookstate/core';
import {
  Theme,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
import {
  CstmButton,
  Loader,
  SingleLineField,
} from '../../components';
import { alert_Dur } from '../../constants';
import { createTicketThread } from '../../screens/Agenda/utils/functions';
import { userStore } from '../../stores/userStore';
import { showMessageSafe } from '../../utils/helperFunctions';

export const CreateThread = () => {
  const { colors }: Theme = useTheme();
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  const user: any = useHookstate(userStore.userDetails).get();

  const onCreate = async () => {
    setLoading(true);
    try {
      const result = await createTicketThread(
        {
          data: {
            type: 'ticketthreads',
            attributes: {
              subject: title,
              detail: body,
              is_internal: isInternal,
            },
            relationships: {
              user: {
                data: {
                  type: 'users',
                  id: user?.id,
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
        },
        route?.params?.ticketDetails?.id,
      );
      console.log('result result result', result);
      if (result?.status) {
        showMessageSafe({
          message: 'Thread added Successfully',
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
          // paddingHorizontal: 8,
        }}>
        <SingleLineField
          title="is Internal"
          showRightSwitch
          rightSwitchVal={isInternal}
          onChangeSwitch={setIsInternal}
        />
        <SingleLineField
          enable={false}
          subTitle="Title *"
          title={title}
          inputable
          onChangeText={setTitle}
        />
        <SingleLineField
          enable={false}
          mode="texteditor"
          subTitle="Details *"
          title={body}
          inputable
          onChangeText={setBody}
        />
      </ScrollView>
      <View>
        <CstmButton
          loader={false}
          title="Create Thread"
          onPress={() => {
            onCreate();
          }}
        />
      </View>
    </>
  );
};
