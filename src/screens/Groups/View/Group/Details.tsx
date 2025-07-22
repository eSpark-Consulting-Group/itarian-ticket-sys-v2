import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Divider } from 'react-native-paper';

import {
  DividerComponent,
  FloatButton,
  GapView,
  Loader,
  SingleLineField,
} from '../../../../components';
import { DataItem as Item } from '../../../../types';
import { SelectItems } from '../../../../utils/helperFunctions';
import { deleteGroup } from '../../utils/functions';

export default function Details() {
  const { colors, dark }: Theme = useTheme();
  const routes: any = useRoute();
  const navigation: any = useNavigation();
  const groupDetails = routes?.params?.groupDetails;
  const [loader, setLoader] = useState(false);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: groupDetails?.attributes?.name ?? '',
      subTitle: 'Name',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'name',
    },
    {
      title: 'Status',
      enable: false,
      rightSwitchVal: Boolean(groupDetails?.attributes?.status),
      showRightSwitch: true,
      key: 'status',
    },
    {
      title: 'Can Create Ticket',
      enable: false,
      rightSwitchVal: Boolean(groupDetails?.attributes?.can_create_ticket),
      showRightSwitch: true,
      key: 'can_create_ticket',
    },
    {
      title: 'Can Edit Ticket',
      enable: false,
      rightSwitchVal: Boolean(groupDetails?.attributes?.can_edit_ticket),
      showRightSwitch: true,
      key: 'can_edit_ticket',
    },
    {
      title: 'Can Post Ticket',
      enable: false,
      rightSwitchVal: Boolean(groupDetails?.attributes?.can_post_ticket),
      showRightSwitch: true,
      key: 'can_post_ticket',
    },
    {
      title: 'Can Close Ticket',
      enable: false,
      rightSwitchVal: Boolean(groupDetails?.attributes?.can_close_ticket),
      showRightSwitch: true,
      key: 'can_close_ticket',
    },
    {
      title: 'Can Assign Ticket',
      enable: false,
      rightSwitchVal: Boolean(groupDetails?.attributes?.can_assign_ticket),
      showRightSwitch: true,
      key: 'can_assign_ticket',
    },
    {
      title: 'Can Delete Ticket',
      enable: false,
      rightSwitchVal: Boolean(groupDetails?.attributes?.can_delete_ticket),
      showRightSwitch: true,
      key: 'can_delete_ticket',
    },
    {
      title: 'Can Ban Email',
      enable: false,
      rightSwitchVal: Boolean(groupDetails?.attributes?.can_ban_email),
      showRightSwitch: true,
      key: 'can_ban_email',
    },
    {
      title: 'Can Fork Ticket',
      enable: false,
      rightSwitchVal: Boolean(groupDetails?.attributes?.can_fork_ticket),
      showRightSwitch: true,
      key: 'can_fork_ticket',
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

  const deleteFunc = (id: number) => {
    setLoader(true);
    deleteGroup(id)
      .then(res => {
        setLoader(false);
        if (res?.status) {
          navigation?.goBack();
        }
      })
      .catch(err => {
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
        key: item?.key,
      }),
    );
    Data[Data?.length] = {
      title: groupDetails?.id,
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
        contentContainerStyle={{ paddingBottom: 80 }}
        data={dataSource}
        renderItem={renderList}
        ItemSeparatorComponent={DividerComponent}
      />
      {dataSource[1].title != 'Default' && (
        <FloatButton
          icon="delete"
          onPress={() => {
            Alert.alert(
              'Delete Group?',
              'Are you sure you want to delete this Group permanently?',
              [
                {
                  text: 'Yes',
                  style: 'default',
                  onPress: () => deleteFunc(groupDetails?.id),
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
