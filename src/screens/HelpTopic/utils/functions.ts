import { showMessage } from 'react-native-flash-message';

import { api } from '../../../api';
import { alert_Dur } from '../../../constants';
import { globalState } from '../../../stores/globalAppState';
import { userStore } from '../../../stores/userStore';
import { showMessageSafe } from '../../../utils/helperFunctions';

const getAllHelpTopics = async () => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/helptopics');
    if (result?.ok) {
      globalState?.helpTopics?.set(result?.data?.data);
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const addHelpTopic = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/helptopics', data);
    if (result?.ok) {
      getAllHelpTopics();
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error addHelpTopic', error);
    return { status: false, message: error };
  }
};

const deleteHelpTopic = async (id: number) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.delete(`/helptopics/${id}`);
    if (result?.ok) {
      getAllHelpTopics();
      showMessageSafe({
        message: 'HelpTopic deleted successfully',
        type: 'success',
        duration: alert_Dur,
      });
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error deleteHelpTopic', error);
    return { status: false };
  }
};

const updateHelpTopic = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(`/helptopics/${data?.data?.id}`, data);
    console.log('result helptopics', result);
    if (result?.ok) {
      getAllHelpTopics();
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error helptopics', error);
    return { status: true, message: error };
  }
};

export { getAllHelpTopics, addHelpTopic, deleteHelpTopic, updateHelpTopic };
