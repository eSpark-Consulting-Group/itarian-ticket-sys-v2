import React, { useEffect, useState } from 'react';
import { FlatList, Platform, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useHookstate, State } from '@hookstate/core';
import { Theme, useTheme } from '@react-navigation/native';

import { DarkTheme, LightTheme } from '../../theme/colors';
import { SelectFields } from '../../types';
import { globalState } from '../../stores/globalAppState';
import { useUpdateEffect } from '../../utils/hooks';
import { SingleLineField } from '../FormFields';
import ModalHeader from '../ModalHeader';
import ModalView from '../ModalView';
import SearchBar from '../SearchBar';
import SimpleLoader from '../SimpleLoader';
import { searchFromArray } from '../../utils/helperFunctions';

const CstmItemSelector = ({ route, navigation }: any) => {
  const { colors }: Theme = useTheme();
  const themeValue: State<string> = useHookstate(globalState.theme);
  const [currChkInd, setCurrChkInd] = useState<number | any>(null);
  const [selectedIndexes, setSelectedIndexes] = useState<number[] | any>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [list, setList] = useState<SelectFields[] | []>([]);
  const [searchValue, setSearchValue] = useState('');
  const [clear, setClear] = useState(false);

  const handleSubmit = () => {
    searchFilterFunction(searchValue);
    setTimeout(() => {}, 3000);
  };

  const searchFilterFunction = async (text: string) => {
    let result = await searchFromArray({
      text: text || '',
      list: route?.params?.data,
      keys: ['name'],
    });
    setList(result);
  };

  const handleClear = () => {
    setSearchValue('');
    setClear(true);
  };

  useUpdateEffect(() => {
    if (clear) {
      handleSubmit();
      setClear(false);
    }
  }, [clear]);

  useEffect(() => {
    if (!searchValue) {
      setList(route?.params?.data);
    }
    setLoader(false);
  }, [route?.params]);

  useEffect(() => {
    if (route?.params?.SelectMode == 'checkbox') {
      const selectedInds = route?.params?.data?.map((val: any) => {
        const isFind = route?.params?.selected?.findIndex(
          (selected: any) => selected.id == val?.id,
        );
        return isFind != -1 && Boolean(isFind == 0 ? true : isFind)
          ? val?.id
          : null;
      });
      setSelectedIndexes(selectedInds?.filter((val: any) => Boolean(val)));
    } else {
      const selectedInd = route?.params?.data?.findIndex(
        (val: any) => val?.id == route?.params?.selected?.id,
      );
      if (selectedInd != -1)
        setCurrChkInd(route?.params?.data[selectedInd]?.id);

      return () => {
        setCurrChkInd(0); // This worked for me
      };
    }
  }, []);

  const selectItem = (ind: number, index?: number) => {
    if (route?.params?.SelectMode == 'checkbox') {
      let selectedIds = [...selectedIndexes];
      let isChecked = selectedIndexes?.findIndex((value: any) => value == ind);
      console.log('hohoho', selectedIds, isChecked, ind, index);
      if (isChecked != -1) {
        selectedIds?.splice(isChecked, 1);
      } else {
        const selectedInd = route?.params?.data?.findIndex(
          (val: any) => val?.id == ind,
        );
        selectedIds.push(route?.params?.data[selectedInd]?.id);
      }
      setSelectedIndexes(selectedIds);
      navigation?.setParams({
        ...route?.params,
        selected: route?.params?.data?.filter((val: any) =>
          selectedIds?.includes(val?.id),
        ),
      });
    } else {
      const selectedInd = route?.params?.data?.findIndex(
        (val: any) => val?.id == ind,
      );
      navigation?.setParams({
        ...route?.params,
        selected: route?.params?.data[selectedInd],
      });
      setCurrChkInd(ind);
    }
  };

  console.log('selectedIds selectedIds OUT FUNCTION', route.params.data);

  return (
    <ModalView>
      {route?.params?.searchable && (
        <ModalHeader empty searchHeader>
          <SearchBar
            withTag={false}
            placeholder={'Search...'}
            fontSize={'large'}
            value={searchValue}
            setChangeText={value => setSearchValue(value)}
            onSubmit={handleSubmit}
            onClear={handleClear}
          />
        </ModalHeader>
      )}
      {list?.length > 0 && (
        <FlatList
          data={list}
          renderItem={({ item, index }) => {
            const isChecked =
              route?.params?.SelectMode == 'checkbox'
                ? selectedIndexes?.includes(item?.id)
                : currChkInd == item?.id;

            return (
              <SingleLineField
                key={item?.name}
                title={item?.name}
                onPress={() => selectItem(item?.id)}
                leftChild={
                  <View style={{ flexDirection: 'row' }}>
                    <Checkbox
                      status={isChecked ? 'checked' : 'unchecked'}
                      color={colors.primary}
                      theme={
                        themeValue.get() === 'light' ? LightTheme : DarkTheme
                      }
                      onPress={() => selectItem(item?.id, index)}
                    />
                    {item.code && (
                      <Text
                        style={{
                          fontFamily: Platform.OS === 'android' ? 'fontyawesome' : 'FontAwesome',
                          color: colors.text,
                          fontSize: 18,
                          textAlignVertical: 'center',
                        }}>
                        {String.fromCharCode(
                          parseInt(
                            item.code.replace('&#x', '').replace(';', ''),
                            16,
                          ),
                        )}
                      </Text>
                    )}
                  </View>
                }
              />
            );
          }}
        />
      )}
      {loader && <SimpleLoader />}
    </ModalView>
  );
};

export default CstmItemSelector;
