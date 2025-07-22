import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import {
  NavigationProp,
  Theme,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import _ from 'lodash';
import { useHookstate } from '@hookstate/core';

import styles from './style';
import {
  SearchBar,
  SimpleLoader,
  CstmPressable,
  FloatButton,
  NotFound,
} from '../../components';
import { contactsList } from '../../constants/SampleArrays';
import { Contact } from '../../types';
import { useUpdateEffect } from '../../utils/hooks';
import { searchFromArray } from '../../utils/helperFunctions';
import { getAllLocations } from './utils/functions';
import { globalState } from '../../stores/globalAppState';

const Locations = ({
  navigation,
}: {
  navigation: NavigationProp<any, any>;
}) => {
  const { colors, dark }: Theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState(false);
  const locations = useHookstate(globalState.locations);
  const [filteredData, setfilteredData] = useState(locations.get());

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    await getAllLocations();
    setLoading(false);
  };

  useEffect(() => {
    setfilteredData(locations.get());
  }, [locations]);

  const handleSubmit = () => {
    setLoading(true);
    searchFilterFunction(searchValue);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const searchFilterFunction = async (text: string) => {
    var result = await searchFromArray({
      text: text,
      list: locations?.get(),
      keys: ['attributes.title'],
    });
    setfilteredData(result);
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

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...styles.header,
        }}>
        <SearchBar
          withTag={false}
          placeholder={'Search Location'}
          fontSize={'large'}
          value={searchValue}
          setChangeText={value => setSearchValue(value)}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </View>
      {loading ? <SimpleLoader /> : <RenderLocation listData={filteredData} />}
      <FloatButton
        onPress={() => navigation.navigate('Stack1', { screen: 'NewLocation' })}
      />
    </View>
  );
};

export const RenderLocation = ({
  listData = contactsList,
}: {
  listData?: Contact[];
}) => {
  const { colors, dark }: Theme = useTheme();
  const navigation: NavigationProp<any, any> = useNavigation();
  const [isFetching, setIsFetching] = useState(false);

  const onRefresh = async () => {
    setIsFetching(true);
    await getAllLocations();
    setIsFetching(false);
  };

  const renderList = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={styles.listContainer}>
        <CstmPressable
          onPress={() =>
            navigation.navigate('Stack1', {
              screen: 'LocationDetails',
              params: { locationDetails: item },
            })
          }
          android_ripple={{ color: dark ? '#ffffff0e' : '#0000000e' }}>
          <View style={styles.listItemContainer}>
            <View>
              <Text
                style={{
                  color: colors.text,
                }}>
                {item?.attributes?.title}
              </Text>
            </View>
          </View>
        </CstmPressable>
        {index !== listData.length - 1 && (
          <Divider
            style={{
              backgroundColor: colors.text,
              ...styles.dividerStyle,
            }}
          />
        )}
      </View>
    );
  };

  return (
    <>
      {listData.length !== 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
          }
          data={listData}
          renderItem={renderList}
        />
      ) : (
        <NotFound label="Location" />
      )}
    </>
  );
};

export default Locations;
