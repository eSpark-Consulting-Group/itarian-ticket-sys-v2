import { showMessage } from 'react-native-flash-message';
import { api } from '../../../api';
import { alert_Dur } from '../../../constants';
import { companyStore } from '../../../stores/companyStore';
import { userStore } from '../../../stores/userStore';
import { showMessageSafe } from '../../../utils/helperFunctions';

let companiesCache: any;

export const getAllCompanies = async (cacheEnabled: boolean = true) => {
  if (companiesCache && cacheEnabled) {
    companyStore?.companies?.set(companiesCache);
    return;
  }
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/organizations');
    if (result?.ok) {
      const data = result?.data?.data?.map((val: any) => {
        return {
          ...val?.attributes,
          id: val?.id,
        };
      });
      companiesCache = data;
      companyStore?.companies?.set(companiesCache);
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

export const addOrganization = async (data: any) => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/organizations', data);
    console.log('result addOrganization', result);
    if (result?.ok) {
      getAllCompanies(false);
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error addOrganization', error);
    return { status: true, message: error };
  }
};

export const updateOrganization = async (data: any) => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(
      `/organizations/${data?.data?.id}`,
      data,
    );
    console.log('result updateOrganization', result);
    if (result?.ok) {
      getAllCompanies(false);
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error updateOrganization', error);
    return { status: true, message: error };
  }
};

export const deleteOrganization = async (id: number) => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.delete(`/organizations/${id}`);
    if (result?.ok) {
      getAllCompanies(false);
      showMessageSafe({
        message: 'Organization deleted successfully',
        type: 'success',
        duration: alert_Dur,
      });
      return { status: true };
    } else {
      return { status: false, message: result };
    }
  } catch (error) {
    console.log('error Organization', error);
    return { status: false };
  }
};
