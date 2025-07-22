import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Theme, useIsFocused, useTheme } from '@react-navigation/native';
import { State, useHookstate } from '@hookstate/core';

import { ModalView, SingleLineField } from '../../components';
import { DataItem as Item } from '../../types';
import { SelectItems } from '../../utils/helperFunctions';
import { userStore } from '../../stores/userStore';
import { StaffRole } from '../../constants/SampleArrays';
import { globalState } from '../../stores/globalAppState';

const NewStaff = ({ route, navigation }: any) => {
  const { colors, dark }: Theme = useTheme();
  const users: any = useHookstate(userStore?.users);
  const departments: State<any> = useHookstate(globalState.departments);
  const groups: State<any> = useHookstate(globalState.groups);
  const locations: State<any> = useHookstate(globalState.locations);
  const teams: State<any> = useHookstate(globalState.teams);
  const timezones: State<any> = useHookstate(globalState.timezones);

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
      title: 'Please Select',
      subTitle: 'Role',
      list: StaffRole || [],
      selectedItem: undefined,
      headerTitle: 'Roles',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'role',
    },
    {
      title: 'Please Select',
      subTitle: 'Group',
      list:
        groups.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
          };
        }) || [],
      selectedItem: undefined,
      headerTitle: 'Groups',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'group',
    },
    {
      title: 'Please Select',
      subTitle: 'Department',
      list:
        departments.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
          };
        }) || [],
      selectedItem: undefined,
      headerTitle: 'Departments',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'department',
    },
    {
      title: 'Please Select',
      subTitle: 'Location',
      list:
        locations.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
            name: value?.attributes?.title,
          };
        }) || [],
      selectedItem: undefined,
      headerTitle: 'Locations',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'location',
    },
    {
      title: 'Please Select',
      subTitle: 'Team',
      list:
        teams.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
          };
        }) || [],
      selectedItem: [],
      headerTitle: 'Teams',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'teams',
      SelectMode: 'checkbox',
      listTitle: true,
    },
    {
      title: 'Please Select',
      subTitle: 'Timezones',
      list:
        timezones.get().map((value: any) => {
          return {
            ...value,
            id: value?.id,
          };
        }) || [],
      selectedItem: undefined,
      headerTitle: 'Timezones',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'timezone',
      searchable: true,
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
      isRequired: true,
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

  const isFocused = useIsFocused();
  const updateInput = (e: string, index: number) => {
    console.log('Text Index', e, index);
    let newData = [...dataSource];
    newData[index].title = e;
    setDataSource(newData);
  };

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      let obj: any = [...dataSource];
      obj[route?.params?.item].title =
        route?.params?.selected?.name ??
        teams
          .get()
          ?.map((value: any) => {
            const boolVal = Boolean(
              route?.params?.selected?.find((val: any) => value?.id == val?.id),
            );
            if (boolVal) {
              return value?.attributes?.name;
            }
          })
          ?.filter((val: any) => val != undefined)
          ?.toString();
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
    navigation?.setParams({
      ...route?.params,
      data: Data,
    });
  }, [dataSource]);

  useEffect(() => {
    const obj = [...dataSource];
    setDataSource(obj);
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
                SelectItems(
                  item,
                  index,
                  navigation,
                  route,
                  'NewStaff',
                  'Stack1',
                )
              }
              listTitle={item?.listTitle}
            />
          ))}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewStaff;
