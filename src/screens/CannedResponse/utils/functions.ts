import {showMessage} from 'react-native-flash-message';
import {api} from '../../../api';
import {alert_Dur} from '../../../constants';
import { globalState } from '../../../stores/globalAppState';
import {userStore} from '../../../stores/userStore';
import { showMessageSafe } from '../../../utils/helperFunctions';

const getAllCannedResponse = async () => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/cannedresponses');
    if (result?.ok) {
      globalState?.cannedResponse?.set(result?.data?.data);
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const addCannedResponse = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/cannedresponses', data);
    console.log('result addSlaPlans', result);
    if (result?.ok) {
      getAllCannedResponse();
      return {status: true};
    }else {
      return {status: false, message: result};
    }
  } catch (error) {
    console.log('error addSlaPlans', error);
    return {status: true, message: error};
  }
};

const deleteCannedResponse = async (id: number) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.delete(`/cannedresponses/${id}`);
    if (result?.ok) {
      getAllCannedResponse();
      showMessageSafe({
        message: 'SlaPlan deleted successfully',
        type: 'success',
        duration: alert_Dur,
      });
      return {status: true};
    }else {
      return {status: false, message: result};
    }
  } catch (error) {
    console.log('error deleteSlaPlan', error);
    return {status: false};
  }
};

const updateCannedResponse = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(`/cannedresponses/${data?.data?.id}`, data);
    console.log('result updateSlaPlan', result);
    if (result?.ok) {
      getAllCannedResponse();
      return {status: true};
    }else {
      return {status: false, message: result};
    }
  } catch (error) {
    console.log('error updateSlaPlan', error);
    return {status: true, message: error};
  }
};

export {getAllCannedResponse, addCannedResponse, deleteCannedResponse, updateCannedResponse};
