import { showMessage } from 'react-native-flash-message';

import { api } from '../../../api';
import { alert_Dur } from '../../../constants';
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

const addUser = async (data: any) => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/users', data);
    console.log('result addUser', result);
    if (result?.ok) {
      getAllUsers();
      return { status: true, data: result?.data };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error addUser', error);
    return { status: true, message: error };
  }
};

const deleteUser = async (id: number) => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.delete(`/users/${id}`);
    if (result?.ok) {
      getAllUsers();
      showMessageSafe({
        message: 'User deleted successfully',
        type: 'success',
        duration: alert_Dur,
      });
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error deleteUser', error);
    return { status: false };
  }
};

const updateUser = async (data: any) => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(`/users/${data?.data?.id}`, data);
    console.log('result updateUser', result, data?.data?.id);
    if (result?.ok) {
      getAllUsers();
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error updateUser', error);
    return { status: true, message: error };
  }
};

export { getAllUsers, addUser, deleteUser, updateUser };
