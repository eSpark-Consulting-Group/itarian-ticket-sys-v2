import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useHookstate, State } from '@hookstate/core';

import { SingleLineField } from '../../../../components';
import { DataItem as Item } from '../../../../types';
import { SelectItems } from '../../../../utils/helperFunctions';
import { globalState } from '../../../../stores/globalAppState';
import { useRoute, useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { userStore } from '../../../../stores/userStore';

const Overview = () => {
  const dNavName: State<string> = useHookstate(
    globalState.defaultnNavigationName,
  );
  const [defaultNav, setdefaultNav] = useState(dNavName.get());
  const routes: any = useRoute();
  const navigation: any = useNavigation();
  const companyDetails: any = routes?.params?.companyDetails;
  const users: any = useHookstate(userStore?.users);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: companyDetails?.name,
      subTitle: 'Company Name',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'name',
    },
    {
      title: companyDetails?.phone_number,
      subTitle: 'Company Phone No',
      inputable: true,
      enable: false,
      keyboardType: 'number-pad',
      isRequired: false,
      key: 'phone_number',
    },
    {
      title: companyDetails?.website,
      subTitle: 'Website',
      inputable: true,
      enable: false,
      isRequired: false,
      key: 'website',
    },
    {
      title: companyDetails?.mainuser?.user_name ?? 'Please Select',
      subTitle: 'Main User',
      list: users.get()?.filter((val: any) => val?.role == 'user') || [],
      selectedItem: users
        .get()
        ?.filter((value: any) => value?.id == companyDetails?.mainuser?.id)[0],
      headerTitle: 'Member',
      rightIcon: 'chevron-right',
      isRequired: false,
      key: 'mainuser',
    },
    {
      title: companyDetails?.address,
      subTitle: 'Address',
      inputable: true,
      enable: false,
      isRequired: false,
      mode: 'texteditor',
      key: 'address',
    },
    {
      title: companyDetails?.internal_notes,
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
    if (routes?.params?.item?.toString() && routes?.params?.item != 'GoneTo') {
      console.log('updateObj');
      var obj: any = [...dataSource];
      obj[routes?.params?.item].title = routes?.params?.selected?.name;
      obj[routes?.params?.item].selectedItem = routes?.params?.selected;
      setDataSource([...obj]);
    }
  }, [routes?.params?.selected]);

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

    Data[Data?.length] = {
      title: companyDetails?.id,
      subTitle: 'id',
    };

    navigation?.setParams({
      ...routes?.params,
      data: Data,
    });
  }, [dataSource]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}>
      {dataSource?.map((item, index) => (
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
            SelectItems(item, index, navigation, routes, 'Company', 'Stack1')
          }
        />
      ))}
    </ScrollView>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  priorityBox: {
    backgroundColor: 'yellow',
    borderWidth: 1,
    height: 10,
    width: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.8,
  },
  subTitle: {
    opacity: 0.6,
  },
});
