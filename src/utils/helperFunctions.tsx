import { Linking, Platform } from 'react-native';
// import {
//   AppInstalledChecker,
//   // @ts-ignore
// } from 'react-native-check-app-install';
import * as ImagePicker from 'react-native-image-crop-picker';
// import DocumentPicker, { types } from 'react-native-document-picker';
import { ShortcutItem } from 'react-native-quick-actions';
import { showMessage } from 'react-native-flash-message';
import { Buffer } from 'buffer';

import { alert_Dur } from '../constants';
import { createUser } from '../screens/SendFeedback/utils';

import { showMessage as flashShowMessage, MessageOptions } from 'react-native-flash-message';
import { initialWindowMetrics } from 'react-native-safe-area-context';

export const getNavigtionApps = async () => {
  const Androidpackages = [
    { package: 'com.waze', name: 'Waze' },
    { package: 'com.google.android.apps.maps', name: 'Google Maps' },
  ];
  const arr: any = [];
  // for (let index = 0; index < Androidpackages.length; index++) {
  //   const element: any = Androidpackages[index];
  //   const isInstalled = await AppInstalledChecker.checkPackageName(
  //     element.package,
  //   );
  //   if (isInstalled) {
  //     arr.push(element);
  //   }
  // }
  return arr;
};

export const uploadProfilePicToCanny = async (
  path: string,
  userInfo: { userId: string; fname: string; lname: string },
) => {
  try {
    (async function (field: string) {
      const imageType =
        'image/' + field.split('.')[field.split('.').length - 1];
      const imageName = field.split('/')[field.split('/').length - 1];
      console.log('chala ha', field.split('.')[field.split('.').length - 1]);
      const formData = new FormData();
      formData.append('imageFile', {
        uri: field,
        type: imageType === 'png' ? 'image/png' : 'image/jpeg',
        name: imageName,
      });
      formData.append(
        'imageType',
        imageType === 'png' ? 'image/png' : 'image/jpeg',
      );
      var config = {
        method: 'POST',
        body: formData,
      };
      fetch('https://feedback.itarian.com/api/images/upload', config)
        .then(response => response.json())
        .then((result: { imageURL: string; error: string }) => {
          console.log('upload hoa image', result);
          if (result.imageURL) {
            console.log('upload hoa image Result', result.imageURL);
            createUser({
              userID: userInfo.userId,
              name: userInfo.fname + ' ' + userInfo.lname,
              avatarURL: result.imageURL,
            }).then(res => {
              if (res?.ok) {
                console.log('Updated Sucessfully', res?.data);
                //* User Created Sucessfully
              } else {
                //! User not Created Sucessfully
                console.log('Updated Sucessfully');
              }
            });
          }
          if (result.error) {
            showMessageSafe({
              message: result.error,
              type: 'danger',
              icon: 'auto',
            });
          }
        })
        .catch(error => {
          console.log('Image not uploaded successfully', error);
          showMessageSafe({
            message: error[0],
            type: 'danger',
            icon: 'auto',
          });
        });
    })(path);
  } catch (error) {
    console.log(error);
  }
};

export const redirectToMap = (
  lat: any = 12.123,
  lng: any = -12.12312,
  defaultNav: string,
) => {
  const scheme =
    defaultNav == 'Waze'
      ? Platform.select({ ios: 'maps:0,0?q=', android: 'waze://?ll=' })
      : Platform.select({
          ios: 'maps:0,0?q=',
          android: 'https://www.google.com/maps/search/?api=1&query=',
        });

  const latLng = `${lat},${lng}`;
  const url: any = Platform.select({
    ios: `https://www.google.com/maps/search/?api=1&center=${lat},${lng}`,
    android: `${scheme}${latLng}`,
  });
  console.log('url', url);
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        var browser_url: any = 'https://www.google.de/maps/@' + lat + ',' + lng;
        return Linking.openURL(browser_url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.log('error', err));
};

export const imagePicker = async ({
  multiple = false,
  cropping = false,
  maxFiles = 10,
}) => {
  try {
    const result = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: cropping,
      multiple: multiple,
      compressImageQuality: 0.5,
      maxFiles,
      mediaType: 'photo',
      includeBase64: true,
    });
    return result;
  } catch (error) {
    console.log('imagePicker error', error);
  }
};

export const documentPicker = async () => {
  // try {
  //   const result = await DocumentPicker.pickSingle({
  //     presentationStyle: 'fullScreen',
  //     copyTo: 'cachesDirectory',
  //     type: [
  //       types.pdf,
  //       types.docx,
  //       types.xls,
  //       types.xlsx,
  //       types.csv,
  //       types.doc,
  //       types.plainText,
  //     ],
  //   });
  //   return result;
  // } catch (error) {
  //   console.log('documentPicker error', error);
  // }
};

export const cameraPicker = async ({ cropping = false }) => {
  try {
    const result = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: cropping,
      compressImageQuality: 0.5,
      includeBase64: true,
    });
    return result;
  } catch (error) {
    console.log('cameraPicker error', error);
  }
};

export const searchFromArray = async ({
  text,
  list = [],
  keys = [],
}: {
  text: string;
  list: any;
  keys: any;
}) => {
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource
    // Update FilteredDataSource
    const newData = list
      ?.map((obj: any) => {
        return flatten(obj);
      })
      ?.filter((item: any) => {
        const itemData = keys
          ?.map((value: any) => {
            console.log('item[value]', item[value]);

            return `${item[value]?.toString()?.toUpperCase()}`;
          })
          ?.join(' ');
        const textData = text?.toString()?.toUpperCase();
        return itemData?.indexOf(textData) > -1;
      });
    return newData?.map((value: object) => {
      return expandFlatten(value, '.');
    });
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    return list;
  }
};

export const getDatesInRange = (startDate: any, endDate: any) => {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

export const handleColdBoot = (data: ShortcutItem) => {
  const { userInfo } = data;
  Linking.openURL(userInfo?.url);
};

export const checkValidations = async (
  navigation: any,
  route: any,
  globalStates?: any,
  apiCall?: any,
  data?: any,
  message?: string,
  isGoback: boolean = true,
) => {
  const Info = [...(route?.params?.data ?? [])];
  for (let i = 0; i < Info.length; i++) {
    if (
      Info[i]?.isRequired &&
      (Info[i].title == 'Please Select' || Info[i].title == '')
    ) {
      showMessageSafe({
        message: 'Please fill required fields',
        type: 'warning',
        icon: 'auto',
        duration: alert_Dur,
      });
      return;
    }
  }

  try {
    const result = await apiCall(data);
    if (result?.status) {
      showMessageSafe({
        message: message ?? 'Item added Successfully',
        type: 'success',
        icon: 'auto',
        duration: alert_Dur,
      });
      // console.log('Error Not Founded');
      isGoback && navigation.goBack();
    } else {
      console.log('Request Body:', JSON.stringify(data));

      showMessageSafe({
        message:
          result?.message?.data?.errors[0]?.detail ??
          result?.message?.data?.errors[0]?.title +
            ' ' +
            result?.message?.data?.errors[0]?.status ??
          'Something went wrong',
        type: 'danger',
        icon: 'auto',
        duration: 2000,
      });
    }
  } catch (error) {}
};

export const SelectItems = (
  item: any,
  index: number,
  navigation: any,
  route: any,
  from: string,
  stack: string,
) => {
  if (item?.list) {
    navigation.navigate('Stack2', {
      screen: 'CstmItemSelector',
      params: {
        ...route?.params,
        from: from,
        item: index,
        data: item.list,
        selected: item.selectedItem,
        stack: stack,
        title: route?.params?.title,
        headerTitle: item.headerTitle,
        searchable: item.searchable,
        SelectMode: item?.SelectMode,
      },
    });
  }
};

export const encodedUserDataToken = (subDomain: string, apiKey: string) => {
  return Buffer.from(`${subDomain}:${apiKey}`, 'binary').toString('base64');
};

export const dataFormatter = (array: any = [], replacer: string = '') => {
  let dataObj: any = {};
  [...array]?.map(val => {
    dataObj[
      val?.key?.replace(/ /g, replacer) ??
        val?.subTitle?.replace(/ /g, replacer) ??
        val?.title?.replace(/ /g, replacer)
    ] = !val?.subTitle
      ? val?.rightSwitchVal
      : val?.selectedItem
      ? val?.selectedItem
      : val?.title;
  });
  return dataObj;
};

function traverseAndFlatten(
  currentNode: any,
  target: any,
  flattenedKey?: string,
) {
  for (var key in currentNode) {
    if (currentNode.hasOwnProperty(key)) {
      var newKey;
      if (flattenedKey === undefined) {
        newKey = key;
      } else {
        newKey = flattenedKey + '.' + key;
      }

      var value = currentNode[key];
      if (typeof value === 'object') {
        traverseAndFlatten(value, target, newKey);
      } else {
        target[newKey] = value;
      }
    }
  }
}

export function removeDuplicates(array1: any, array2: any) {
  const result: any = [];
  for (const obj of array1) {
    if (!result.find((o: any) => o.id === obj.id)) {
      result.push(obj);
    }
  }
  for (const obj of array2) {
    if (!result.find((o: any) => o.id === obj.id)) {
      result.push(obj);
    }
  }
  return result;
}

export function flatten(obj: any) {
  var flattenedObject = {};
  traverseAndFlatten(obj, flattenedObject);
  return flattenedObject;
}

export function expandFlatten(target: any, keySeparator: any) {
  var result = {};
  for (var key in target) {
    if (target.hasOwnProperty(key)) {
      var nestedKeys = key.split(keySeparator);
      // Get the last subKey
      var leaf = nestedKeys[nestedKeys.length - 1];
      // Get all subKeys except for the last
      var branch = nestedKeys.slice(0, nestedKeys.length - 1);

      var currentTarget: any = result;
      for (var i = 0; i < branch.length; i += 1) {
        var subKey = nestedKeys[i];
        // console.log("subKey subKey", Number(subKey))
        // If this is the first time visiting this branch, we need to instantiate it
        if (currentTarget[subKey] === undefined) {
          if (Number.isNaN(subKey)) {
            currentTarget[subKey] = {};
          } else {
            currentTarget[subKey] = [];
          }
        }
        // Visit the branch
        currentTarget = currentTarget[subKey];
      }
      currentTarget[leaf] = target[key];
    }
  }
  return result;
}

export function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
  return uuid;
}

export const showMessageSafe = (options: MessageOptions) => {
  // Show top inset for iOS or Android with notch
  const hasNotch = Platform.OS === 'android' && (initialWindowMetrics?.insets.top || 0) > 24;
  flashShowMessage({
    statusBarHeight:
      Platform.OS === 'ios'
        ? initialWindowMetrics?.insets.top || 0
        : hasNotch
        ? initialWindowMetrics?.insets.top || 0
        : undefined,
    ...options,
  });
};