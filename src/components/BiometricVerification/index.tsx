import React, { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const BiometricVerification = ({
  onAuthenticate,
  onCancel,
}: {
  onCancel: () => void;
  onAuthenticate: () => void;
}) => {
  const [errorMessageLegacy, setErrorMessageLegacy] = useState(undefined);
  const [biometricLegacy, setBiometricLegacy] = useState(undefined);

  useEffect(() => {
    if (requiresLegacyAuthentication()) {
      authLegacy();
    } else {
      authCurrent();
    }
  }, []);

  const requiresLegacyAuthentication = () => {
    return Platform.Version < 23;
  };

  const authCurrent = () => {
    FingerprintScanner.authenticate({ title: 'Log in with Biometrics' })
      .then(() => {
        onAuthenticate();
        FingerprintScanner.release();
      })
      .catch(error => {
        console.log('Authentication error is => ', error);
        onCancel();
        FingerprintScanner.release();
      });
  };

  const authLegacy = () => {
    FingerprintScanner.authenticate({
      onAttempt: handleAuthenticationAttemptedLegacy,
    })
      .then(() => {
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch(error => {
        setBiometricLegacy(error.message);
        setErrorMessageLegacy(error.biometric);
      });
  };

  const handleAuthenticationAttemptedLegacy = (error: any) => {
    setErrorMessageLegacy(error.message);
  };

  return null;
};

export default BiometricVerification;
