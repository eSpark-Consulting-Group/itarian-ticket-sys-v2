import { State } from '@hookstate/core';

import { api } from '../api';
import {
  getAllTimezones,
  getAllUsers,
} from '../screens/Agenda/utils/functions';
import { getAllCompanies } from '../screens/Companies/utils/functions';
import { getAlldepartments } from '../screens/Departments/utils/functions';
import { getAllGroups } from '../screens/Groups/utils/functions';
import { getAllHelpTopics } from '../screens/HelpTopic/utils/functions';
import {
  getAllLocations,
  getCountries,
  getLocationToken,
} from '../screens/Locations/utils/functions';
import { getUserById } from '../screens/Profile/utils';
import { getAllSlaPlans } from '../screens/SlaPlans/utils/functions';
import { getAllTeams } from '../screens/Teams/utils/functions';
import { globalState } from '../stores/globalAppState';
import { userStore } from '../stores/userStore';

export const badgeApiCallForGlobalList = async () => {
  globalState.loader.set(true);
  const user: State<any> = userStore?.user;
  await getAllUsers();
  await getAllCompanies();
  await getTicketStatus();
  await getTicketPriorities();
  await getAllSlaPlans();
  await getAllHelpTopics();
  await getAllGroups();
  await getAllLocations();
  await getAlldepartments();
  await getAllTeams();
  await getAllTimezones();
  await getLocationToken();
  await getCurrentUser()
  setTimeout(async () => {
    await getCountries();
  }, 2000);
  globalState.loader.set(false);
};

export const getCurrentUser = async () => {
  const user: State<any> = userStore?.user;
  const userData = await getUserById(user?.get()?.id);
  userStore?.userDetails?.set(userData)
}

const getTicketStatus = async () => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  console.log(`Basic ${USER_TOKEN}`);
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/ticketstatuses');
    if (result?.ok) {
      const data = result?.data?.data?.map((val: any) => {
        return {
          id: val?.id,
          ...val?.attributes,
        };
      });
      globalState?.ticketStatus?.set(data);
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const getTicketPriorities = async () => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  console.log(`Basic ${USER_TOKEN}`);
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/ticketpriorities');
    if (result?.ok) {
      const data = result?.data?.data?.map((val: any) => {
        return {
          id: val?.id,
          ...val?.attributes,
        };
      });
      globalState?.ticketPriorities?.set(data);
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};
