import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';
import CstmButton from '../CstmButton';
import { cameraPicker, imagePicker } from '../../utils/helperFunctions';

export default function ImageUploadOptions({
  visible,
  onClose,
  onImageSelect = (file: any) => {},
}: {
  visible: boolean;
  onClose?: () => void;
  onImageSelect?: (file: any) => void;
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
            width: '90%',
            height: '30%',
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
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 22,
                color: '#ffffff',
                fontWeight: '500',
                textAlign: 'center',
                left: 15,
              }}>
              Select Image
            </Text>
            <II
              onPress={onClose}
              name="md-close-sharp"
              size={30}
              color={'#fff'}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              width: '100%',
            }}>
            <CstmButton
              title="Upload an image"
              onPress={async () => {
                const res = await cameraPicker({ cropping: false });
                onImageSelect(res);
              }}
            />
            <CstmButton
              title="Choose image from gallery"
              onPress={async () => {
                const res = await imagePicker({});
                onImageSelect(res);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
