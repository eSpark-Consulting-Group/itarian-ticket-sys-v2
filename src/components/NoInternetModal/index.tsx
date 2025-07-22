import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';
import MI from 'react-native-vector-icons/MaterialIcons';
import { LightTheme } from '../../theme/colors';

type colors = {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
};

export default function NoInternetModal({
  visible,
  onClose,
  colors = LightTheme.colors,
}: {
  visible: boolean;
  onClose?: () => void;
  colors: colors;
}): JSX.Element {

  return (
    <Modal
      presentationStyle="overFullScreen"
      visible={visible}
      transparent
      animationType='fade'
      statusBarTranslucent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000000a5',
        }}>
        <View
          style={{
            width: '90%',
            height: '50%',
            backgroundColor: colors.background,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 3,
            borderColor: colors.primary,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingVertical: 10,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 22,
                color: '#ffffff',
                fontWeight: '500',
                textAlign: 'center',
              }}>
              No Internet
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MI name="wifi-off" size={150} color={colors.primary} />
            <Text style={{ textAlign: 'center', paddingHorizontal:  20, fontSize: 18, fontWeight: '600', color: colors.text + '88' }}>
              It seems there is something wrong with your internet connection.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
