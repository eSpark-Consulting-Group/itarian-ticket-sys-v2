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
import { deleteSlaPlan } from '../../utils/functions';
import { GracePeriodList } from '../../../../constants/SelectionList';

export default function Details() {
  const { colors, dark }: Theme = useTheme();
  const routes: any = useRoute();
  const navigation: any = useNavigation();
  const teamDetails = routes?.params?.teamDetails;
  const [loader, setLoader] = useState(false);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'Status',
      enable: true,
      rightSwitchVal: Boolean(teamDetails?.attributes?.status),
      showRightSwitch: true,
    },
    {
      subTitle: 'name',
      title: teamDetails?.attributes?.name ?? '',
      inputable: true,
      enable: false,
      isRequired: true,
    },
    {
      title: teamDetails?.attributes?.grace_period ?? 'Please Select',
      subTitle: 'Grace Period',
      list: GracePeriodList || [],
      selectedItem: GracePeriodList?.filter(
        value => value?.name == teamDetails?.attributes?.grace_period,
      )[0],
      headerTitle: 'Parent Topic',
      rightIcon: 'chevron-right',
      isRequired: false,
      key: 'grace_period',
    },
    {
      title: teamDetails?.attributes?.admin_note ?? '',
      subTitle: 'admin note',
      inputable: true,
      enable: false,
      isRequired: true,
      mode: 'multiline',
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
            'SlaPlanDetails',
            'Stack1',
          )
        }
      />
    );
  };

  const deleteTeamFunc = (id: number) => {
    setLoader(true);
    deleteSlaPlan(id)
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
        key: item?.key,
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

  console.log('grace_period grace_period', teamDetails?.attributes);

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
              'Delete Sla Plan?',
              'Are you sure you want to delete this Sla Plan permanently?',
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
      )}
    </View>
  );
}
