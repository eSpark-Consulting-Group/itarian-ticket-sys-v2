import { showMessage } from 'react-native-flash-message';
import { api } from '../../../api';
import { alert_Dur } from '../../../constants';
import { globalState } from '../../../stores/globalAppState';
import { userStore } from '../../../stores/userStore';
import { showMessageSafe } from '../../../utils/helperFunctions';

const getAllGroups = async () => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/groups');
    if (result?.ok) {
      globalState?.groups?.set(result?.data?.data);
    }
  } catch (error) {
    console.log('error groups', error);
  }
};

const addGroup = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/groups', data);
    console.log('result addgroups', result);
    if (result?.ok) {
      getAllGroups();
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error groups', error);
    return { status: true, message: error };
  }
};

const deleteGroup = async (id: number) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.delete(`/groups/${id}`);
    if (result?.ok) {
      getAllGroups();
      showMessageSafe({
        message: 'SlaPlan deleted successfully',
        type: 'success',
        duration: alert_Dur,
      });
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error deleteSlaPlan', error);
    return { status: false };
  }
};

const updateGroup = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(`/groups/${data?.data?.id}`, data);
    console.log('result updateSlaPlan', result);
    if (result?.ok) {
      getAllGroups();
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error updateSlaPlan', error);
    return { status: true, message: error };
  }
};

export { getAllGroups, addGroup, deleteGroup, updateGroup };
