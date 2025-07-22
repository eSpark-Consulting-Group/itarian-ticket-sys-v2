import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTheme, Theme } from '@react-navigation/native';
import { State, useHookstate } from '@hookstate/core';
import { Switch } from 'react-native-paper';
import DatePicker from '@react-native-community/datetimepicker';

import { GapView, ModalView, SingleLineField } from '../../../../components';
import { userStore } from '../../../../stores/userStore';

const MyStatus = ({ route, navigation }: any) => {
  const currStatus: State<boolean> = useHookstate(userStore.currentStatus);
  const currGonTo: State<any> = useHookstate(userStore.currentGoneTo);
  const addInf: State<string> = useHookstate(userStore.additionalInfo);
  const backDate: State<string> = useHookstate(userStore.dateBack);
  const backTime: State<string> = useHookstate(userStore.timeBack);

  const { colors }: Theme = useTheme();

  const [goneTo, setGoneTo] = useState<any>(null);
  const [goneToStatus, setGoneToStatus] = useState<any>(currStatus.get());
  const [showDate, setShowDate] = useState(false);
  const [currDate, setCurrDate] = useState(backDate.get());
  const [currTime, setCurrTime] = useState(backTime.get());
  const [addInfo, setAddInfo] = useState(addInf.get());

  const [mode, setMode] = useState<Mode>('date');
  const [pickerType, setpickerType] = useState<PickerType>('db');

  type Mode = 'date' | 'time';
  type PickerType = 'db' | 'tb';

  useEffect(() => {
    if (route?.params?.item) {
      if (route?.params?.selected) {
        setGoneTo(route?.params?.selected);
      } else {
        setGoneTo(currGonTo.get());
      }
    }
  }, [route?.params]);

  useEffect(() => {
    if (route?.params?.selected) {
      setGoneTo(route?.params?.selected);
    } else {
      setGoneTo(currGonTo.get());
    }
  }, []);

  useEffect(() => {
    navigation?.setParams({
      ...route?.params,
      status: goneToStatus,
      goneTo: goneTo,
      addInfo: addInfo,
      backDate: currDate,
      backTime: currTime,
    });
  }, [goneTo, addInfo, goneToStatus, currDate, currTime]);

  const changeSwitch = () => {
    setGoneToStatus(!goneToStatus);
    setAddInfo('');
    setCurrDate('-');
    setCurrTime('-');
  };

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);
    let time = date.toString().substring(16, 21);

    if (event?.type == 'set') {
      switch (pickerType) {
        case 'db':
          setCurrDate(date?.toDateString());
          break;
        case 'tb':
          setCurrTime(time);
          break;
        default:
          break;
      }
    }
  };

  return (
    <ModalView>
      <SingleLineField
        title="Are you out of office"
        onPress={changeSwitch}
        rightChild={
          <Switch
            value={goneToStatus}
            style={{ marginRight: 5 }}
            color={colors.primary}
            thumbColor={colors.primary}
            onValueChange={changeSwitch}
            trackColor={{ true: '#5b57578f', false: '#5b57578f' }}
          />
        }
      />
      
      {showDate && (
        <DatePicker
          mode={mode}
          value={new Date()}
          minimumDate={new Date()}
          onChange={onChangeDate}
          positiveButtonLabel={
            pickerType == 'db' ? 'Set Date Back' : 'Set Time Back'
          }
        />
      )}
    </ModalView>
  );
};

export default MyStatus;
