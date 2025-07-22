import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';

import { SingleLineField } from '../../components';
import { contactsList } from '../../constants/SampleArrays';
import { whereList } from '../../constants/SelectionList';
import { SelectFields } from '../../types';
import { SelectItems } from '../../utils/helperFunctions';

interface Item {
  headerTitle?: string;
  title: string;
  subTitle?: string;
  enable?: boolean;
  rightIcon?: string;
  titleWidth?: number;
  list?: SelectFields[];
  selectedItem?: SelectFields;
  leftIcon?: string;
  searchable?: boolean;
  onPress?: () => void;
  showRightSwitch?: boolean;
  rightSwitchVal?: boolean;
  isRequired?: boolean;
}

type Mode = 'date' | 'time';
type PickerType = 'sd' | 'ed' | 'st' | 'et';

export const AddResource = ({ navigation, route }: any) => {
  const [showDate, setShowDate] = useState(false);
  const [mode, setMode] = useState<Mode>('date');
  const [pickerType, setpickerType] = useState<PickerType>('sd');
  const [dataSource, setDataSource] = useState<Item[]>([
    { title: 'Mark as Done', showRightSwitch: true, rightSwitchVal: true },
    {
      title: contactsList[0].name,
      subTitle: 'Member',
      leftIcon: 'clipboard-text-outline',
      rightIcon: 'chevron-right',
      headerTitle: 'Member Name',
      list: contactsList,
      selectedItem: contactsList[0],
      searchable: true,
    },
    {
      title: 'Please Select',
      subTitle: 'Where',
      leftIcon: 'clipboard-text-outline',
      rightIcon: 'chevron-right',
      headerTitle: 'Where',
      list: whereList,
      selectedItem: whereList[0],
      searchable: true,
      isRequired: true,
    },
    {
      title: 'Please Select',
      subTitle: 'Start Date',
      rightIcon: 'calendar',
      onPress: () => {
        setMode('date');
        setpickerType('sd');
        setShowDate(true);
      },
    },
    {
      title: 'Please Select',
      subTitle: 'End Date',
      rightIcon: 'calendar',
      onPress: () => {
        setMode('date');
        setpickerType('ed');
        setShowDate(true);
      },
    },
    {
      title: 'Please Select',
      subTitle: 'Start Time ',
      rightIcon: 'clock',
      onPress: () => {
        setMode('time');
        setpickerType('st');
        setShowDate(true);
      },
    },
    {
      title: 'Please Select',
      subTitle: 'End Time ',
      rightIcon: 'clock',
      onPress: () => {
        setMode('time');
        setpickerType('et');
        setShowDate(true);
      },
    },
  ]);

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);
    let time = date.toString().substring(16, 21);

    if (event?.type == 'set') {
      switch (pickerType) {
        case 'sd':
          dataSource[3].title = date?.toDateString();
          setDataSource([...dataSource]);
          break;
        case 'ed':
          dataSource[4].title = date?.toDateString();
          setDataSource([...dataSource]);
          break;
        case 'st':
          dataSource[5].title = time;
          setDataSource([...dataSource]);
          break;
        case 'et':
          dataSource[6].title = time;
          setDataSource([...dataSource]);
        default:
          break;
      }
    }
  };

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
      }),
    );
    navigation?.setParams({
      ...route?.params,
      data: Data,
    });
  }, [dataSource]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ alignItems: 'center' }}>
      {showDate && (
        <DatePicker
          mode={mode}
          value={new Date()}
          minimumDate={new Date()}
          onChange={onChangeDate}
          themeVariant="dark"
          positiveButtonLabel={
            pickerType == 'sd'
              ? 'Start Date'
              : pickerType == 'st'
              ? 'Start Time'
              : pickerType == 'et'
              ? 'End Time'
              : 'End Date'
          }
        />
      )}

      {dataSource.map((item: Item, index: number) => (
        <SingleLineField
          key={index}
          subTitle={item.isRequired ? item.subTitle + '*' : item.subTitle}
          title={item.title}
          enable={item.enable}
          titleWidth={item.titleWidth}
          rightIcon={item.rightIcon}
          onPress={
            item?.onPress
              ? item.onPress
              : () =>
                  SelectItems(
                    item,
                    index,
                    navigation,
                    route,
                    'AddResource',
                    'Stack2',
                  )
          }
          showRightSwitch={item.showRightSwitch}
          rightSwitchVal={item.rightSwitchVal}
        />
      ))}
    </ScrollView>
  );
};
