import { showMessage } from 'react-native-flash-message';

import { api } from '../../../api';
import { alert_Dur } from '../../../constants';
import { globalState } from '../../../stores/globalAppState';
import { ticketStore } from '../../../stores/ticketStore';
import { userStore } from '../../../stores/userStore';
import { showMessageSafe } from '../../../utils/helperFunctions';

const getAllUsers = async () => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  console.log(`Basic ${USER_TOKEN}`);
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/users');
    if (result?.ok) {
      const data = result?.data?.data?.map((val: any) => {
        return {
          id: val?.id,
          company_name: val?.attributes?.company,
          email: val?.attributes?.email,
          name: val?.attributes?.user_name,
          ...val?.attributes,
        };
      });
      userStore?.users?.set(data?.filter((user: any) => user.is_active != 0));
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const getAllTickets = async () => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  console.log(`Basic ${USER_TOKEN}`);
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get(`/tickets`);
    if (result?.ok) {
      const data = result?.data?.data;
      ticketStore?.AllTickets?.set(data || []);
    }
  } catch (error) {
    console.log('error getAllTickets', error);
  }
};

const getTicketsByUserId = async (userId: string) => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  console.log(`Basic ${USER_TOKEN}`);
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get(`/users/${userId}?include=tickets`);
    if (result?.ok) {
      const data = result?.data?.included;
      ticketStore?.tickets?.set(data || []);
    }
  } catch (error) {
    console.log('error getTicketsByUserId', error);
  }
};

const addTicket = async (data: any) => {
  const user: any = userStore?.user?.get();
  const activeMember: any = globalState?.agendaMember?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/tickets', data);
    console.log('result addTicket', result);
    if (result?.ok) {
      getTicketsByUserId(activeMember?.id);
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error addTicket', error);
    return { status: true, message: error };
  }
};

const deleteTicket = async (id: number) => {
  const user: any = userStore?.user?.get();
  const activeMember: any = globalState?.agendaMember?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.delete(`/tickets/${id}`);
    if (result?.ok) {
      getTicketsByUserId(activeMember?.id);
      showMessageSafe({
        message: 'Ticket deleted successfully',
        type: 'success',
        duration: alert_Dur,
      });
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error deleteTickets', error);
    return { status: false };
  }
};

const updateTicket = async (data: any) => {
  const user: any = userStore?.user?.get();
  const activeMember: any = globalState?.agendaMember?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(`/tickets/${data?.data?.id}`, data);
    console.log('result updatetickets', result);
    if (result?.ok) {
      getTicketsByUserId(activeMember?.id);
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error updatetickets', error);
    return { status: true, message: error };
  }
};

const getTicketThreads = async (ticketId: string) => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  console.log(`Basic ${USER_TOKEN}`);
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get(`/tickets/${ticketId}/ticketthreads`);
    if (result?.ok) {
      const data = result?.data?.data;
      data.sort((a: any, b: any) => {
        return (
          new Date(a.attributes.created_at).valueOf() -
          new Date(b.attributes.created_at).valueOf()
        );
      });
      ticketStore?.ticketThreads?.set(data?.reverse() || []);
    }
  } catch (error) {
    console.log('error getTicketThreads', error);
  }
};

const getTicketCollaborators = async (ticketId: string) => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  console.log(`Basic ${USER_TOKEN}`);
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get(
      `/tickets/${ticketId}/ticketcollaborators`,
    );
    if (result?.ok) {
      const data = result?.data?.data;
      ticketStore?.ticketCollaborators?.set(data || []);
    }
  } catch (error) {
    console.log('error getTicketCollaborators', error);
  }
};

const createTicketThread = async (data: any, ticketId: any) => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/ticketthreads', data);
    console.log('result addTicket', result);
    if (result?.ok) {
      getTicketThreads(ticketId);
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error createaTicketThread', error);
    return { status: true, message: error };
  }
};

const getAllTimezones = async () => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  console.log(`Basic ${USER_TOKEN}`);
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/timezones');
    if (result?.ok) {
      const data = result?.data?.data?.map((val: any) => {
        return {
          id: val?.id,
          ...val?.attributes,
        };
      });
      globalState?.timezones?.set(data);
    }
  } catch (error) {
    console.log('error getAllTimezones', error);
  }
};

const addCollaborator = async (data: any) => {
  const user: any = userStore?.user?.get();
  const activeMember: any = globalState?.agendaMember?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/ticketcollaborators', data);
    console.log('result ticketcollaborators', result);
    if (result?.ok) {
      getTicketCollaborators(data?.data?.relationships?.ticket?.data?.id);
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error: any) {
    console.log('error ticketcollaborators', error);
    return { status: false, message: error?.message };
  }
};

const deleteCollaborator = async (collaboratorId: string, ticketId: string) => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  console.log(`Basic ${USER_TOKEN}`);
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.delete(
      `/ticketcollaborators/${collaboratorId}`,
    );
    if (result?.ok) {
      getTicketCollaborators(ticketId);
      showMessageSafe({
        message: 'Collaborator deleted successfully',
        type: 'success',
        duration: alert_Dur,
      });
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error deleteCollaborator', error);
  }
};

export {
  getAllUsers,
  getTicketsByUserId,
  addTicket,
  updateTicket,
  deleteTicket,
  getAllTickets,
  getTicketThreads,
  createTicketThread,
  getTicketCollaborators,
  getAllTimezones,
  addCollaborator,
  deleteCollaborator,
};
