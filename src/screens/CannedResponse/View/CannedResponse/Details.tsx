import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Alert,
} from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {DividerComponent, FloatButton, GapView, Loader, SingleLineField} from '../../../../components';
import {DataItem as Item} from '../../../../types';
import {SelectItems} from '../../../../utils/helperFunctions';
import { deleteCannedResponse } from '../../utils/functions';

export default function Details() {
  const routes: any = useRoute();
  const navigation: any = useNavigation();
  const cannedResponseDetails = routes?.params?.cannedResponseDetails;
  const [loader, setLoader] = useState(false)
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: cannedResponseDetails?.attributes?.title ?? '',
      subTitle: 'Title',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'title',
    },
    {
      title: cannedResponseDetails?.attributes?.message ?? '',
      subTitle: 'Message',
      inputable: true,
      enable: false,
      isRequired: true,
      mode: 'texteditor',
      key: 'message',
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

  const renderList = ({item, index}: {item: Item; index: number}) => {
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
    setLoader(true)
    deleteCannedResponse(id)
    .then(res => {
      setLoader(false)
      if(res?.status) {
        navigation?.goBack()
      }
    })
    .catch((err) => {
      setLoader(false)
    })
  
  }

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
        key: item?.key
      }),
    );
    Data[Data?.length] = {
      title: cannedResponseDetails?.id,
      subTitle: "id",
    }
    navigation?.setParams({
      ...routes?.params,
      data: Data,
    });
  }, [dataSource]);

  return (
    <View style={{flex: 1}}>
      <Loader isShow={loader} />
      <GapView />
      <FlatList
        data={dataSource}
        renderItem={renderList}
        ItemSeparatorComponent={DividerComponent}
      />
      {dataSource[1].title != "Default" &&
      <FloatButton icon='delete' onPress={() => {
          Alert.alert(
            'Delete CannedResponse?',
            'Are you sure you want to delete this CannedResponse permanently?',
            [
              {
                text: 'Yes',
                style: 'default',
                onPress: () => deleteFunc(cannedResponseDetails?.id),
              },
              {
                text: 'No',
                style: 'cancel',
                onPress: () => console.log('Pressed Cancel on Delete'),
              },
            ],
          );
      }}/> }
    </View>
  );
}
