import React, { useState } from 'react';
import { View, Image, ImageURISource, TouchableOpacity } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import II from 'react-native-vector-icons/Ionicons';
import styles from './style';
import ImageUploadOptions from '../ImageUploadOptions';

const AvatarContainer = ({
  source,
  size,
  onChange = (e: any) => {},
}: {
  source: ImageURISource;
  size?: number;
  onChange?: (e: any) => void;
}) => {
  const { colors }: Theme = useTheme();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <ImageUploadOptions
        onClose={() => setVisible(false)}
        visible={visible}
        onImageSelect={(file: any) => {
          setVisible(false);
          file && onChange(file);
        }}
      />
      <View
        style={{
          ...styles.container,
          width: size ? size : moderateScale(70, 0.5),
          height: size ? size : moderateScale(70, 0.5),
        }}>
        <Image
          source={source}
          // resizeMode="contain"
          style={{
            ...styles.AvatarImage,
            width: size ? size : moderateScale(70, 0.5),
            height: size ? size : moderateScale(70, 0.5),
            borderColor: colors.primary,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setVisible(true);
          }}
          style={{ position: 'absolute', right: 0, bottom: 0, borderRadius: 1000, overflow: 'hidden' }}>
          <II
            name="camera-outline"
            color={'#fff'}
            style={{
              backgroundColor: colors.primary,
              padding: 3,
              borderRadius: 1000,
            }}
            size={15}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AvatarContainer;
