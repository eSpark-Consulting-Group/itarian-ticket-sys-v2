import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardTypeOptions } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { State, useHookstate } from '@hookstate/core';

import { ModalView, SingleLineField } from '../../components';
import { SelectFields, DataItem as Item } from '../../types';
import { SelectItems } from '../../utils/helperFunctions';
import { userStore } from '../../stores/userStore';
import { globalState } from '../../stores/globalAppState';

const NewHelpTopic = ({ route, navigation }: any) => {
  const { colors, dark }: Theme = useTheme();
  const users: State<any> = useHookstate(userStore.users);
  const slaplans: State<any> = useHookstate(globalState.slaPlans);
  const departments: State<any> = useHookstate(globalState.departments);
  const ticketPriorities: State<any> = useHookstate(
    globalState.ticketPriorities,
  );
  const helpTopics: State<any> = useHookstate(globalState.helpTopics);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'status',
      enable: true,
      rightSwitchVal: true,
      showRightSwitch: true,
      key: 'status',
    },
    {
      title: 'IsPublic',
      enable: true,
      rightSwitchVal: false,
      showRightSwitch: true,
      key: 'is_public',
    },
    {
      subTitle: 'name',
      title: '',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'name',
    },
    {
      title: 'Please Select',
      subTitle: 'Parent Topic',
      list:
        helpTopics.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
          };
        }) || [],
      selectedItem: undefined,
      headerTitle: 'Parent Topic',
      rightIcon: 'chevron-right',
      isRequired: false,
      key: 'parent_name',
    },
    {
      title: 'Please Select',
      subTitle: 'Staff',
      list:
        users.get()?.filter((value: any) => {
          return value?.role != 'user';
        }) || [],
      selectedItem: undefined,
      headerTitle: 'Member',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'staff',
    },
    {
      title: 'Please Select',
      subTitle: 'Sla Plan',
      list:
        slaplans.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
          };
        }) || [],
      selectedItem: undefined,
      headerTitle: 'SLA Plan',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'slaplan',
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
      key: 'helptopicdepartment',
    },
    {
      title: 'Please Select',
      subTitle: 'Ticket Priority',
      list: ticketPriorities.get() || [],
      selectedItem: undefined,
      headerTitle: 'Ticket Priority',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'ticketpriority',
    },
    {
      subTitle: 'Internal Notes',
      title: '',
      inputable: true,
      enable: false,
      isRequired: false,
      key: 'internal_notes',
      mode: 'texteditor',
    },
  ]);

  const updateInput = (e: string, index: number) => {
    let newData = [...dataSource];
    newData[index].title = e;
    setDataSource(newData);
  };

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
    }
  }, [route?.params?.selected]);

  useEffect(() => {
    const Data: Item[] = [];
    dataSource.map(item =>
      Data.push({
        title: item.title,
        subTitle: item.subTitle,
        isRequired: item.isRequired,
        selectedItem: item.selectedItem,
        rightSwitchVal: item.rightSwitchVal,
        key: item?.key,
      }),
    );
    navigation?.setParams({
      ...route?.params,
      data: Data,
    });
  }, [dataSource]);

  const updateSwitch = (index: number) => {
    let tempArr: Item[] = [...dataSource];
    tempArr[index].rightSwitchVal = !tempArr[index].rightSwitchVal;
    setDataSource(tempArr);
  };

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
              onChangeSwitch={() => updateSwitch(index)}
              keyboardType={item?.keyboardType}
              mode={item?.mode}
              onPress={() =>
                SelectItems(
                  item,
                  index,
                  navigation,
                  route,
                  'NewHelpTopic',
                  'Stack1',
                )
              }
            />
          ))}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewHelpTopic;
