import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Keyboard,
  ScrollView,
  Text,
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useNavigation, useTheme, useRoute } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { moderateVerticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-get-random-values';
// @ts-ignore
import { v4 as uuid } from 'uuid';
import { showMessage } from 'react-native-flash-message';

import styles from '../../screens/SendFeedback/style';
import {
  CstmButton,
  CstmMultiLine,
  CstmPressable,
  GapView,
  Loader,
} from '../../components';
import { createComment } from '../../screens/SendFeedback/utils';
import { Canny_CreateComment } from '../../types';

interface ImageType {
  id: number;
  uri: string;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const duration = 2000;

export const CreateComment = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const { colors, dark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState<ImageType[]>([]);
  const [commentData, setCommentData] = useState<Canny_CreateComment>({
    authorID: '',
    postID: '',
    parentID: '',
    value: null,
    imageURLs: [],
  });
  const iskeyboardShown = useRef(false);
  const { id, userInfo, parentID } = route?.params;

  useEffect(() => {
    // setLoading(false);
    console.log('post id', id);
    console.log('current user info', userInfo);
    console.log('current user info', parentID);
  }, [route?.params]);

  useEffect(() => {
    let show = Keyboard.addListener('keyboardDidShow', () => {
      iskeyboardShown.current = true;
    });
    let hide = Keyboard.addListener('keyboardDidHide', () => {
      iskeyboardShown.current = false;
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, [iskeyboardShown.current]);

  const handleDeleteImage = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const tempArr = [...imageData].filter(item => item.id !== id);
    setImageData(tempArr);
  };

  const handleUploadImage = () => {
    setLoading(true);
    ImagePicker.openPicker({})
      .then(image => {
        const field = image.path;
        console.log({ uri: field });
        //? function to upload image to Canny.io (returns Canny.io image url)
        (function (field: string) {
          const imageType =
            'image/' + field.split('.')[field.split('.').length - 1];
          const imageName = field.split('/')[field.split('/').length - 1];
          console.log(
            'chala ha',
            field.split('.')[field.split('.').length - 1],
          );
          const formData = new FormData();
          formData.append('file', {
            uri: field,
            type: imageType === 'png' ? 'image/png' : 'image/jpeg',
            name: imageName,
          });
          formData.append(
            'fileType',
            imageType === 'png' ? 'image/png' : 'image/jpeg',
          );
          formData.append('csrfToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjc3JmSUQiOiI2MzkzMWMzY2JhN2RmMzczNTUyMWIwYjEiLCJpYXQiOjE3NTIxNDU0MzcsImV4cCI6MTc1OTkyMTQzN30.40KbttGFJXVykkvLAL8S4rIK9U6eaNZsZn9WJrjq26k');
          var config = {
            method: 'POST',
            body: formData,
          };
          fetch('https://feedback.itarian.com/api/files/upload', config)
            .then(response => response.json())
            .then((result: { fileURL: string; error: string }) => {
              setLoading(false);
              console.log('upload hoa image', result, JSON.stringify(config?.body));
              if (result.fileURL) {
                console.log('upload hoa image', result.fileURL);
                setImageData((state: ImageType[]) => {
                  return [...state, { uri: result?.fileURL, id: uuid() }];
                });
              }
              if (result.error) {
                setLoading(false);
                showMessageSafe({
                  message: result.error,
                  type: 'danger',
                  icon: 'auto',
                  duration,
                });
              }
            })
            .catch(error => {
              setLoading(false);
              console.log('error', error);
              showMessageSafe({
                message: error[0],
                type: 'danger',
                icon: 'auto',
                duration,
              });
            });
        })(field);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      })
      .catch(err => {
        console.log('err', err);
        setLoading(false);
        showMessageSafe({
          message: err.message,
          type: 'danger',
          icon: 'auto',
          duration,
        });
      });
  };

  const handleCreateComment = ({
    postID,
    authorID,
    parentID,
  }: {
    postID: string;
    authorID: string;
    parentID?: string;
  }) => {
    // setLoading(true);
    const tempArr = [...imageData];
    const finalArr: string[] = tempArr.reduce(
      (accumulator: string[], { uri }) => [...accumulator, uri],
      [],
    );
    commentData.imageURLs = finalArr;
    const req: Canny_CreateComment = {
      ...commentData,
      authorID,
      postID,
      parentID,
    };
    if (parentID == undefined) {
      delete req.parentID;
    }
    if (req.value === null) {
      showMessageSafe({
        message: 'Comment cannot be empty',
        type: 'warning',
        icon: 'auto',
      });
    }
    console.log('Sending Request Body', req);
    createComment(req)
      .then(res => {
        if (res.ok) {
          console.log('Comment Created', res?.data);
          setLoading(false);
          navigation.goBack();
          showMessageSafe({
            message: 'Succesfully Created Comment',
            type: 'success',
            icon: 'auto',
          });
        }
      })
      .catch(err => {
        console.log('err', err);
        setLoading(false);
        showMessageSafe({
          message: err,
          type: 'danger',
          icon: 'auto',
          duration,
        });
      });
  };

  const ImageContainer = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            color: colors.text,
            height: moderateVerticalScale(25, 0),
            opacity: 0.7,
            fontSize: 14,
            fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : 'OpenSans-Medium',
          }}>
          Add Image/s
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: colors.primary,
            }}>
            <CstmPressable
              style={{
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => handleUploadImage()}>
              <Text
                style={{
                  color: colors.text,
                  textAlignVertical: 'center',
                  height: moderateVerticalScale(25, 0),
                  opacity: 0.7,
                  fontSize: 14,
                  fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : 'OpenSans-Medium',
                }}>
                Upload Image
              </Text>
            </CstmPressable>
          </View>
        </View>
        <GapView mode="vertical" />
        <View>
          <FlatList
            data={imageData}
            horizontal
            contentContainerStyle={{ padding: 10 }}
            ItemSeparatorComponent={() => (
              <GapView mode="horizontal" length={15} />
            )}
            showsHorizontalScrollIndicator={false}
            renderItem={renderImages}
          />
        </View>
      </View>
    );
  };

  const renderImages = ({ item, index }: { item: any; index: number }) => {
    return (
      <View
        style={{
          borderWidth: 2,
          borderColor: colors.primary,
        }}>
        <View
          style={{
            position: 'absolute',
            height: 20,
            width: 20,
            borderRadius: 20,
            backgroundColor: colors.primary,
            zIndex: 99,
            top: -10,
            right: -10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons
            name="close"
            color={'#fff'}
            onPress={() => handleDeleteImage(item.id)}
          />
        </View>
        <Image
          style={{
            width: 80,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={item}
        />
      </View>
    );
  };

  return (
    <>
      <Loader isShow={loading} />
      <ScrollView
        style={{
          ...styles.container,
        }}>
        <CstmMultiLine
          title="Comment"
          placeholder="Leave a Comment..."
          onChangeText={text =>
            setCommentData((state: any) => {
              return { ...state, value: text };
            })
          }
        />
        <GapView mode="vertical" length={20} />
        <ImageContainer />
      </ScrollView>
      <View>
        <CstmButton
          loader={false}
          title="Create Comment"
          onPress={() =>
            handleCreateComment({ postID: id, authorID: userInfo.id, parentID })
          }
        />
      </View>
    </>
  );
};
