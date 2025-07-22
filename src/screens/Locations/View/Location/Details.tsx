import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useHookstate } from '@hookstate/core';

import {
  DividerComponent,
  FloatButton,
  GapView,
  Loader,
  SingleLineField,
} from '../../../../components';
import { DataItem as Item } from '../../../../types';
import { SelectItems } from '../../../../utils/helperFunctions';
import { deleteLocation, getStates } from '../../utils/functions';
import { globalState } from '../../../../stores/globalAppState';

export default function Details() {
  const routes: any = useRoute();
  const navigation: any = useNavigation();
  const locationDetails = routes?.params?.locationDetails;
  const [loader, setLoader] = useState(false);

  const countries: any = useHookstate(globalState?.countries).get();
  const states: any = useHookstate(globalState?.states)?.get();

  const [dataSource, setDataSource] = useState<Item[]>([
    {
      subTitle: 'title',
      title: locationDetails?.attributes?.title,
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'title',
    },
    {
      title: locationDetails?.attributes?.country ?? 'Please Select',
      subTitle: 'Country',
      list: countries || [],
      selectedItem: countries?.find(
        (value: any) => value?.name == locationDetails?.attributes?.country,
      ),
      enable: true,
      isRequired: true,
      searchable: true,
      rightIcon: 'chevron-right',
      headerTitle: 'Countries',
      key: 'country',
    },
    {
      title: locationDetails?.attributes?.state ?? 'Please Select',
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
      title: locationDetails?.attributes?.phone,
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'phone',
    },
    {
      subTitle: 'city',
      title: locationDetails?.attributes?.city,
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'city',
    },
    {
      subTitle: 'pin_code',
      title: locationDetails?.attributes?.pin_code,
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'pin_code',
    },
    {
      subTitle: 'address',
      title: locationDetails?.attributes?.address,
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'address',
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
            'LocationDetails',
            'Stack1',
          )
        }
      />
    );
  };

  const deleteFunc = (id: number) => {
    setLoader(true);
    deleteLocation(id)
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

      if (routes?.params?.item == 1) {
        setLoader(true);
        getStates(routes?.params?.selected?.name).then((res: any) => {
          obj[routes?.params?.item + 1].selectedItem = undefined;
          obj[routes?.params?.item + 1].title = 'Please Select';
          obj[routes?.params?.item + 1].list = res;
          setDataSource([...obj]);
          setLoader(false);
        });
      } else {
        setDataSource([...obj]);
      }
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
      title: locationDetails?.id,
      subTitle: 'id',
    };
    navigation?.setParams({
      ...routes?.params,
      data: Data,
    });
  }, [dataSource]);

  useEffect(() => {
    const obj: any = [...dataSource];
    getStates(locationDetails?.attributes?.country).then((res: any) => {
      const selected = res?.find(
        (value: any) => value?.name == locationDetails?.attributes?.state,
      );
      obj[2].selectedItem = selected;
      obj[2].title = selected?.name ?? 'Please Select';
      obj[2].list = res;
      setDataSource([...obj]);
      setLoader(false);
    });
  }, [locationDetails]);

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
              'Delete Location?',
              'Are you sure you want to delete this Location permanently?',
              [
                {
                  text: 'Yes',
                  style: 'default',
                  onPress: () => deleteFunc(locationDetails?.id),
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
