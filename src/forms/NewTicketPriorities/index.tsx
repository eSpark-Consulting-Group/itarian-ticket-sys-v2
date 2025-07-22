import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardTypeOptions } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { State, useHookstate } from '@hookstate/core';

import { CstmColorPicker, ModalView, SingleLineField } from '../../components';
import { SelectFields, DataItem as Item } from '../../types';
import { SelectItems } from '../../utils/helperFunctions';
import { userStore } from '../../stores/userStore';

const NewTicketPriorities = ({ route, navigation }: any) => {
  const { colors, dark }: Theme = useTheme();
  const users: State<any> = useHookstate(userStore.users);
  const [visible, setVisible] = useState(false);
  const [currIndex, setCurrIndex] = useState<number | undefined>();
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'Status',
      enable: true,
      rightSwitchVal: true,
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
      title: '#ffffff',
      subTitle: 'color',
      inputable: false,
      enable: true,
      isRequired: false,
      leftChild: (
        <View
          style={{
            zIndex: 100,
            backgroundColor: '#ffffff',
            width: 15,
            height: 15,
            borderWidth: 2,
            borderRadius: 4,
            borderColor: colors.text + 'aa',
          }}
        />
      ),
      rightIcon: 'chevron-right',
      key: 'color',
      onPress: (): void => setVisible(true),
      modal: true,
    },
    {
      title: '',
      subTitle: 'description',
      inputable: true,
      enable: false,
      isRequired: true,
      mode: 'texteditor',
    },
  ]);

  const updateInput = (e: string, index: number) => {
    let newData = [...dataSource];
    newData[index].title = e;
    setDataSource(newData);
  };

  const updateColor = (e: string, index?: number) => {
    console.log('what is index?', index);
    let newData = [...dataSource];
    newData[index!!].title = e;
    newData[index!!].leftChild = (
      <View
        style={{
          zIndex: 100,
          backgroundColor: e,
          width: 15,
          height: 15,
          borderWidth: 2,
          borderRadius: 4,
          borderColor: colors.text + 'aa',
        }}
      />
    );
    setDataSource(newData);
    setVisible(false);
  };

  const updateSwitch = (index: number) => {
    let tempArr: Item[] = [...dataSource];
    tempArr[index].rightSwitchVal = !tempArr[index].rightSwitchVal;
    setDataSource(tempArr);
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

  return (
    <ModalView bgColor={colors.card}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ backgroundColor: colors.background }}>
          <CstmColorPicker
            onClose={() => setVisible(false)}
            color={dataSource[3].title}
            visible={visible}
            updateColor={color => updateColor(color, currIndex)}
          />
          {dataSource.map((item, index) => (
            <SingleLineField
              key={index}
              subTitle={item.isRequired ? item.subTitle + '*' : item.subTitle}
              title={item.title}
              inputable={item.inputable}
              onChangeText={e => updateInput(e, index)}
              enable={item.enable}
              leftChild={item.leftChild}
              rightIconRound={item.rightIconRound}
              titleWidth={item.titleWidth}
              rightIcon={item.rightIcon}
              showRightSwitch={item.showRightSwitch}
              rightSwitchVal={item.rightSwitchVal}
              onChangeSwitch={() => updateSwitch(index)}
              keyboardType={item?.keyboardType}
              mode={item?.mode}
              onPress={() => {
                if (item?.key == 'color') {
                  item.onPress?.();
                  setCurrIndex(index);
                }
                SelectItems(
                  item,
                  index,
                  navigation,
                  route,
                  'NewSlaPlans',
                  'Stack1',
                );
              }}
            />
          ))}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewTicketPriorities;
