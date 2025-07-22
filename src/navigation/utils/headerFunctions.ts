//Function for My Status screen header's right button
import { showMessage, hideMessage } from 'react-native-flash-message';

import Images from '../../assets/Images';
import { noteList } from '../../constants/SampleArrays';
import { globalState } from '../../stores/globalAppState';
import { alert_Dur } from '../../constants';
import { showMessageSafe } from '../../utils/helperFunctions';

const saveStatus = (navigation: any, route: any, globalStates: any) => {
  console.log('route.params', route?.params);
  if (route.params?.status && route.params?.backDate == '-') {
    showMessageSafe({
      message: 'Please select Date Back',
      type: 'warning',
      icon: 'warning',
      duration: alert_Dur,
    });
  } else {
    showMessageSafe({
      message: 'Status Updated Successfully',
      type: 'success',
      icon: 'auto',
      duration: alert_Dur,
    });
    globalStates?.currentStatus.set(route.params?.status);
    globalStates?.currentGoneTo.set({ ...route.params?.goneTo });
    globalStates?.additionalInfo.set(route.params?.addInfo);
    globalStates?.dateBack.set(route.params?.backDate);
    globalStates?.timeBack.set(route.params?.backTime);
    navigation.navigate({
      name: 'Profile',
      params: { status: route.params.status },
      merge: true,
    });
  }
};

//Function for Gone To Screen header's left button

const goBack = (navigation: any) => {
  navigation.goBack();
};

// Function for Save ItemSelector Value
const onSave = (navigation: any, route: any, globalStates?: any) => {
  if (route?.params?.notes) {
    const currDate = new Date();
    console.log('yeh Chala?', currDate.toString().slice(16, 21));
    const fullDate =
      currDate.getDate() +
      ' ' +
      currDate.toString().slice(4, 7) +
      ', ' +
      currDate.getFullYear();
    const fullTime = currDate.toString().slice(16, 21);
    noteList.push({
      id: noteList?.length + 1,
      img: Images.AvatarHolder,
      title: `Template ${noteList?.length + 1}`,
      time: route?.params?.showTime ? fullTime : '',
      date: route?.params?.showTime ? fullDate : '',
      note: route?.params?.notes,
      type: route?.params?.type,
    });
    showMessageSafe({
      message: 'Note added Successfully',
      type: 'success',
      icon: 'auto',
      duration: alert_Dur,
    });
  }
  if (
    route?.params?.stack == 'Draw' &&
    route?.params?.from != 'SBoard' &&
    route?.params?.from != 'PBoard'
  ) {
    if (route?.params?.from == 'Agenda') {
      globalStates?.agendaMember.set(
        JSON.parse(JSON.stringify(route.params?.selected)),
      );
    }
    navigation.navigate(route?.params?.stack, {
      title: route?.params?.title,
      selected: route?.params?.selected,
      item: route?.params?.item,
      ...route?.params,
    });
  } else {
    console.log('stack', route?.params?.stack);
    console.log('screen', route?.params?.from);

    navigation.navigate(route?.params?.stack, {
      screen: route?.params?.from,
      params: {
        title: route?.params?.title,
        selected: route?.params?.selected,
        item: route?.params?.item,
        ...route?.params,
      },
    });
  }
};

const clearFunc = (navigation: any, route: any) => {
  navigation.navigate(route?.params?.stack, {
    screen: route?.params?.from,
    params: {
      title: route?.params?.title,
      selected: route?.params?.selected,
      item: route?.params?.item,
      filter: [],
    },
  });
};

const handleStopwatch = (params: any) => {
  const { ticket_info } = params;
  const date = new Date();
  let tempArr: any = [];
  globalState.stopwatch.set(tempArr);
  console.log('hoa ==========>>', tempArr);
};

export { saveStatus, goBack, onSave, handleStopwatch, clearFunc };
