import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import { Divider } from 'react-native-paper';
import { State, useHookstate } from '@hookstate/core';

import {
  FloatButton,
  SearchBar,
  SimpleLoader,
  CstmPressable,
  NotFound,
} from '../../components';
import styles from './style';
import { Company } from '../../types';
import { useUpdateEffect } from '../../utils/hooks';
import { searchFromArray } from '../../utils/helperFunctions';
import { getAllCompanies } from './utils/functions';
import { companyStore } from '../../stores/companyStore';

const Companies = () => {
  const { colors, dark }: Theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState(false);
  const companies: State<any> = useHookstate(companyStore.companies);
  const [filteredCompanies, setFilteredCompanies] = useState(companies.get());

  useEffect(() => {
    getAllCompanies();
  }, []);

  useEffect(() => {
    setFilteredCompanies(companies.get());
  }, [companies]);

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
      list: companies.get(),
      keys: ['name', 'id'],
    });
    setFilteredCompanies(result);
  };

  const handleClear = () => {
    setSearchValue('');
    setClear(true);
  };

  useUpdateEffect(() => {
    if (clear) {
      console.log('done');
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
          placeholder={'Search Organizations'}
          fontSize={'large'}
          value={searchValue}
          setChangeText={value => setSearchValue(value)}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </View>
      {loading ? (
        <SimpleLoader />
      ) : (
        <RenderCompanies listData={filteredCompanies} />
      )}
    </View>
  );
};
export const RenderCompanies = ({
  listData = [],
}: {
  listData?: Company[];
}) => {
  const { colors, dark }: Theme = useTheme();
  const navigation: any = useNavigation();
  const [isFetching, setIsFetching] = useState(false);

  const renderList = ({ item, index }: { item: Company; index: number }) => {
    return (
      <View key={`company-details-${index}`} style={styles.listContainer}>
        <CstmPressable
          onPress={() =>
            navigation.navigate('Stack1', {
              screen: 'Company',
              params: { companyDetails: item },
            })
          }
          android_ripple={{ color: dark ? '#ffffff0e' : '#0000000e' }}>
          <View style={{ padding: moderateScale(15) }}>
            <Text
              style={{
                color: colors.text,
              }}>
              {item?.name}
            </Text>
          </View>
        </CstmPressable>
        {index !== listData.length - 1 && (
          <Divider
            style={{ backgroundColor: colors.text, ...styles.dividerStyle }}
          />
        )}
      </View>
    );
  };

  const onRefresh = () => {
    setIsFetching(true);
    getAllCompanies(false).then(() => {
      setIsFetching(false);
    });
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
        <NotFound label="Organizations" />
      )}
      <FloatButton
        onPress={() => navigation.navigate('Stack1', { screen: 'NewCompany' })}
      />
    </>
  );
};

export default Companies;
