import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardTypeOptions,
  Alert,
} from 'react-native';
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
import { userStore } from '../../../../stores/userStore';
import { SelectItems } from '../../../../utils/helperFunctions';
import { deleteTeams } from '../../utils/functions';

export default function Details() {
  const { colors, dark }: Theme = useTheme();
  const routes: any = useRoute();
  const navigation: any = useNavigation();
  const teamDetails = routes?.params?.teamDetails;
  const users: State<any> = useHookstate(userStore.users);
  const [loader, setLoader] = useState(false);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'Status',
      enable: true,
      rightSwitchVal: Boolean(teamDetails?.attributes?.status),
      showRightSwitch: true,
    },
    {
      subTitle: 'Team Name',
      title: teamDetails?.attributes?.name ?? '',
      inputable: true,
      enable: false,
      isRequired: true,
    },
    {
      title: teamDetails?.attributes?.teamlead?.user_name ?? 'Please Select',
      subTitle: 'Team Lead',
      list:
        users.get()?.filter((value: any) => {
          return value?.role != 'user';
        }) || [],
      selectedItem: users
        .get()
        ?.filter(
          (value: any) => value?.id == teamDetails?.attributes?.teamlead?.id,
        )[0],
      headerTitle: 'Member',
      rightIcon: 'chevron-right',
      isRequired: true,
    },
    {
      title: teamDetails?.attributes?.admin_notes ?? '',
      subTitle: 'Admin Notes',
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
          SelectItems(item, index, navigation, routes, 'TeamDetails', 'Stack1')
        }
      />
    );
  };

  const deleteTeamFunc = (id: number) => {
    setLoader(true);
    deleteTeams(id)
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
      title: teamDetails?.id,
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
      <FloatButton
        icon="delete"
        onPress={() => {
          Alert.alert(
            'Delete Team?',
            'Are you sure you want to delete this Team permanently',
            [
              {
                text: 'Yes',
                style: 'default',
                onPress: () => deleteTeamFunc(teamDetails?.id),
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
    </View>
  );
}

const styles = StyleSheet.create({});
