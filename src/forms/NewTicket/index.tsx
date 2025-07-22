import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { useHookstate } from '@hookstate/core';
import DatePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { ModalView, SingleLineField } from '../../components';
import { DataItem as Item } from '../../types';
import { SelectItems } from '../../utils/helperFunctions';
import { globalState } from '../../stores/globalAppState';
import { userStore } from '../../stores/userStore';

export default function NewTicket({ route, navigation }: any) {
  const ticketPriorities: any = useHookstate(globalState?.ticketPriorities);
  const slaPlans: any = useHookstate(globalState?.slaPlans);
  const helpTopics: any = useHookstate(globalState?.helpTopics);
  const users: any = useHookstate(userStore?.users);

  const [showDate, setShowDate] = useState(false);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: '',
      subTitle: 'Subject',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'subject',
    },
    {
      title: '',
      subTitle: 'Details',
      inputable: true,
      enable: false,
      mode: 'texteditor',
      isRequired: true,
      key: 'detail',
    },
    {
      title: 'Please Select',
      subTitle: 'Due Date ',
      rightIcon: 'calendar',
      onPress: () => {
        setShowDate(true);
      },
      key: 'duedate',
    },
    {
      title: 'Please Select',
      subTitle: 'User',
      list: users?.get() ?? [],
      selectedItem: undefined,
      headerTitle: 'Member',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'user',
    },
    {
      title: 'Please Select',
      subTitle: 'Help Topic',
      list:
        helpTopics.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
          };
        }) || [],
      selectedItem: undefined,
      headerTitle: 'Parent Topic',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'helptopic',
    },
    {
      title: 'Please Select',
      subTitle: 'Staff',
      list: users.get()?.filter((val: any) => val?.role != "user") || [],
      selectedItem: undefined,
      headerTitle: 'Member',
      rightIcon: 'chevron-right',
      isRequired: false,
      key: 'staff',
    },
    {
      title: 'Please Select',
      subTitle: 'Sla Plan',
      list:
        slaPlans.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
          };
        }) || [],
      selectedItem: undefined,
      headerTitle: 'SLA Plan',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'slaplan',
    },
    {
      title: 'Please Select',
      subTitle: 'Ticket Priority',
      list: ticketPriorities.get() || [],
      selectedItem: undefined,
      headerTitle: 'Ticket Priority',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'ticketpriority',
    },
  ]);

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
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
        key: item?.key,
      }),
    );
    navigation?.setParams({
      ...route?.params,
      data: Data,
    });
  }, [dataSource]);

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);
    let time = date.toString().substring(16, 21);

    if (event?.type == 'set') {
      dataSource[2].title = date?.toDateString();
      setDataSource([...dataSource]);
    }
  };

  const updateInput = (e: string, index: number) => {
    let newData = [...dataSource];
    newData[index].title = e;
    setDataSource(newData);
  };

  return (
    <ModalView>
      {showDate &&
        (Platform.OS == 'android' ? (
          <DatePicker
            mode={'date'}
            display="calendar"
            value={new Date()}
            minimumDate={new Date()}
            onChange={onChangeDate}
            positiveButtonLabel={'Set Due Date'}
          />
        ) : (
          <DateTimePickerModal
            isVisible={showDate}
            mode="date"
            onConfirm={date => {
              dataSource[2].title = date?.toDateString();
              setDataSource([...dataSource]);
              setShowDate(false);
            }}
            onCancel={() => setShowDate(false)}
          />
        ))}
      <ScrollView>
        {dataSource?.map((value: Item, index: number) => (
          <SingleLineField
            key={index}
            title={value.title}
            subTitle={value.isRequired ? value.subTitle + '*' : value.subTitle}
            onChangeText={e => updateInput(e, index)}
            onPress={
              value?.onPress
                ? value.onPress
                : () =>
                    SelectItems(
                      value,
                      index,
                      navigation,
                      route,
                      'NewTicket',
                      'Stack1',
                    )
            }
            enable={value.enable}
            inputable={value.inputable}
            mode={value.mode}
            rightIcon={value.rightIcon}
            rightIconRound={value.rightIconRound}
            roundedIconEnable={value.roundedIconEnable}
            onRoundedIconPress={value.onRoundIconPress}
            leftIcon={value.leftIcon}
          />
        ))}
      </ScrollView>
    </ModalView>
  );
}

const styles = StyleSheet.create({});
