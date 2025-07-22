import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

import { FloatButton, Loader, SingleLineField } from '../../../../components';
import { DataItem as Item } from '../../../../types';
import _ from 'lodash';
import { create_UUID, SelectItems, showMessageSafe } from '../../../../utils/helperFunctions';
import { deleteUser } from '../../utils/functions';
import { StaffRole } from '../../../../constants/SampleArrays';

export default function Details() {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const contactDetails = route?.params?.contactDetails;
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'Is Active',
      enable: true,
      rightSwitchVal: Boolean(contactDetails?.is_active),
      showRightSwitch: true,
      key: 'is_active',
    },
    {
      title: contactDetails?.email ?? '',
      subTitle: 'Email',
      inputable: contactDetails?.email ? false : true,
      enable: false,
      isRequired: true,
      key: 'email',
    },
    {
      title: contactDetails?.user_name ?? '',
      subTitle: 'User Name',
      inputable: true,
      enable: false,
      keyboardType: 'number-pad',
      isRequired: true,
      key: 'user_name',
    },
    {
      title: contactDetails?.first_name ?? '',
      subTitle: 'First Name',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'first_name',
    },
    {
      title: contactDetails?.last_name ?? '',
      subTitle: 'Last Name',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'last_name',
    },
    {
      title: contactDetails?.phone_number ?? '',
      subTitle: 'Phone Number',
      inputable: true,
      enable: false,
      isRequired: true,
      keyboardType: 'number-pad',
      key: 'phone_number',
    },
    {
      title: contactDetails?.internal_note ?? '',
      subTitle: 'Internal Notes',
      inputable: true,
      enable: false,
      isRequired: false,
      mode: 'texteditor',
      key: 'internal_notes',
    },
  ]);
  const [loader, setLoader] = useState(false);

  const updateInput = (e: string, index: number) => {
    let newData = [...dataSource];
    newData[index].title = e;
    setDataSource(newData);
  };

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      let obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
    }
  }, [route?.params?.selected]);

  const updateSwitch = (index: number) => {
    let tempArr: Item[] = [...dataSource];
    tempArr[index].rightSwitchVal = !tempArr[index].rightSwitchVal;
    setDataSource(tempArr);
  };

  useEffect(() => {
    const Data: Item[] = [];
    dataSource.forEach(item =>
      Data.push({
        title: item.title,
        subTitle: item.subTitle,
        isRequired: item.isRequired,
        selectedItem: item.selectedItem,
        rightSwitchVal: item.rightSwitchVal,
        key: item.key,
      }),
    );

    Data[Data?.length] = {
      title: contactDetails?.id,
      subTitle: 'id',
    };

    navigation?.setParams({
      ...route?.params,
      data: Data,
    });
  }, [dataSource]);

  useEffect(() => {
    const obj = [...dataSource];
    if (obj[2]?.subTitle != 'Role' && route?.params?.from == 'staff') {
      obj.splice(2, 0, {
        title: 'Please Select',
        subTitle: 'Role',
        list: StaffRole || [],
        selectedItem: undefined,
        headerTitle: 'Roles',
        rightIcon: 'chevron-right',
        isRequired: true,
        key: 'role',
      });
    }
    setDataSource(obj);
  }, []);
  const deleteUserFunc = (id: number) => {
    setLoader(true);
    console.log('companyDetails', id);
    deleteUser(id)
      .then(res => {
        console.log('res res ', res?.message?.data?.errors);

        setLoader(false);
        if (res?.status) {
          navigation?.goBack();
        } else {
           showMessageSafe({
            message:
              res?.message?.data?.errors[0]?.detail ??
              res?.message?.data?.errors[0]?.title ??
              'Something went wrong',
            type: 'danger',
            icon: 'auto',
            duration: 2000,
          });
        }
      })
      .catch(err => {
        console.log('delete Organization failed', err);
        setLoader(false);
      });
  };

  return (
    <>
      <Loader isShow={loader} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: 'center' }}>
        {dataSource?.map((item, index) => (
          <SingleLineField
            key={`${create_UUID()}`}
            subTitle={item.isRequired ? item.subTitle + '*' : item.subTitle}
            title={item.title}
            inputable={item.inputable}
            onChangeText={e => updateInput(e, index)}
            enable={item.enable}
            rightIconRound={item.rightIconRound}
            titleWidth={item.titleWidth}
            rightIcon={item.rightIcon}
            showRightSwitch={item.showRightSwitch}
            rightSwitchVal={item.rightSwitchVal}
            keyboardType={item?.keyboardType}
            mode={item?.mode}
            onChangeSwitch={() => updateSwitch(index)}
            onPress={() =>
              SelectItems(item, index, navigation, route, 'NewUser', 'Stack1')
            }
          />
        ))}
      </ScrollView>
      <FloatButton
        icon="delete"
        onPress={() => {
          Alert.alert(
            'Delete Contact?',
            'Are you sure you want to delete this Contact permanently',
            [
              {
                text: 'Yes',
                style: 'default',
                onPress: () => deleteUserFunc(contactDetails?.id),
              },
              {
                text: 'No',
                style: 'cancel',
                onPress: () => console.log('Pressed Cancel on Delete'),
              },
            ],
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
