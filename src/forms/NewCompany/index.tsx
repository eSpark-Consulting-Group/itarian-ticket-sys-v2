import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { useHookstate } from '@hookstate/core';

import { ModalView, SingleLineField } from '../../components';
import { DataItem as Item } from '../../types';

import { SelectItems } from '../../utils/helperFunctions';
import { userStore } from '../../stores/userStore';

const NewCompany = ({ route, navigation }: any) => {
  const { colors, dark }: Theme = useTheme();
  const users: any = useHookstate(userStore?.users);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: '',
      subTitle: 'Company Name',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'name',
    },
    {
      title: '',
      subTitle: 'Company Phone No',
      inputable: true,
      enable: false,
      keyboardType: 'number-pad',
      isRequired: false,
      key: 'phone_number',
    },
    {
      title: '',
      subTitle: 'Website',
      inputable: true,
      enable: false,
      isRequired: false,
      key: 'website',
    },
    {
      title: 'Please Select',
      subTitle: 'Main User',
      list: users.get()?.filter((val: any) => val?.role == 'user') || [],
      selectedItem: undefined,
      headerTitle: 'Member',
      rightIcon: 'chevron-right',
      isRequired: false,
      key: 'mainuser',
    },
    {
      title: '',
      subTitle: 'Address',
      inputable: true,
      enable: false,
      isRequired: false,
      mode: 'texteditor',
      key: 'address',
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
              onChangeSwitch={item.onChangeSwitch}
              keyboardType={item?.keyboardType}
              mode={item?.mode}
              onPress={() =>
                SelectItems(
                  item,
                  index,
                  navigation,
                  route,
                  'NewCompany',
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

export default NewCompany;
