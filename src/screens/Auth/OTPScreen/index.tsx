import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Theme, useTheme } from '@react-navigation/native';
// @ts-ignore
import CountDown from 'react-native-countdown-component';

import Images from '../../../assets/Images';
import { SCREEN_HEIGHT, WINDOW_HEIGHT } from '../../../constants';
import styles from './style';
import { CstmButton } from '../../../components';
import { handleVerifyOTP, requestSmsOtp } from '../utils/functions';

const OTPScreen = ({ navigation, route }: any) => {
  const paramsData = route?.params?.data;

  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(300);
  const [expired, setExpired] = useState(false);
  const [showResend, setshowResend] = useState(false);

  const { colors }: Theme = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setshowResend(true);
    }, 10000);
  }, []);

  const onSubmit = async () => {
    var obj = {
      otp: otp,
      otpKey: paramsData?.otpKey,
      otpType: paramsData?.otpType,
    };
    const result = await handleVerifyOTP(obj);
    if (!result) setOtp('');
  };

  const onResend = async () => {
    setCounter(0);
    const result = await requestSmsOtp(paramsData, navigation);
    if (result) {
      setshowResend(false);
      setCounter(300);
      setExpired(!expired);
      setTimeout(() => {
        setshowResend(true);
      }, 10000);
    }
  };

  return (
    <View style={{ backgroundColor: colors.background }}>
      <View style={styles.imageContainer}>
        <Image
          source={Images.Logo}
          resizeMode={'contain'}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.imageContainer}>
        <Text style={{ fontWeight: 'bold', color: colors.text, fontSize: 25 }}>
          OTP Verification
        </Text>
        <Text style={{ color: colors.text }}>
          We sent your code to your{' '}
          {paramsData?.otpType == 'sms'
            ? 'Phone Number'
            : '2 Factor Authenticator App'}
        </Text>
        {!expired && paramsData?.otpType == 'sms' && (
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginVertical: 5, color: colors.text }}>
              OTP will expires in
            </Text>
            <CountDown
              until={counter}
              onFinish={() => {
                setExpired(!expired);
              }}
              timeToShow={['M', 'S']}
              timeLabels={{ m: 'MM', s: 'SS' }}
              style={{ width: '15%' }}
              digitStyle={{ backgroundColor: 'none' }}
              separatorStyle={{
                color: colors.primary,
                marginBottom: 16,
                marginHorizontal: -15,
              }}
              digitTxtStyle={{ color: colors.primary }}
              timeLabelStyle={{ color: 'transparent' }}
              showSeparator
              size={12}
            />
          </View>
        )}
      </View>
      <View style={{ marginTop: SCREEN_HEIGHT * 0.15 }}>
        <OTPInputView
          style={{ width: '80%', height: 100, alignSelf: 'center' }}
          pinCount={6}
          code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => setOtp(code)}
          autoFocusOnLoad={false}
          codeInputFieldStyle={{
            ...styles.underlineStyleBase,
            color: colors.text,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 5,
            height: 40,
            width: 40,
          }}
          codeInputHighlightStyle={{
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 5,
          }}
        />

        <CstmButton
          disabled={otp?.length != 6}
          title="Continue"
          loader={false}
          onPress={() => onSubmit()}
        />
        {paramsData?.otpType == 'sms' && showResend && (
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!showResend}
            onPress={() => {
              onResend();
            }}
            style={{
              alignItems: 'center',
              marginVertical: SCREEN_HEIGHT * 0.15,
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                marginVertical: 5,
                color: colors.text,
                opacity: 0.8,
              }}>
              Didn't recieve OTP?{' '}
            </Text>
            <Text
              style={[
                styles.resendCode,
                {
                  color: colors.primary + (!showResend ? '40' : ''),
                  textDecorationLine: 'underline',
                },
              ]}>
              Resend OTP Code
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OTPScreen;
