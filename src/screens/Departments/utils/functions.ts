import { showMessage } from 'react-native-flash-message';
import { api } from '../../../api';
import { alert_Dur } from '../../../constants';
import { globalState } from '../../../stores/globalAppState';
import { userStore } from '../../../stores/userStore';
import { showMessageSafe } from '../../../utils/helperFunctions';

const getAlldepartments = async () => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/departments');
    if (result?.ok) {
      globalState?.departments?.set(result?.data?.data);
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const addDepartment = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/departments', data);
    console.log('result departments', result);
    if (result?.ok) {
      getAlldepartments();
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error departments', error);
    return { status: true, message: error };
  }
};

const deleteDepartment = async (id: number) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.delete(`/departments/${id}`);
    if (result?.ok) {
      getAlldepartments();
      showMessageSafe({
        message: 'Department deleted successfully',
        type: 'success',
        duration: alert_Dur,
      });
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error departments', error);
    return { status: false };
  }
};

const updateDepartment = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(`/departments/${data?.data?.id}`, data);
    console.log('result departments', result);
    if (result?.ok) {
      getAlldepartments();
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error departments', error);
    return { status: true, message: error };
  }
};

export { getAlldepartments, addDepartment, deleteDepartment, updateDepartment };
