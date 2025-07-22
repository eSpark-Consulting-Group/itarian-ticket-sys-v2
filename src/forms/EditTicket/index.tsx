import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useHookstate } from '@hookstate/core';

import { SingleLineField } from '../../components';
import { contactNameList } from '../../constants/SelectionList';
import { SelectFields } from '../../types';
import { SelectItems } from '../../utils/helperFunctions';
import { companyStore } from '../../stores/companyStore';

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
}

export const EditTicket = ({ navigation, route }: any) => {
  const companies: any = useHookstate(companyStore.companies)?.get();
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      subTitle: 'Company',
      leftIcon: 'clipboard-text-outline',
      rightIcon: 'chevron-right',
      title: route?.params?.companyContact?.company?.name,
      headerTitle: 'Company',
      list: companies,
      selectedItem: route?.params?.companyContact?.company,
      searchable: true,
    },
    {
      subTitle: 'Contact',
      title: route?.params?.companyContact?.contact?.name,
      rightIcon: 'chevron-right',
      headerTitle: 'Contact',
      list: contactNameList,
      selectedItem: route?.params?.companyContact?.contact,
      searchable: false,
    },
  ]);
  console.log('route?.params?.companyContact', route?.params?.from);
  useEffect(() => {
    if (
      route?.params?.item?.toString() &&
      route?.params?.from == 'EditTicket'
    ) {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
    }
  }, [route?.params]);

  const isFocues = useIsFocused();
  useEffect(() => {
    navigation.setParams({
      ...route?.params,
      from: 'STickets',
      stack: 'Stack1',
      item: null,
      companyContact: {
        contact: dataSource[1].selectedItem,
        company: dataSource[0].selectedItem,
      },
    });
  }, [isFocues]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ alignItems: 'center' }}>
      {dataSource.map((item: Item, index: number) => (
        <SingleLineField
          key={index}
          subTitle={item.subTitle}
          title={item.title}
          enable={item.enable}
          titleWidth={item.titleWidth}
          rightIcon={item.rightIcon}
          onPress={() =>
            SelectItems(item, index, navigation, route, 'EditTicket', 'Stack2')
          }
        />
      ))}
    </ScrollView>
  );
};
