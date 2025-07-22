import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { State, useHookstate } from '@hookstate/core';

import { ModalView, SingleLineField } from '../../components';
import { DataItem as Item } from '../../types';
import { SelectItems } from '../../utils/helperFunctions';
import { userStore } from '../../stores/userStore';
import { globalState } from '../../stores/globalAppState';

const NewDepartment = ({ route, navigation }: any) => {
  const { colors, dark }: Theme = useTheme();
  const users: State<any> = useHookstate(userStore.users);
  const slaplans: State<any> = useHookstate(globalState.slaPlans);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'IsDefault',
      enable: true,
      rightSwitchVal: false,
      showRightSwitch: true,
    },
    {
      title: 'IsPublic',
      enable: true,
      rightSwitchVal: true,
      showRightSwitch: true,
    },
    {
      subTitle: 'name',
      title: '',
      inputable: true,
      enable: false,
      isRequired: true,
    },
    {
      title: 'Please Select',
      subTitle: 'Manager',
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
      title: 'Please Select',
      subTitle: 'Sla Plan',
      list:
        slaplans.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
          };
        }) || [],
      selectedItem: slaplans.get()[0],
      headerTitle: 'Member',
      rightIcon: 'chevron-right',
      isRequired: true,
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
                  'NewDepartment',
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

export default NewDepartment;
