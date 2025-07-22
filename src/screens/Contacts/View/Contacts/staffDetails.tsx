import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { State, useHookstate } from '@hookstate/core';

import { FloatButton, Loader, SingleLineField } from '../../../../components';
import { DataItem as Item } from '../../../../types';
import { SelectItems, showMessageSafe } from '../../../../utils/helperFunctions';
import { deleteUser } from '../../utils/functions';
import { StaffRole } from '../../../../constants/SampleArrays';
import { globalState } from '../../../../stores/globalAppState';
import { create_UUID } from '../../../../utils/helperFunctions';

export default function StaffDetails() {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const contactDetails = route?.params?.contactDetails;
  const departments: State<any> = useHookstate(globalState.departments);
  const groups: State<any> = useHookstate(globalState.groups);
  const locations: State<any> = useHookstate(globalState.locations);
  const teams: State<any> = useHookstate(globalState.teams);
  const timezones: State<any> = useHookstate(globalState.timezones);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'Is Active',
      enable: true,
      rightSwitchVal: Boolean(contactDetails?.is_active),
      showRightSwitch: true,
      key: 'is_active',
    },
    {
      title: contactDetails?.email,
      subTitle: 'Email',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'email',
    },
    {
      title: contactDetails?.role ?? 'Please Select',
      subTitle: 'Role',
      list: StaffRole || [],
      selectedItem: StaffRole?.filter(
        role => role.name == contactDetails?.role,
      )[0],
      headerTitle: 'Roles',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'role',
    },
    {
      title: contactDetails?.group?.name ?? 'Please Select',
      subTitle: 'Group',
      list:
        groups.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
          };
        }) || [],
      selectedItem: groups
        .get()
        ?.filter((value: any) => value?.id == contactDetails?.group?.id)[0],
      headerTitle: 'Groups',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'group',
    },
    {
      title: contactDetails?.department?.name ?? 'Please Select',
      subTitle: 'Department',
      list:
        departments.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
          };
        }) || [],
      selectedItem: departments
        .get()
        ?.filter(
          (value: any) => value?.id == contactDetails?.department?.id,
        )[0],
      headerTitle: 'Departments',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'department',
    },
    {
      title: contactDetails?.location?.name ?? 'Please Select',
      subTitle: 'Location',
      list:
        locations.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
            name: value?.attributes?.title,
          };
        }) || [],
      selectedItem: locations
        .get()
        ?.filter((value: any) => value?.id == contactDetails?.location?.id)[0],
      headerTitle: 'Locations',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'location',
    },
    {
      title:
        contactDetails?.teams?.name ??
        teams
          .get()
          ?.map((value: any) => {
            const boolVal = Boolean(
              contactDetails?.teams?.find((val: any) => value?.id == val?.id),
            );
            if (boolVal) {
              return value?.attributes?.name;
            }
          })
          ?.filter((val: any) => val != undefined)
          ?.toString() ??
        'Please Select',
      subTitle: 'Team',
      list:
        teams.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
          };
        }) || [],
      selectedItem: teams
        .get()
        ?.filter((value: any) =>
          Boolean(
            contactDetails?.teams?.find((val: any) => value?.id == val?.id),
          ),
        ),
      headerTitle: 'Teams',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'teams',
      SelectMode: 'checkbox',
      listTitle: true,
    },
    {
      title: contactDetails?.timezone?.name ?? 'Please Select',
      subTitle: 'Timezones',
      list:
        timezones.get().map((value: any) => {
          return {
            ...value,
            id: value?.id,
          };
        }) || [],
      selectedItem: timezones
        .get()
        ?.filter((value: any) => value?.id == contactDetails?.timezone?.id)[0],
      headerTitle: 'Timezones',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'timezone',
      searchable: true,
    },
    {
      title: contactDetails?.user_name ?? '',
      subTitle: 'User Name',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'user_name',
    },
    {
      title: contactDetails?.first_name ?? '',
      subTitle: 'First Name',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'first_name',
    },
    {
      title: contactDetails?.last_name ?? '',
      subTitle: 'Last Name',
      inputable: true,
      enable: false,
      isRequired: false,
      key: 'last_name',
    },
    {
      title: contactDetails?.phone_number ?? '',
      subTitle: 'Phone Number',
      inputable: true,
      enable: false,
      isRequired: false,
      keyboardType: 'number-pad',
      key: 'phone_number',
    },
    {
      title: contactDetails?.internal_notes ?? '',
      subTitle: 'Internal Notes',
      inputable: true,
      enable: false,
      isRequired: false,
      mode: 'texteditor',
      key: 'internal_notes',
    },
  ]);

  const [loader, setLoader] = useState(false);

  const updateInput = (e: string, index: number) => {
    let newData = [...dataSource];
    newData[index].title = e;
    setDataSource(newData);
  };

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title =
        route?.params?.selected?.name ??
        teams
          .get()
          ?.map((value: any) => {
            const boolVal = Boolean(
              route?.params?.selected?.find((val: any) => value?.id == val?.id),
            );
            if (boolVal) {
              return value?.attributes?.name;
            }
          })
          ?.filter((val: any) => val != undefined)
          ?.toString();
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
    }
  }, [route?.params?.selected]);

  const updateSwitch = (index: number) => {
    let tempArr: Item[] = [...dataSource];
    tempArr[index].rightSwitchVal = !tempArr[index].rightSwitchVal;
    setDataSource(tempArr);
  };

  useEffect(() => {
    const Data: Item[] = [];
    dataSource.forEach(item =>
      Data.push({
        title: item.title,
        subTitle: item.subTitle,
        isRequired: item.isRequired,
        selectedItem: item.selectedItem,
        rightSwitchVal: item.rightSwitchVal,
        key: item.key,
      }),
    );

    Data[Data?.length] = {
      title: contactDetails?.id,
      subTitle: 'id',
    };

    Data[Data?.length + 1] = {
      title: contactDetails?.provider_id,
      subTitle: 'provider_id',
    };

    navigation?.setParams({
      ...route?.params,
      data: Data,
    });
  }, [dataSource]);

  useEffect(() => {
    const obj = [...dataSource];
    setDataSource(obj);
  }, []);

  const deleteUserFunc = (id: number) => {
    setLoader(true);
    console.log('companyDetails', id);
    deleteUser(id)
      .then(res => {
        console.log('res res ', res?.message?.data?.errors);

        setLoader(false);
        if (res?.status) {
          navigation?.goBack();
        } else {
          showMessageSafe({
            message:
              res?.message?.data?.errors[0]?.detail ??
              res?.message?.data?.errors[0]?.title ??
              'Something went wrong',
            type: 'danger',
            icon: 'auto',
            duration: 2000,
          });
        }
      })
      .catch(err => {
        console.log('delete Organization failed', err);
        setLoader(false);
      });
  };

  return (
    <>
      <Loader isShow={loader} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: 'center' }}>
        {dataSource?.map((item, index) => (
          <SingleLineField
            key={`${create_UUID()}`}
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
            keyboardType={item?.keyboardType}
            mode={item?.mode}
            onChangeSwitch={() => updateSwitch(index)}
            onPress={() =>
              SelectItems(
                item,
                index,
                navigation,
                route,
                'StaffDetails',
                'Stack1',
              )
            }
            listTitle={item?.listTitle}
          />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
