import { showMessage } from 'react-native-flash-message';
import { api } from '../../../api';
import { alert_Dur } from '../../../constants';
import { userStore } from '../../../stores/userStore';
import { showMessageSafe } from '../../../utils/helperFunctions';

const filterUser = async (params: string = '') => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get(`/users?${params}`);
    if (result?.ok) {
      return {
        ...result?.data?.data[0],
        attributes: {
          id: result?.data?.data[0]?.id,
          company_name: result?.data?.data[0]?.attributes?.company,
          email: result?.data?.data[0]?.attributes?.email,
          name: result?.data?.data[0]?.attributes?.user_name,
          ...result?.data?.data[0]?.attributes,
        },
      };
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const updateUser = async (id: number, data: any) => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(`/users/${id}`, data);
    if (result?.ok) {
      showMessageSafe({
        message: 'profile updated successfully',
        type: 'success',
        duration: alert_Dur,
      });
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const getUserById = async (userId: string) => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get(`/users/${userId?.toString()}`);
    if (result?.ok) {
      return result?.data?.data;
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};
export { filterUser, updateUser, getUserById };
