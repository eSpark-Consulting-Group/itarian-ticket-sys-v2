import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
} from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import Pinchable from 'react-native-pinchable';
import GapView from '../GapView';

type colors = {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
};

export default function PreviewImage({
  visible,
  onClose,
  image,
}: {
  visible: boolean;
  onClose?: () => void;
  image: string;
}): JSX.Element {
  const { colors }: Theme = useTheme();
  return (
    <Modal
      presentationStyle="overFullScreen"
      visible={visible}
      transparent
      animationType="fade"
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
            width: '100%',
            height: '100%',
            backgroundColor: colors.background,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              top: 0,
              position: 'absolute',
              backgroundColor: colors.primary,
              width: '100%',
              paddingVertical: 30,
              paddingHorizontal: 10,
            }}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', top: 10 }}>
              <II
                onPress={onClose}
                name="md-close-sharp"
                color={'#fff'}
                size={30}
              />
              <GapView length={90} mode="horizontal" />
              <Text style={{ color: '#fff', fontSize: 20 }}>Preview Image</Text>
            </View>
          </View>
          <Pinchable style={{ width: '100%' }}>
            <Image
              source={{
                uri: image,
              }}
              style={{ height: 400, width: '100%' }}
              resizeMode="contain"
            />
          </Pinchable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
