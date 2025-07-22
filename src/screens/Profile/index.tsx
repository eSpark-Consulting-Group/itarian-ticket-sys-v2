import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme, Theme, useRoute } from '@react-navigation/native';
import { State, useHookstate } from '@hookstate/core';
import { FlatList } from 'react-native-gesture-handler';

import styles from './style';
import {
  AvatarContainer,
  FloatButton,
  Loader,
  SingleLineField,
} from '../../components';
import Images from '../../assets/Images';
import { userStore } from '../../stores/userStore';
import { updateUser } from './utils';
import { DataItem as Item } from '../../types';
import {
  dataFormatter,
  SelectItems,
  uploadProfilePicToCanny,
} from '../../utils/helperFunctions';
import { getCurrentUser } from '../../utils/apiCalls';

const genders = [
  { id: 1, name: 'male' },
  { id: 2, name: 'female' },
];

const Profile = ({ navigation }: any) => {
  const routes: any = useRoute();
  const route: any = routes?.params;
  const { colors, dark }: Theme = useTheme();
  const user: State<any> = useHookstate(userStore.user);
  const userDetails: any = useHookstate(userStore.userDetails).get();
  const [userObj, setUserObj] = useState<any>(null);
  const [imgPath, setImgPath] = useState<any>(null);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState<Item[]>([
    {
      title: '',
      subTitle: 'first name',
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'last name',
      title: '',
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'country code',
      title: '',
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'ext',
      title: '',
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'phone_number',
      title: '',
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'mobile_number',
      title: '',
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'gender',
      title: 'Please select',
      key: 'gender',
      list: genders,
      selectedItem: undefined,
      headerTitle: 'Gender',
      rightIcon: 'chevron-right',
      isRequired: false,
    },
    {
      title: 'Auto Assign',
      enable: true,
      rightSwitchVal: false,
      showRightSwitch: true,
      key: 'auto_assign',
    },
    {
      title: '',
      subTitle: 'agent signature',
      inputable: true,
      enable: false,
      isRequired: true,
      mode: 'multiline',
      key: 'agent_signature',
    },
    {
      title: '',
      subTitle: 'internal note',
      inputable: true,
      enable: false,
      isRequired: true,
      mode: 'texteditor',
      key: 'internal_note',
    },
  ]);

  const fetchUserDetails = () => {
    const dataSource: Item[] = [...userData];
    dataSource[0].title = userDetails?.attributes?.first_name?.toString();
    dataSource[1].title = userDetails?.attributes?.last_name?.toString();
    dataSource[2].title = userDetails?.attributes?.country_code?.toString();
    dataSource[3].title = userDetails?.attributes?.ext?.toString();
    dataSource[4].title = userDetails?.attributes?.phone_number?.toString();
    dataSource[5].title = userDetails?.attributes?.mobile_number?.toString();
    dataSource[6].title = userDetails?.attributes?.gender;
    dataSource[6].selectedItem = genders.find(
      (val: any) => val.name == userDetails?.attributes?.gender,
    );
    dataSource[7].rightSwitchVal = Boolean(
      userDetails?.attributes?.auto_assign,
    );
    dataSource[8].title = userDetails?.attributes?.agent_signature;
    dataSource[9].title = userDetails?.attributes?.internal_note;
    setUserObj(JSON.parse(JSON.stringify(userDetails)));
    setUserData(dataSource);
  };

  useEffect(() => {
    fetchUserDetails();
  }, [user]);

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: any = [...userData];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setUserData([...obj]);
    }
  }, [route?.params?.selected]);

  const updateInput = (e: string, index: number) => {
    let newData = [...userData];
    newData[index].title = e;
    setUserData(newData);
  };

  const updateSwitch = (index: number) => {
    let tempArr: Item[] = [...userData];
    tempArr[index].rightSwitchVal = !tempArr[index].rightSwitchVal;
    setUserData(tempArr);
  };

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: any = [...userData];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setUserData([...obj]);
    }
  }, [route?.params?.selected]);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}>
      <Loader isShow={loader} />
      <View
        style={{
          ...styles.infoHolder,
          backgroundColor: dark ? '#0000008a' : '#ffffff8a',
        }}>
        <AvatarContainer
          source={
            userObj?.attributes?.profile_picture
              ? {
                  uri: `data:image/jpeg;base64,${userObj?.attributes?.profile_picture}`,
                }
              : Images.Avatar
          }
          onChange={(img: any) => {
            const data = { ...userObj };
            data['attributes']['profile_picture'] = img?.data;
            setUserObj(data);
            setImgPath(img.path);
          }}
        />
        <Text style={{ fontWeight: 'bold', color: colors.text, marginTop: 10 }}>
          {user.get()?.email ?? 'N/A'}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 70 }}
        data={userData || []}
        renderItem={({ item: user, index }: { item: Item; index: number }) => {
          return (
            <SingleLineField
              key={index}
              subTitle={user?.subTitle}
              title={user?.title ?? ''}
              inputable={user?.inputable}
              onChangeText={e => updateInput(e, index)}
              onPress={() =>
                SelectItems(
                  user,
                  index,
                  navigation,
                  route,
                  'SlaPlanDetails',
                  'Profile',
                )
              }
              enable={user.enable}
              rightIconRound={user.rightIconRound}
              titleWidth={user.titleWidth}
              rightIcon={user.rightIcon}
              showRightSwitch={user.showRightSwitch}
              rightSwitchVal={user.rightSwitchVal}
              onChangeSwitch={() => updateSwitch(index)}
              keyboardType={user?.keyboardType}
              mode={user?.mode}
            />
          );
        }}
      />
      <FloatButton
        icon="content-save-outline"
        onPress={async () => {
          setLoader(true);
          const data = dataFormatter(userData, '_');
          const dataObj = {
            data: {
              id: userObj?.id,
              type: 'users',
              attributes: {
                email: user.get()?.email ?? '',
                user_name: userObj?.attributes?.user_name,
                first_name: data?.first_name,
                last_name: data?.last_name,
                company: userObj?.attributes?.user_name,
                is_active: Boolean(userObj?.attributes?.is_active),
                ext: data?.ext,
                country_code: Number(data?.country_code ?? 0),
                phone_number: data?.phone_number,
                mobile_number: data?.mobile_number,
                internal_note: data?.internal_note,
                gender: data?.gender?.name,
                auto_assign: data?.auto_assign,
                agent_signature: data?.agent_signature,
                profile_picture: userObj?.attributes?.profile_picture ?? '',
              },
              relationships: {
                group: {
                  data: {
                    type: 'groups',
                    id: userObj?.attributes?.group?.id?.toString(),
                  },
                },
                department: {
                  data: {
                    type: 'departments',
                    id: userObj?.attributes?.department?.id?.toString(),
                  },
                },
                timezone: {
                  data: {
                    type: 'timezones',
                    id: userObj?.attributes?.timezone?.id?.toString(),
                  },
                },
                location: {
                  data: {
                    type: 'locations',
                    id: userObj?.attributes?.location?.id?.toString(),
                  },
                },
                teams: {
                  data: userObj?.attributes?.team?.map((val: any) => {
                    return {
                      id: val?.id?.toString(),
                      type: 'teams',
                    };
                  }),
                },
              },
            },
          };
          await updateUser(userObj?.id, dataObj);
          await uploadProfilePicToCanny(imgPath, {
            fname: data?.first_name,
            lname: data?.last_name,
            userId: user.get().userId,
          });
          setLoader(false);
          await getCurrentUser();
          fetchUserDetails();
        }}
      />
    </View>
  );
};

export default Profile;
