import { showMessage } from 'react-native-flash-message';

import { api } from '../../../api';
import { alert_Dur } from '../../../constants';
import { globalState } from '../../../stores/globalAppState';
import { userStore } from '../../../stores/userStore';

const getAllTicketStatus = async () => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/ticketstatuses');
    if (result?.ok) {
      globalState?.ticketStatus?.set(result?.data?.data);
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const getAllTicketStatusIcons = async () => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/ticketstatuses/icons');
    if (result?.ok) {
      globalState?.ticketstatusicons?.set(result?.data?.data);
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const addTicketStatus = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/ticketstatuses', data);
    console.log('result addSlaPlans', result);
    if (result?.ok) {
      getAllTicketStatus();
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error addSlaPlans', error);
    return { status: true, message: error };
  }
};

const deleteStatus = async (id: number) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.delete(`/ticketstatuses/${id}`);
    if (result?.ok) {
      getAllTicketStatus();
      showMessage({
        message: 'Ticket Status deleted successfully',
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

const updateTicketStatus = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(
      `/ticketstatuses/${data?.data.id}`,
      data,
    );
    console.log('result updateSlaPlan', result);
    if (result?.ok) {
      getAllTicketStatus();
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
  getAllTicketStatus,
  getAllTicketStatusIcons,
  addTicketStatus,
  deleteStatus,
  updateTicketStatus,
};
