import React, { useEffect, useState } from 'react';
import { View, FlatList, KeyboardTypeOptions, Alert, Text } from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Divider } from 'react-native-paper';

import {
  CstmColorPicker,
  FloatButton,
  GapView,
  Loader,
  SingleLineField,
} from '../../../../components';
import { SelectFields, DataItem as Item } from '../../../../types';
import { SelectItems } from '../../../../utils/helperFunctions';
import { deletePriorities } from '../../utils/functions';

export default function Details() {
  const { colors, dark }: Theme = useTheme();
  const routes: any = useRoute();
  const navigation: any = useNavigation();
  const ticketPriorityDetails = routes?.params?.ticketPriorityDetails;
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currIndex, setCurrIndex] = useState<number | undefined>();
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'Status',
      enable: true,
      rightSwitchVal: Boolean(ticketPriorityDetails?.attributes?.status),
      showRightSwitch: true,
    },
    {
      title: 'IsPublic',
      enable: true,
      rightSwitchVal: Boolean(ticketPriorityDetails?.attributes?.is_public),
      showRightSwitch: true,
    },
    {
      subTitle: 'name',
      title: ticketPriorityDetails?.attributes?.name ?? '',
      inputable: true,
      enable: false,
      isRequired: true,
    },
    {
      title: ticketPriorityDetails?.attributes?.color ?? '',
      subTitle: 'color',
      inputable: false,
      enable: true,
      isRequired: false,
      modal: true,
      leftChild: (
        <View
          style={{
            zIndex: 100,
            backgroundColor: ticketPriorityDetails?.attributes?.color ?? '',
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
    },
    {
      title: ticketPriorityDetails?.attributes?.description ?? '',
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
        leftChild={item.leftChild}
        rightIcon={item.rightIcon}
        showRightSwitch={item.showRightSwitch}
        rightSwitchVal={item.rightSwitchVal}
        onChangeSwitch={() => updateSwitch(index)}
        keyboardType={item?.keyboardType}
        mode={item?.mode}
        onPress={(): void => {
          if (item?.key == 'color') {
            item.onPress?.();
            setCurrIndex(index);
          }
          SelectItems(item, index, navigation, routes, 'TeamDetails', 'Stack1');
        }}
      />
    );
  };

  const deleteFunc = (id: number) => {
    setLoader(true);
    deletePriorities(id)
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
      title: ticketPriorityDetails?.id,
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
      <CstmColorPicker
        onClose={() => setVisible(false)}
        color={ticketPriorityDetails?.attributes?.color ?? '#ffffff'}
        visible={visible}
        updateColor={color => updateColor(color, currIndex)}
      />
      <FlatList
        data={dataSource}
        renderItem={renderList}
        ItemSeparatorComponent={() => (
          <Divider
            style={{ backgroundColor: colors.background, height: 1.5 }}
          />
        )}
      />
      {dataSource[1].title != 'Default' && (
        <FloatButton
          icon="delete"
          onPress={() => {
            Alert.alert(
              'Delete Ticket Priority?',
              'Are you sure you want to delete this Ticket Priority permanently?',
              [
                {
                  text: 'Yes',
                  style: 'default',
                  onPress: () => deleteFunc(ticketPriorityDetails?.id),
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
