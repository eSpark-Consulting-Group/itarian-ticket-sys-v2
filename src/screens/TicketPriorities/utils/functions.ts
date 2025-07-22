import { showMessage } from 'react-native-flash-message';

import { api } from '../../../api';
import { alert_Dur } from '../../../constants';
import { globalState } from '../../../stores/globalAppState';
import { userStore } from '../../../stores/userStore';
import { showMessageSafe } from '../../../utils/helperFunctions';

const getAllTicketPriorities = async () => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/ticketpriorities');
    if (result?.ok) {
      globalState?.ticketpriorities?.set(result?.data?.data);
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const addTicketPriorities = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/ticketpriorities', data);
    console.log('result addSlaPlans', result);
    if (result?.ok) {
      getAllTicketPriorities();
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error addSlaPlans', error);
    return { status: true, message: error };
  }
};

const deletePriorities = async (id: number) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.delete(`/ticketpriorities/${id}`);
    if (result?.ok) {
      getAllTicketPriorities();
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

const updateTicketPriorities = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(
      `/ticketpriorities/${data?.data?.id}`,
      data,
    );
    console.log('result updateSlaPlan', result);
    if (result?.ok) {
      getAllTicketPriorities();
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error updateSlaPlan', error);
    return { status: true, message: error };
  }
};

export {
  getAllTicketPriorities,
  addTicketPriorities,
  deletePriorities,
  updateTicketPriorities,
};
