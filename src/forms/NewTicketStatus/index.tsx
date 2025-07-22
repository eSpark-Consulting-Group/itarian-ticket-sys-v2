import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardTypeOptions, Text } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { State, useHookstate } from '@hookstate/core';

import { CstmColorPicker, ModalView, SingleLineField } from '../../components';
import { SelectFields } from '../../types';
import { SelectItems } from '../../utils/helperFunctions';
import { userStore } from '../../stores/userStore';
import { PosList } from '../../constants/SelectionList';
import { globalState } from '../../stores/globalAppState';

interface StatusProps {
  attributes: StatusAttributes;
  id: string;
  links: {
    self: string;
  };
  type: string;
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
  onPress?: () => void;
  list?: SelectFields[];
  selectedItem?: SelectFields;
  searchable?: boolean;
  headerTitle?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  isRequired?: boolean;
  mode?: 'none' | 'multiline';
  key?: string;
  modal?: boolean;
  leftChild?: Element;
}

const NewTicketStatus = ({ route, navigation }: any) => {
  const { colors, dark }: Theme = useTheme();
  const users: State<any> = useHookstate(userStore.users);
  const [visible, setVisible] = useState(false);
  const ticketstatusicons: any = useHookstate(globalState.ticketstatusicons);
  const transformedIcons: any = ticketstatusicons
    .get()
    .map(({ code, name }: { code: string; name: string }, index: number) => ({
      id: index + 1,
      name: code,
      code: name,
    }));
  const [currIndex, setCurrIndex] = useState<number | undefined>();
  const reshapedStatusList = route?.params?.statusList.map(
    (item: StatusProps): { id: string; name: string } => ({
      id: item?.id,
      name: item?.attributes?.name,
    }),
  );

  const [dataSource, setDataSource] = useState<Item[]>([
    {
      subTitle: 'Name',
      title: '',
      enable: false,
      isRequired: true,
      inputable: true,
    },
    {
      subTitle: 'Display Order',
      title: '',
      enable: false,
      isRequired: true,
      inputable: true,
      keyboardType: 'decimal-pad',
    },
    {
      subTitle: 'Icon Class',
      title: 'Please Select',
      list: transformedIcons ?? [],
      selectedItem: undefined,
      leftChild: undefined,
      headerTitle: 'Icon Class',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'icon_class',
    },
    {
      subTitle: 'color',
      title: '#ffffff',
      inputable: false,
      enable: true,
      isRequired: true,
      modal: true,
      leftChild: (
        <View
          style={{
            zIndex: 100,
            backgroundColor: '#ffffff',
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
      title: 'Allow Client',
      enable: true,
      rightSwitchVal: false,
      showRightSwitch: true,
    },
    {
      title: 'Comment',
      enable: true,
      rightSwitchVal: false,
      showRightSwitch: true,
    },
    {
      title: 'Visibility to Client',
      enable: true,
      rightSwitchVal: false,
      showRightSwitch: true,
      key: 'vtc',
    },
    {
      subTitle: 'Purpose of Status',
      title: 'Please Select',
      list: PosList ?? [],
      selectedItem: undefined,
      headerTitle: 'Purpose of Status',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'pos',
    },
    {
      subTitle: 'Status to Display',
      title: 'Please Select',
      list: reshapedStatusList ?? [],
      selectedItem: undefined,
      headerTitle: 'Status to Display',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'std',
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

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      obj[route?.params?.item].leftChild = (
        <View>
          <Text
            style={{
              fontFamily: 'FontAwesome',
              color: colors.text,
              fontSize: 18,
              textAlignVertical: 'center',
            }}>
            {String.fromCharCode(
              parseInt(
                route?.params?.selected?.code
                  .replace('&#x', '')
                  .replace(';', ''),
                16,
              ),
            )}
          </Text>
        </View>
      );
      setDataSource([...obj]);
      console.log(
        'objxxx',
        (obj[route?.params?.item].selectedItem = route?.params?.selected),
      );
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
      <ScrollView style={{ flex: 1 }}>
        <View style={{ backgroundColor: colors.background }}>
          <CstmColorPicker
            onClose={() => setVisible(false)}
            color={dataSource[3]?.title}
            visible={visible}
            updateColor={color => updateColor(color, currIndex)}
          />
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
              leftChild={item.leftChild}
              showRightSwitch={item.showRightSwitch}
              rightSwitchVal={item.rightSwitchVal}
              onChangeSwitch={() => updateSwitch(index)}
              keyboardType={item?.keyboardType}
              mode={item?.mode}
              onPress={() => {
                if (item?.key == 'color') {
                  item.onPress?.();
                  setCurrIndex(index);
                }
                SelectItems(
                  item,
                  index,
                  navigation,
                  route,
                  'NewTicketStatus',
                  'Stack1',
                );
              }}
            />
          ))}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewTicketStatus;
