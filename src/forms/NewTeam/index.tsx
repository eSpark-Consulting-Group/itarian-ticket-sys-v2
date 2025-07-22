import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardTypeOptions } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { State, useHookstate } from '@hookstate/core';

import { GapView, ModalView, SingleLineField } from '../../components';
import { SelectFields, DataItem as Item } from '../../types';
import { SelectItems } from '../../utils/helperFunctions';
import { userStore } from '../../stores/userStore';

const NewTeam = ({ route, navigation }: any) => {
  const { colors, dark }: Theme = useTheme();
  const users: State<any> = useHookstate(userStore.users);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'Status',
      enable: false,
      rightSwitchVal: false,
      showRightSwitch: true,
    },
    {
      title: '',
      subTitle: 'Team Name',
      inputable: true,
      enable: false,
      isRequired: true,
    },
    {
      title: 'Please Select',
      subTitle: 'Team Lead',
      list:
        users.get()?.filter((value: any) => {
          return value?.role != 'user';
        }) || [],
      selectedItem: users.get()[0],
      headerTitle: 'Member',
      rightIcon: 'chevron-right',
      isRequired: true,
    },
    {
      title: '',
      subTitle: 'Admin Notes',
      inputable: true,
      enable: false,
      isRequired: true,
      mode: 'multiline',
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
    <ModalView>
      <ScrollView style={{ flex: 1 }}>
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
              SelectItems(item, index, navigation, route, 'NewTeam', 'Stack1')
            }
          />
        ))}
        <GapView />
      </ScrollView>
    </ModalView>
  );
};

export default NewTeam;
