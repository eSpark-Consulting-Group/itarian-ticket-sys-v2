import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import { State, useHookstate } from '@hookstate/core';

import {
  DividerComponent,
  FloatButton,
  GapView,
  Loader,
  SingleLineField,
} from '../../../../components';
import { DataItem as Item } from '../../../../types';
import { SelectItems } from '../../../../utils/helperFunctions';
import { deleteDepartment } from '../../utils/functions';
import { userStore } from '../../../../stores/userStore';
import { globalState } from '../../../../stores/globalAppState';

export default function Details() {
  const { colors, dark }: Theme = useTheme();
  const routes: any = useRoute();
  const navigation: any = useNavigation();
  const departmentDetails = routes?.params?.departmentDetails;
  const users: State<any> = useHookstate(userStore.users);
  const slaplans: State<any> = useHookstate(globalState.slaPlans);
  const [loader, setLoader] = useState(false);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'IsDefault',
      enable: true,
      rightSwitchVal: Boolean(departmentDetails?.attributes?.is_default),
      showRightSwitch: true,
    },
    {
      title: 'IsPublic',
      enable: true,
      rightSwitchVal: Boolean(departmentDetails?.attributes?.is_public),
      showRightSwitch: true,
    },
    {
      subTitle: 'name',
      title: departmentDetails?.attributes?.name ?? '',
      inputable: true,
      enable: false,
      isRequired: true,
    },
    {
      title:
        departmentDetails?.attributes?.mainstaff?.user_name ?? 'Please Select',
      subTitle: 'Manager',
      list:
        users.get()?.filter((value: any) => {
          return value?.role != 'user';
        }) || [],
      selectedItem: users
        .get()
        ?.filter(
          (value: any) =>
            value?.id == departmentDetails?.attributes?.mainstaff?.id,
        )[0],
      headerTitle: 'Member',
      rightIcon: 'chevron-right',
      isRequired: true,
    },
    {
      title: departmentDetails?.attributes?.slaplan?.name ?? 'Please Select',
      subTitle: 'Sla Plan',
      list:
        slaplans.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
          };
        }) || [],
      selectedItem: slaplans
        .get()
        ?.filter(
          (value: any) =>
            value?.id == departmentDetails?.attributes?.slaplan?.id,
        )[0],
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

  const updateSwitch = (index: number) => {
    let tempArr: Item[] = [...dataSource];
    tempArr[index].rightSwitchVal = !tempArr[index].rightSwitchVal;
    setDataSource(tempArr);
  };

  const renderList = ({ item, index }: { item: Item; index: number }) => {
    return (
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
            routes,
            'DepartmentDetails',
            'Stack1',
          )
        }
      />
    );
  };

  const deleteFunc = (id: number) => {
    setLoader(true);
    deleteDepartment(id)
      .then(res => {
        setLoader(false);
        if (res?.status) {
          navigation?.goBack();
        }
      })
      .catch(err => {
        console.log('delete teams failed', err);
        setLoader(false);
      });
  };

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (routes?.params?.item?.toString() && routes?.params?.item != 'GoneTo') {
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
      }),
    );
    Data[Data?.length] = {
      title: departmentDetails?.id,
      subTitle: 'id',
    };
    navigation?.setParams({
      ...routes?.params,
      data: Data,
    });
  }, [dataSource]);

  return (
    <View style={{ flex: 1 }}>
      <Loader isShow={loader} />
      <GapView />
      <FlatList
        data={dataSource}
        renderItem={renderList}
        ItemSeparatorComponent={DividerComponent}
      />
      {dataSource[1].title != 'Default' && (
        <FloatButton
          icon="delete"
          onPress={() => {
            Alert.alert(
              'Delete Department?',
              'Are you sure you want to delete this Department permanently?',
              [
                {
                  text: 'Yes',
                  style: 'default',
                  onPress: () => deleteFunc(departmentDetails?.id),
                },
                {
                  text: 'No',
                  style: 'cancel',
                  onPress: () => console.log('Pressed Cancel on Delete'),
                },
              ],
            );
          }}
        />
      )}
    </View>
  );
}
