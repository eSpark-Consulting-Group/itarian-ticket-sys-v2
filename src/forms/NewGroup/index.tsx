import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';

import { ModalView, SingleLineField } from '../../components';
import { DataItem as Item } from '../../types';
import { SelectItems } from '../../utils/helperFunctions';

const NewGroup = ({ route, navigation }: any) => {
  const { colors, dark }: Theme = useTheme();
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: '',
      subTitle: 'Name',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'name',
    },
    {
      title: 'Status',
      enable: false,
      rightSwitchVal: false,
      showRightSwitch: true,
      key: 'status',
    },
    {
      title: 'Can Create Ticket',
      enable: false,
      rightSwitchVal: false,
      showRightSwitch: true,
      key: 'can_create_ticket',
    },
    {
      title: 'Can Edit Ticket',
      enable: false,
      rightSwitchVal: false,
      showRightSwitch: true,
      key: 'can_edit_ticket',
    },
    {
      title: 'Can Post Ticket',
      enable: false,
      rightSwitchVal: false,
      showRightSwitch: true,
      key: 'can_post_ticket',
    },
    {
      title: 'Can Close Ticket',
      enable: false,
      rightSwitchVal: false,
      showRightSwitch: true,
      key: 'can_close_ticket',
    },
    {
      title: 'Can Assign Ticket',
      enable: false,
      rightSwitchVal: false,
      showRightSwitch: true,
      key: 'can_assign_ticket',
    },
    {
      title: 'Can Delete Ticket',
      enable: false,
      rightSwitchVal: false,
      showRightSwitch: true,
      key: 'can_delete_ticket',
    },
    {
      title: 'Can Ban Email',
      enable: false,
      rightSwitchVal: false,
      showRightSwitch: true,
      key: 'can_ban_email',
    },
    {
      title: 'Can Fork Ticket',
      enable: false,
      rightSwitchVal: false,
      showRightSwitch: true,
      key: 'can_fork_ticket',
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

export default NewGroup;
