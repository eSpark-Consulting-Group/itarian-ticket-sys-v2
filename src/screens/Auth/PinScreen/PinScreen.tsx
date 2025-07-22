import React, { useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';
import AndroidOpenSettings from 'react-native-android-open-settings';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { State, useHookstate } from '@hookstate/core';
// @ts-ignore
import store from 'react-native-simple-store';
import { showMessage } from 'react-native-flash-message';

import styles from './style';
import Images from '../../../assets/Images';
import { BiometricVerification, CstmPressable } from '../../../components';
import { useUpdateEffect } from '../../../utils/hooks';
import { userStore } from '../../../stores/userStore';
import { alert_Dur } from '../../../constants';
import { User } from '../../../types';
import { showMessageSafe } from '../../../utils/helperFunctions';

const PinScreen = ({ route, navigation }: any) => {
  const user: State<User> = useHookstate(userStore);
  const [pin, setPin] = useState<any>('');
  const [confirmPin, setConfirmPin] = useState(false);
  const [newPin, setnewPin] = useState('');
  const [typeNewPin, setTypeNewPin] = useState(route?.params?.newPin);
  const [showScanner, setShowScanners] = useState(false);

  const { colors, dark }: Theme = useTheme();
  // const typeNewPin = route?.params?.newPin;

  const handleDigit = (digit: string) => {
    if (pin.length < 4) setPin(pin + digit);
  };

  useUpdateEffect(() => {
    if (pin.length == 4 && !confirmPin && typeNewPin) {
      setnewPin(pin);
      setPin('');
      setConfirmPin(true);
      console.log('done', pin);
    } else if (pin.length == 4) {
      console.log('Stored Pin', user?.pinCode?.get());
      if (newPin == pin || user?.pinCode?.get() == pin) {
        store.update('pinCode', pin);
        user?.pinCode?.set(pin);
        setImmediate(() => {
          navigation.navigate('Draw');
        });
        setConfirmPin(false);
      } else {
        showMessageSafe({
          message: 'Incorrect PIN Entered',
          type: 'danger',
          icon: 'auto',
          duration: alert_Dur,
        });
      }
      setPin('');
    }
  }, [pin]);

  const handleScanner = () => {
    //! do not remove
    FingerprintScanner.isSensorAvailable()
      .then(biometryType => {
        console.log('Biometric', biometryType);
        setShowScanners(true);
      })
      .catch(error => {
        setShowScanners(false);
        Alert.alert(error.name, error.message, [
          {
            text: 'Open Security',
            style: 'default',
            onPress: () => AndroidOpenSettings.securitySettings(),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={Images.Logo}
          resizeMode={'contain'}
          style={styles.headerImage}
        />
      </View>
      {typeNewPin && (
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: '500' }}>
          {confirmPin ? 'Confirm New PIN' : 'New PIN'}
        </Text>
      )}
      <OTPInputView
        style={{ width: '60%', height: 100, alignSelf: 'center' }}
        pinCount={4}
        code={pin} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={code => {
          setPin(code);
          console.log('code', code);
        }}
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
        secureTextEntry
        editable={false}
        autoFocusOnLoad={false}
        codeInputFieldStyle={{
          ...styles.underlineStyleBase,
          color: colors.text,
          borderColor: colors.border,
          borderBottomWidth: 2,
          borderRadius: 5,
          height: 60,
          width: 40,
          fontSize: 24,
        }}
        selectionColor={colors.text}
        codeInputHighlightStyle={{
          borderColor: colors.border,
          borderRadius: 5,
          color: colors.text,
        }}
      />
      {!typeNewPin && (
        <CstmPressable
          onPress={() => setTypeNewPin(true)}
          // android_ripple={{borderless: true}}
        >
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: '500' }}>
            Forgot PIN?
          </Text>
        </CstmPressable>
      )}
      <View style={{ width: '80%', alignItems: 'center' }}>
        <View style={{ ...styles.row }}>
          <CstmPressable
            onPress={() => handleDigit('1')}
            android_ripple={{ borderless: true }}>
            <Text style={{ ...styles.text, color: colors.text }}>1</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => handleDigit('2')}
            android_ripple={{ borderless: true }}>
            <Text style={{ ...styles.text, color: colors.text }}>2</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => handleDigit('3')}
            android_ripple={{ borderless: true }}>
            <Text style={{ ...styles.text, color: colors.text }}>3</Text>
          </CstmPressable>
        </View>
        <View style={{ ...styles.row }}>
          <CstmPressable
            onPress={() => handleDigit('4')}
            android_ripple={{ borderless: true }}>
            <Text style={{ ...styles.text, color: colors.text }}>4</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => handleDigit('5')}
            android_ripple={{ borderless: true }}>
            <Text style={{ ...styles.text, color: colors.text }}>5</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => handleDigit('6')}
            android_ripple={{ borderless: true }}>
            <Text style={{ ...styles.text, color: colors.text }}>6</Text>
          </CstmPressable>
        </View>
        <View style={{ ...styles.row }}>
          <CstmPressable
            onPress={() => handleDigit('7')}
            android_ripple={{ borderless: true }}>
            <Text style={{ ...styles.text, color: colors.text }}>7</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => handleDigit('8')}
            android_ripple={{ borderless: true }}>
            <Text style={{ ...styles.text, color: colors.text }}>8</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => handleDigit('9')}
            android_ripple={{ borderless: true }}>
            <Text style={{ ...styles.text, color: colors.text }}>9</Text>
          </CstmPressable>
        </View>
        <View style={{ ...styles.row }}>
          <CstmPressable
            disabled={typeNewPin}
            onPress={handleScanner}
            android_ripple={{ borderless: true }}>
            <II
              name="md-finger-print"
              size={36}
              color={typeNewPin ? colors.background : colors.text}
              style={styles.icon}
            />
          </CstmPressable>

          <CstmPressable
            onPress={() => handleDigit('0')}
            android_ripple={{ borderless: true }}>
            <Text style={{ ...styles.text, color: colors.text }}>0</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => setPin(pin.slice(0, pin.length - 1))}
            android_ripple={{ borderless: true }}>
            <II
              name="backspace-outline"
              size={36}
              color={colors.text}
              style={styles.icon}
            />
          </CstmPressable>
        </View>
      </View>
      {showScanner && (
        <BiometricVerification
          onAuthenticate={() => {
            // user.set(true);
            setShowScanners(false);
          }}
          onCancel={() => setShowScanners(false)}
        />
      )}
    </View>
  );
};

export default PinScreen;
