import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

import { api } from '../../../api';
import { alert_Dur } from '../../../constants';
import { globalState } from '../../../stores/globalAppState';
import { userStore } from '../../../stores/userStore';
import { showMessageSafe } from '../../../utils/helperFunctions';

const getAllLocations = async () => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/locations');
    if (result?.ok) {
      globalState?.locations?.set(result?.data?.data);
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const addLocation = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/locations', data);
    console.log('result Add Location', result);
    if (result?.ok) {
      getAllLocations();
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error addLocation', error);
    return { status: true, message: error };
  }
};

const deleteLocation = async (id: number) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.delete(`/locations/${id}`);
    if (result?.ok) {
      getAllLocations();
      showMessageSafe({
        message: 'Location deleted successfully',
        type: 'success',
        duration: alert_Dur,
      });
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error DeleteLocation', error);
    return { status: false };
  }
};

const updateLocation = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(`/locations/${data?.data?.id}`, data);
    console.log('result Location', result);
    if (result?.ok) {
      getAllLocations();
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error Location', error);
    return { status: true, message: error };
  }
};

const getLocationToken = async () => {
  axios
    .get('https://www.universal-tutorial.com/api/getaccesstoken', {
      headers: {
        Accept: 'application/json',
        'api-token':
          '7joYe2EsCfUGhrET1RddSgZnEacohgGPg_wT-x_Ll_YZy7byZqXL9g0cuRXhMVBV_ho',
        'user-email': 'mraza@esparkconsultants.com',
      },
    })
    .then(response => {
      console.log('response.data?.auth_token', response.data?.auth_token);

      if (response.data?.auth_token) {
        globalState?.locationToken.set(response.data?.auth_token);
      }
    })
    .catch(err => console.log(err));
};

const getCountries = async () => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/countries');
    if (result?.ok) {
      const countriesArray: any = Object.entries(result?.data?.data).map(([id, name], index) => ({
        id: index + 1,
        name
      }));
      globalState?.countries.set(countriesArray);
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const getStates = async (country: string) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get(`/countries/${country}/states`);
    if (result?.ok) {
      const statesArray: any = Object.entries(result?.data?.data).map(([id, name], index) => ({
        id: index + 1,
        name
      }));
      console.log("Endpoint", `/countries/${country}/states`, "statesArray", statesArray);
      globalState?.states.set(statesArray);
      return statesArray
    }
  } catch (error) {
    console.log('error getAllStates', error);
  }
};

export {
  getAllLocations,
  addLocation,
  deleteLocation,
  updateLocation,
  getLocationToken,
  getCountries,
  getStates,
};
