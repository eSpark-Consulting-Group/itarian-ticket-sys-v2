import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { Theme, useTheme } from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { CstmPressable } from '../CstmPressable';
import GapView from '../GapView';

export default function CstmColorPicker({
  visible,
  updateColor,
  color,
  onClose,
  erasable = false,
  onErase = () => {},
}: {
  visible: boolean;
  color: string;
  updateColor: (color: string) => void;
  onClose?: () => void;
  erasable?: boolean;
  onErase?: (color: string) => void;
}): JSX.Element {
  const showError = useRef(false);
  const { colors, dark } = useTheme();
  const [realColor, setRealColor] = useState(color);
  const [colorVal, setColorVal] = useState(realColor);

  return (
    <Modal
      presentationStyle="overFullScreen"
      visible={visible}
      transparent
      statusBarTranslucent>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={-160}
        style={{ flex: 1 }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            backgroundColor: '#000000a5',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '90%',
              height: '65%',
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
              <II
                size={30}
                style={{
                  flex: 0.2,
                  textAlign: 'center',
                }}
                name="close"
                color={'#fff'}
                onPress={onClose}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 22,
                  color: '#ffffff',
                  fontWeight: '500',
                  textAlign: 'center',
                }}>
                Pick Color
              </Text>
              <View
                style={{
                  flex: 0.2,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                width: '50%',
              }}>
              <ColorPicker
                color={realColor}
                row={false}
                sliderHidden={false}
                thumbSize={20}
                noSnap={true}
                swatches={false}
                gapSize={-20}
                onColorChangeComplete={value => {
                  setRealColor(value);
                  setColorVal(value);
                }}
              />
              <GapView length={30} />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {showError.current && (
                  <Text style={{ color: 'red' }}>Not a Valid Hex Color</Text>
                )}
                <MyInput
                  colorValue={colorVal}
                  colors={colors}
                  onSubmit={() => {
                    if (isValidHexString(colorVal)) {
                      setRealColor(colorVal);
                    } else {
                      setRealColor(color);
                      setColorVal(color);
                      showError.current = true;
                    }
                  }}
                  onChangeText={text => {
                    if (text.length <= 7) {
                      console.log('log', text);
                      setColorVal(text);
                      showError.current = false;
                    }
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: erasable ? 'space-between' : 'flex-end',
                paddingHorizontal: 12,
              }}>
              {erasable && (
                <View
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: 99,
                    elevation: 5,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CstmPressable
                    style={{ padding: 10 }}
                    android_ripple={{
                      color: '#ffffff2e',
                      borderless: true,
                    }}
                    onPress={(): void => onErase('#000')}>
                    <Fontisto size={25} name="eraser" color={'#fff'} />
                  </CstmPressable>
                </View>
              )}
              <View
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 99,
                  elevation: 5,
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CstmPressable
                  style={{ padding: 10 }}
                  android_ripple={{
                    color: '#ffffff2e',
                    borderless: true,
                  }}
                  onPress={(): void => updateColor(realColor)}>
                  <II size={30} name="checkmark" color={'#fff'} />
                </CstmPressable>
              </View>
            </View>
            <GapView />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const MyInput = ({
  colorValue,
  onChangeText,
  colors,
  onSubmit,
}: {
  colorValue: string;
  onChangeText: (text: string) => void;
  colors: Theme['colors'];
  onSubmit: () => void;
}) => {
  return (
    <TextInput
      placeholder="Enter Color Hex"
      value={colorValue}
      onChangeText={onChangeText}
      autoFocus={false}
      autoCapitalize={'none'}
      autoComplete={'off'}
      autoCorrect={false}
      onSubmitEditing={onSubmit}
      underlineColorAndroid="transparent"
      style={{
        padding: 5,
        borderWidth: 2,
        borderColor: colors.primary,
        color: colors.text,
        elevation: 1,
        borderRadius: 5,
        backgroundColor: colors.background,
      }}
    />
  );
};

function isValidHexString(str: string): boolean {
  // Check if the remaining string consists only of hexadecimal characters
  return /^#[0-9a-fA-F]{6}$/.test(str);
}

const styles = StyleSheet.create({});
