import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Theme, useIsFocused, useTheme } from '@react-navigation/native';
import { useHookstate } from '@hookstate/core';

import { ModalView, SingleLineField } from '../../components';
import { DataItem as Item } from '../../types';
import { SelectItems } from '../../utils/helperFunctions';
import { userStore } from '../../stores/userStore';
import { StaffRole } from '../../constants/SampleArrays';

const NewUser = ({ route, navigation }: any) => {
  const { colors, dark }: Theme = useTheme();
  const users: any = useHookstate(userStore?.users);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'Is Active',
      enable: true,
      rightSwitchVal: true,
      showRightSwitch: true,
      key: 'is_active',
    },
    {
      title: '',
      subTitle: 'Email',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'email',
    },
    {
      title: '',
      subTitle: 'User Name',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'user_name',
    },
    {
      title: '',
      subTitle: 'First Name',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'first_name',
    },
    {
      title: '',
      subTitle: 'Last Name',
      inputable: true,
      enable: false,
      isRequired: false,
      key: 'last_name',
    },
    {
      title: '',
      subTitle: 'Phone Number',
      inputable: true,
      enable: false,
      isRequired: false,
      keyboardType: 'number-pad',
      key: 'phone_number',
    },
    {
      title: '',
      subTitle: 'Password',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'password',
    },
    {
      title: '',
      subTitle: 'Internal Notes',
      inputable: true,
      enable: false,
      isRequired: false,
      mode: 'texteditor',
      key: 'internal_notes',
    },
  ]);
  const isFocused =  useIsFocused()
  const updateInput = (e: string, index: number) => {
    console.log('Text Index', e, index);
    let newData = [...dataSource];
    newData[index].title = e;
    setDataSource(newData);
  };

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      console.log('updateObj');
      var obj: any = [...dataSource];
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
    dataSource.map(item =>
      Data.push({
        title: item.title,
        subTitle: item.subTitle,
        isRequired: item.isRequired,
        selectedItem: item.selectedItem,
        rightSwitchVal: item.rightSwitchVal,
        key: item.key,
      }),
    );
    navigation?.setParams({
      ...route?.params,
      data: Data,
    });
  }, [dataSource]);

  useEffect(() => {
    const obj = [...dataSource];
    console.log("route?.params?.from", route?.params, obj[2]?.subTitle);
    
    if(obj[2]?.subTitle != "Role" && route?.params?.from == 'staff') {
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
    setDataSource(obj)
  }, [isFocused]);

  return (
    <ModalView bgColor={colors.card}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ backgroundColor: colors.background }}>
          {dataSource.map((item, index) => (
            <SingleLineField
              key={index}
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
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewUser;
