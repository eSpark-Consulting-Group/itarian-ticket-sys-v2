import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { State, useHookstate } from '@hookstate/core';

import { Loader, ModalView, SingleLineField } from '../../components';
import { DataItem as Item } from '../../types';
import { SelectItems } from '../../utils/helperFunctions';
import { globalState } from '../../stores/globalAppState';
import { getStates } from '../../screens/Locations/utils/functions';

const NewLocation = ({ route, navigation }: any) => {
  const { colors, dark }: Theme = useTheme();
  const countries: any = useHookstate(globalState?.countries).get();
  const states: any = useHookstate(globalState?.states)?.get();
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      subTitle: 'title',
      title: '',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'title',
    },
    {
      title: 'Please Select',
      subTitle: 'Country',
      list: countries || [],
      selectedItem: undefined,
      enable: true,
      isRequired: true,
      searchable: true,
      rightIcon: 'chevron-right',
      headerTitle: 'Countries',
      key: 'country',
    },
    {
      title: 'Please Select',
      subTitle: 'State',
      list: states || [],
      selectedItem: undefined,
      enable: true,
      isRequired: true,
      searchable: true,
      rightIcon: 'chevron-right',
      headerTitle: 'States',
      key: 'state',
    },
    {
      subTitle: 'phone',
      title: '',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'phone',
    },
    {
      subTitle: 'city',
      title: '',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'city',
    },
    {
      subTitle: 'pin code',
      title: '',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'pin_code',
    },
    {
      subTitle: 'address',
      title: '',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'address',
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
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;

      if (route?.params?.item == 1) {
        setLoader(true);
        getStates(route?.params?.selected?.name).then((res: any) => {
          obj[route?.params?.item + 1].selectedItem = undefined;
          obj[route?.params?.item + 1].title = 'Please Select';
          obj[route?.params?.item + 1].list = res;
          setDataSource([...obj]);
          setLoader(false);
        });
      } else {
        setDataSource([...obj]);
      }
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
      <Loader isShow={loader} />
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
                  'NewLocation',
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

export default NewLocation;
