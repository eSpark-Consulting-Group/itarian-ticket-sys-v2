import { showMessage } from 'react-native-flash-message';
// @ts-ignore
import store from 'react-native-simple-store';

import { api } from '../../../api';
import { alert_Dur } from '../../../constants';
import { globalState } from '../../../stores/globalAppState';
import { userStore } from '../../../stores/userStore';
import { encodedUserDataToken, showMessageSafe } from '../../../utils/helperFunctions';

const credentialsObj = {
  email: '',
  password: '',
  // email: 'heroadmin@yopmail.com',
  // password: 'admin1',
  // email: 'faraz.espark@gmail.com',
  // email: 'tcomp4@yopmail.com',
  // password: 'admin123',
};

const tenant_Auth = 'Basic YWNjb3VudDpmYXZlby1hcGk=';

const handleLoginUser = async (
  email: string,
  password: string,
  remember: any,
  navigation: any,
) => {
  globalState.loader.set(true);
  console.log('email:', email);
  console.log('password:', password);
  api.setHeaders({
    Authorization: tenant_Auth,
  });
  const response = await api.post('/tenant/login', {
    // email: credentialsObj.email, //?: faveo
    // testwiz@yopmail.com //?: simple
    // test2fa2@yopmail.com //?: authenticator 2fa
    // otptester@yopmail.com //?: sms 2fa
    // test9@yopmail.com
    email,
    password,
    // password: credentialsObj.password,
    nameSpace: 'ServiceDesk',
  });

  console.log('User Response? ', response.data, response.config?.baseURL);
  if (response.ok) {
    const resData: any = response.data;
    console.log('User Response? ', response.data);
    globalState.loader.set(false);
    const { status, apiKey, subDomain, companyName, userId }: any = response?.data;
    if (status == 'success') {
      const userObj: any = {
        user_name: companyName,
        subDomain: subDomain,
        userId: apiKey,
        token: encodedUserDataToken(subDomain, apiKey),
        email: email,
        // email: credentialsObj.email,
        id: userId
      };
      console.log('use', userObj);

      store.update('user', userObj);
      userStore?.user?.set(userObj);
      showMessageSafe({
        message: 'Authentication Successful',
        type: 'success',
        icon: 'auto',
        autoHide: true,
        duration: alert_Dur,
      });
      // navigation.navigate('Draw');
    } else {
      showMessageSafe({
        message: 'Incorrect Email or Password',
        type: 'danger',
        icon: 'auto',
      });
    }
    if (resData.code == 'ERR_USER_NOT_FOUND') {
      showMessageSafe({
        message: 'Incorrect Email or Password',
        type: 'danger',
        icon: 'auto',
      });
    }
    if (resData.code == 'SUCCESS_AUTHENTICATION') {
      const { data } = resData;
      const { displayName, email, userId, camSessionId } = data?.sessionData;
      console.log('data?.sessionData', data);
      const userObj: any = {
        user_name: displayName,
        email: email,
        userId: userId,
      };
      if (remember) {
        navigation.navigate('Pin', { newPin: true });
        userObj['sessionId'] = camSessionId;
      } else {
        showMessageSafe({
          message: 'Authentication Successful',
          type: 'success',
          icon: 'auto',
          autoHide: true,
          duration: 100,
        });
        // navigation.navigate('Draw');
      }
      console.log('userObj', userObj);

      store.update('user', userObj);
      userStore.user.set(userObj);
    }
    if (resData.code == 'OTP_REQUIRED') {
      if (resData?.data?.otpType == 'sms') {
        const result = await requestSmsOtp(resData?.data, navigation);
        if (result) {
          navigation?.navigate('OTPScreen', {
            data: resData?.data,
          });
        }
      } else {
        navigation?.navigate('OTPScreen', {
          data: resData?.data,
        });
      }
    }
  } else {
    globalState.loader.set(false);
    showMessageSafe({
      message: 'Incorrect Email or Password',
      type: 'danger',
      icon: 'auto',
      duration: alert_Dur,
    });
  }
};

const requestSmsOtp = async (data: any, navigation: any) => {
  globalState.loader.set(true);

  const response = await api.post('/api/request-otp-sms', {
    otpKey: data?.otpKey,
  });
  if (response.ok) {
    const resData: any = response.data;
    globalState.loader.set(false);
    console.log('requestSmsOtp', response.data, data);
    if (resData?.code == 'ERR_OTP_VERIFICATION_CODE_ATTEMPT_LIMIT_REACHED') {
      showMessageSafe({
        message: 'Too many login attempts try again after 1 hour',
        type: 'danger',
        icon: 'auto',
        duration: alert_Dur,
      });
    }
    if (resData?.code == 'ERR_OTP_KEY_INVALID') {
      showMessageSafe({
        message: 'OTP key is invalid',
        type: 'danger',
        icon: 'auto',
        duration: alert_Dur,
      });
      navigation?.goBack();
    }
    if (resData?.code == 'SUCCESS_OTP_VERIFICATION_CODE_SENT') {
      return true;
    } else {
      return false;
    }
  } else {
    globalState.loader.set(false);
    return false;
  }
};

const handleVerifyOTP = async (data: any) => {
  globalState.loader.set(true);

  const response = await api.post('/api/verify-otp', {
    otpKey: data?.otpKey,
    otp: data?.otp,
    otpType: data?.otpType,
  });
  if (response.ok) {
    const resData: any = response.data;
    globalState.loader.set(false);
    if (resData?.code == 'ERR_OTP_INVALID') {
      showMessageSafe({
        message: 'You enter invalid OTP!',
        type: 'danger',
        icon: 'auto',
        duration: alert_Dur,
      });
      return false;
    }
    if (resData.code == 'SUCCESS_AUTHENTICATION') {
      const { data } = resData;
      const { displayName, email, userId } = data?.sessionData;
      showMessageSafe({
        message: 'Authentication Successful',
        type: 'success',
        icon: 'auto',
        autoHide: true,
        duration: alert_Dur,
      });
      const userObj: any = {
        user_name: displayName,
        email: email,
        userId: userId,
      };
      store.update('user', userObj);
      userStore.user.set(userObj);
      return true;
    }
  } else {
    globalState.loader.set(false);
    return false;
  }
};

export { handleLoginUser, handleVerifyOTP, requestSmsOtp };
