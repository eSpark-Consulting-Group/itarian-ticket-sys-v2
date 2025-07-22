import React, { useEffect, useState } from 'react';
import { View, FlatList, KeyboardTypeOptions, Alert, Text, Platform } from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useHookstate } from '@hookstate/core';
import FA from 'react-native-vector-icons/FontAwesome';

import {
  CstmColorPicker,
  DividerComponent,
  FloatButton,
  GapView,
  Loader,
  SingleLineField,
} from '../../../components';
import { SelectFields } from '../../../types';
import { SelectItems } from '../../../utils/helperFunctions';
import { deleteStatus } from '../utils/functions';
import { PosList } from '../../../constants/SelectionList';
import { globalState } from '../../../stores/globalAppState';

interface Item {
  title: string;
  subTitle?: string;
  inputable?: boolean;
  enable?: boolean;
  rightIcon?: string;
  rightIconRound?: string;
  titleWidth?: number;
  showRightSwitch?: boolean;
  rightSwitchVal?: boolean;
  onChangeSwitch?: (value: boolean) => void;
  onChangeText?: (text: string) => void;
  list?: SelectFields[];
  selectedItem?: SelectFields;
  searchable?: boolean;
  headerTitle?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  isRequired?: boolean;
  mode?: 'none' | 'multiline';
  onPress?: () => void;
  key?: string;
  modal?: boolean;
  leftChild?: Element;
}

interface StatusAttributes {
  client_selectable: boolean;
  color: string;
  comment_required: boolean;
  created_at: string;
  icon_class: string;
  name: string;
  sort: number;
  state: string;
  status_display: string;
  updated_at: string;
  visible_to_client: boolean;
}
interface StatusProps {
  attributes: StatusAttributes;
  id: string;
  links: {
    self: string;
  };
  type: string;
}

export default function Details() {
  const { colors, dark }: Theme = useTheme();
  const routes: any = useRoute();
  const navigation: any = useNavigation();
  const { ticketStatusDetails, statusList } = routes?.params;
  const ticketstatusicons: any = useHookstate(globalState.ticketstatusicons);
  const transformedIcons: any = ticketstatusicons
    .get()
    .map(({ code, name }: { code: string; name: string }, index: number) => ({
      id: index + 1,
      name: code,
      code: name,
    }));
  const extractFont: string = transformedIcons
    ?.find(
      (value: any) =>
        value?.name == ticketStatusDetails?.attributes?.icon_class,
    )
    .code.replace('&#x', '')
    .replace(';', '');
  const [visible, setVisible] = useState(false);
  const [currIndex, setCurrIndex] = useState<number | undefined>();
  const [loader, setLoader] = useState(false);
  console.log('aha', ticketStatusDetails?.attributes);
  const reshapedStatusList = statusList.map(
    (item: StatusProps): { id: string; name: string } => ({
      id: item?.id,
      name: item?.attributes?.name,
    }),
  );

  const [dataSource, setDataSource] = useState<Item[]>([
    {
      subTitle: 'Name',
      title: ticketStatusDetails?.attributes?.name ?? '',
      enable: false,
      isRequired: true,
      inputable: true,
    },
    {
      subTitle: 'Display Order',
      title: ticketStatusDetails?.attributes?.sort.toString() ?? '',
      enable: false,
      isRequired: true,
      inputable: true,
      keyboardType: 'decimal-pad',
    },
    {
      subTitle: 'Icon Class',
      title: ticketStatusDetails?.attributes?.icon_class ?? 'Please Select',
      list: transformedIcons ?? [],
      selectedItem: transformedIcons?.find(
        (value: any) =>
          value?.name == ticketStatusDetails?.attributes?.icon_class,
      ),
      leftChild: (
        <View>
          <Text
            style={{
              fontFamily: Platform.OS == "android" ? 'fontyawesome' : 'FontAwesome',
              color: colors.text,
              fontSize: 18,
              textAlignVertical: 'center',
            }}>
            {String.fromCharCode(parseInt(extractFont, 16))}
          </Text>
        </View>
      ),
      headerTitle: 'Icon Class',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'icon_class',
    },
    {
      subTitle: 'color',
      title: ticketStatusDetails?.attributes?.color ?? '',
      inputable: false,
      enable: true,
      isRequired: true,
      modal: true,
      leftChild: (
        <View
          style={{
            zIndex: 100,
            backgroundColor: ticketStatusDetails?.attributes?.color ?? '',
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
      onPress: (): void => {
        setVisible(true);
      },
    },
    {
      title: 'Allow Client',
      enable: true,
      rightSwitchVal: Boolean(
        ticketStatusDetails?.attributes?.client_selectable,
      ),
      showRightSwitch: true,
      // isRequired: true,
    },
    {
      title: 'Comment',
      enable: true,
      rightSwitchVal: Boolean(
        ticketStatusDetails?.attributes?.comment_required,
      ),
      showRightSwitch: true,
      // isRequired: true,
    },
    {
      title: 'Visibility to Client',
      enable: true,
      rightSwitchVal: Boolean(
        ticketStatusDetails?.attributes?.visible_to_client,
      ),
      showRightSwitch: true,
      // isRequired: true,
      key: 'vtc',
    },
    {
      subTitle: 'Purpose of Status',
      title: ticketStatusDetails?.attributes?.state ?? 'Please Select',
      list: PosList ?? [],
      selectedItem: PosList?.find(
        value => value?.name == ticketStatusDetails?.attributes?.state,
      ),
      headerTitle: 'Purpose of Status',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'pos',
    },
    {
      subTitle: 'Status to Display',
      title: ticketStatusDetails?.attributes?.status_display ?? 'Please Select',
      list: reshapedStatusList ?? [],
      selectedItem: reshapedStatusList?.find(
        (value: { name: string; id: string }): boolean =>
          value?.name == ticketStatusDetails?.attributes?.status_display,
      ),
      headerTitle: 'Status to Display',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'std',
    },
  ]);

  console.log('Show me the Data for Ticket Status?', statusList);

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
        rightIcon={item.rightIcon}
        showRightSwitch={item.showRightSwitch}
        rightSwitchVal={item.rightSwitchVal}
        onChangeSwitch={() => updateSwitch(index)}
        leftChild={item.leftChild}
        keyboardType={item?.keyboardType}
        mode={item?.mode}
        onPress={() => {
          if (item?.key == 'color') {
            item.onPress?.();
            setCurrIndex(index);
          }
          console.log('item.list', item.list, routes);
          SelectItems(
            item,
            index,
            navigation,
            routes,
            'TicketStatusDetails',
            'Stack1',
          );
        }}
      />
    );
  };

  const deleteFunc = (id: number) => {
    setLoader(true);
    deleteStatus(id)
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
      obj[routes?.params?.item].leftChild = (
        <View>
          <Text
            style={{
              fontFamily: Platform.OS === 'android' ? 'fontyawesome' : 'FontAwesome',
              color: colors.text,
              fontSize: 18,
              textAlignVertical: 'center',
            }}>
            {String.fromCharCode(
              parseInt(
                routes?.params?.selected?.code
                  .replace('&#x', '')
                  .replace(';', ''),
                16,
              ),
            )}
          </Text>
        </View>
      );
      setDataSource([...obj]);
    }
  }, [routes?.params?.selected]);

  //* This is used to update Params for saving updated item from header functions

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
      title: ticketStatusDetails?.id,
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
        color={dataSource[3].title}
        visible={visible}
        updateColor={color => updateColor(color, currIndex)}
      />
      <FlatList
        data={dataSource}
        renderItem={renderList}
        ItemSeparatorComponent={DividerComponent}
      />
      {ticketStatusDetails?.id > 8 && (
        <FloatButton
          icon="delete"
          onPress={() => {
            Alert.alert(
              'Delete Ticket Status?',
              'Are you sure you want to delete this Ticket Status permanently?',
              [
                {
                  text: 'Yes',
                  style: 'default',
                  onPress: () => deleteFunc(ticketStatusDetails?.id),
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
