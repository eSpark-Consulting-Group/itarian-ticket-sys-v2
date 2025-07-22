import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView } from 'react-native';
import {
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Text,
} from 'react-native';

import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { State, useHookstate } from '@hookstate/core';
import { Checkbox } from 'react-native-paper';
import { Theme, useTheme } from '@react-navigation/native';

import styles from './style';
import {
  CstmButton,
  CstmInput,
  CstmErrorText,
  BiometricVerification,
  Loader,
} from '../../../components';
import { WINDOW_HEIGHT } from '../../../constants';

import Images from '../../../assets/Images';
import { userStore } from '../../../stores/userStore';
import { handleLoginUser } from '../utils/functions';
import { globalState } from '../../../stores/globalAppState';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const LoginScreen = ({ navigation }: NativeStackHeaderProps) => {
  const loadingState: State<boolean> = useHookstate(globalState.loader);
  const biometricState: State<boolean> = useHookstate(globalState.useBiometric);
  const [rememberMe, setRememberMe] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const { colors }: Theme = useTheme();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // const handleScanner = () => { //! do not remove
  //   FingerprintScanner.isSensorAvailable()
  //     .then(biometryType => {
  //       console.log('Biometric', biometryType);
  //       setShowScanners(true);
  //     })
  //     .catch(error => {
  //       setShowScanners(false);
  //       Alert.alert(error.name, error.message, [
  //         {
  //           text: 'Open Security',
  //           style: 'default',
  //           onPress: () => AndroidOpenSettings.securitySettings(),
  //         },
  //         {
  //           text: 'Cancel',
  //           style: 'cancel',
  //         },
  //       ]);
  //     });
  // };

  // const handleScanner = () => {
  //   navigation.navigate('Pin');
  // };

  // const handleScanner = () => {
  //   if (biometricState.get()) {
  //     setShowScanners(true);
  //   } else {
  //     Alert.alert(
  //       'Enable Biometric Authentication',
  //       'You can enable biometric authentication from App Settings',
  //     );
  //   }
  // };

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <View style={{ flex: 1, height: WINDOW_HEIGHT }}>
      <View style={styles.imageContainer}>
        <Image
          source={Images.Logo}
          resizeMode={'contain'}
          style={styles.headerImage}
        />
      </View>
      <ScrollView>
        <KeyboardAvoidingView
          style={keyboardStatus ? styles.container : {}}
          behavior="padding">
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (values, { resetForm }) => {
              const { email, password } = values;
              try {
                await handleLoginUser(email, password, rememberMe, navigation);
                setRememberMe(false);
                resetForm();
              } catch (e) {
                console.log('error', e);
              }
            }}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
              values,
            }) => (
              <>
                <View>
                  <CstmInput title={'Site'} placeholder={'Your site'} />
                  <CstmInput title={'Company'} placeholder={'Your company'} />
                  <CstmInput
                    title={'Email'}
                    placeholder={'Your email'}
                    value={values.email}
                    keyType={'default'}
                    onChangeText={handleChange('email')}
                    onChange={() => {}}
                    onBlur={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email ? (
                    <CstmErrorText errorMsg={errors.email} />
                  ) : (
                    <View />
                  )}
                  <CstmInput
                    title={'Password'}
                    placeholder={'Your password'}
                    value={values.password}
                    textHidden
                    onChangeText={handleChange('password')}
                    onChange={() => {}}
                    onBlur={() => setFieldTouched('password')}
                  />
                  {touched.password && errors.password ? (
                    <CstmErrorText errorMsg={errors.password} />
                  ) : (
                    <View />
                  )}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 0.1 }} />
                    <Checkbox
                      color={colors.primary}
                      uncheckedColor={'#949494'}
                      status={rememberMe ? 'checked' : 'unchecked'}
                      onPress={() => setRememberMe(!rememberMe)}
                    />
                    <Text style={{ color: colors.text }}>Remember Me</Text>
                    <View style={{ flex: 0.1 }} />
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <CstmButton
                      title="Sign In"
                      loader={false}
                      onPress={() => {
                        handleSubmit();
                      }}
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>
          {/* <Separator text="OR" /> */}
          {/* <View style={styles.scannerBtnContainer}>
            <TouchableOpacity
              onPress={handleScanner}
              style={{
                ...styles.fingerScannerBtn,
                borderColor: colors.primary,
              }}>
              <MCI name="fingerprint" color={colors.primary} size={50} />
            </TouchableOpacity>
            <GapView length={5} />
            <Text
              style={{
                color: colors.primary,
                fontSize: 14,
              }}>
              Biometric Scan
            </Text>
          </View> */}
        </KeyboardAvoidingView>
      </ScrollView>
      {loadingState.get() && <Loader isShow={loadingState.get()} />}
      {/* {showScanner && (
        <BiometricVerification
          onAuthenticate={() => {
            user.set(true);
            setShowScanners(false);
          }}
          onCancel={() => setShowScanners(false)}
        />
      )} */}
    </View>
  </SafeAreaView>
  );
};

export default LoginScreen;
