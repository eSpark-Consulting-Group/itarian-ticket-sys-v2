import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { useHookstate, State } from '@hookstate/core';
import { Divider } from 'react-native-paper';

import {
  NotFound,
  SearchBar,
  SimpleLoader,
  TicketComponent,
} from '../../components';
import styles from './style';
import { globalState } from '../../stores/globalAppState';
import { RenderCompanies } from '../Companies';
import { contactsList } from '../../constants/SampleArrays';
import { useUpdateEffect } from '../../utils/hooks';
import { searchFromArray } from '../../utils/helperFunctions';
import { userStore } from '../../stores/userStore';
import { companyStore } from '../../stores/companyStore';
import { ticketStore } from '../../stores/ticketStore';
import { getAllTickets, getTicketsByUserId } from '../Agenda/utils/functions';
import { RenderContacts } from '../Contacts/Screens/users';

const Search = ({ route, navigation }: any) => {
  const { colors, dark }: Theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [clear, setClear] = useState(false);
  const tickets: any = useHookstate(ticketStore.AllTickets);
  const users = useHookstate(userStore.users)
    .get()
    ?.filter(value => value?.role == 'user');
  const staffs = useHookstate(userStore.users)
    .get()
    ?.filter(value => value?.role != 'user');
  const companies = useHookstate(companyStore.companies).get();

  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState(users);
  const [filteredStaffs, setFilteredStaffs] = useState(staffs);
  const [filteredTickets, setFilteredTickets] = useState(tickets?.get());

  const searchTagValue: State<string> = useHookstate(globalState.searchTag);

  useEffect(() => {
    setFilteredTickets(tickets?.get());
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    await getAllTickets();
  };

  useEffect(() => {
    if (route.params) {
      setSearchValue(route.params.data);
      searchTagValue.set('configurations');
      setTimeout(() => setIsSearching(true), 2000);
      setType('configurations');
      searchFilterFunction(route.params.data, 'configurations');
    }
  }, [route.params]);

  const handleSubmit = () => {
    setLoading(true);
    searchFilterFunction(searchValue, searchTagValue.get());
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  console.log(
    "users?.filter(value => value?.role != 'user')",
    users?.filter(value => value?.role != 'user'),
  );

  const searchFilterFunction = async (
    text: string,
    domain: string = 'tickets',
  ) => {
    setIsSearching(true);
    switch (domain) {
      case 'tickets':
        var result = await searchFromArray({
          text: text || '',
          list: tickets?.get(),
          keys: [
            'attributes.detail',
            'attributes.subject',
            'attributes.id',
            'attributes.ticketstatus.name',
            'attributes.user.user_name',
          ],
        });
        setFilteredTickets(result);
      case 'users':
        var result = await searchFromArray({
          text: text,
          list: users,
          keys: ['name', 'company_name'],
        });
        setFilteredContacts(result);
      case 'staff':
        var result = await searchFromArray({
          text: text,
          list: staffs,
          keys: ['name', 'company_name'],
        });
        setFilteredStaffs(result);
      case 'organizations':
        var result = await searchFromArray({
          text: text,
          list: companies,
          keys: ['name', 'id'],
        });
        setFilteredCompanies(result);
    }
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

  const CenterLabel = (): JSX.Element => {
    return (
      <>
        <Text
          style={{
            color: colors.text,
            ...styles.emptySearchLabel,
          }}>
          What would you like to Search for?
        </Text>
        <Text
          style={{
            color: colors.text,
            ...styles.emptySearchCriteria,
          }}>
          {`Locate Organizations, Users,\n or Tickets.`}
        </Text>
      </>
    );
  };

  useEffect(() => {
    setIsSearching(false);
  }, [searchTagValue.get()]);

  const handleRenderList = () => {
    switch (searchTagValue.get()) {
      case 'tickets':
        return (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {filteredTickets.length > 0 ? (
              <FlatList
                data={filteredTickets || []}
                ItemSeparatorComponent={() => (
                  <Divider
                    style={{
                      backgroundColor: colors.text,
                      height: 1.5,
                      opacity: 0.2,
                    }}
                  />
                )}
                renderItem={({ item, index }: any) => {
                  return (
                    <TicketComponent
                      item2={item}
                      ind={index}
                      onPress={() => {
                        navigation.navigate('Stack1', {
                          screen: 'STickets',
                          params: {
                            title: `Ticket# ${item?.id?.toString()}`,
                            ticket_info: {
                              id: item.id?.toString(),
                              summary: item?.attributes?.detail,
                              data: item,
                            },
                          },
                        });
                      }}
                    />
                  );
                }}
              />
            ) : (
              <View style={{ alignSelf: 'center' }}>
                <NotFound label="Tickets" />
              </View>
            )}
          </View>
        );
      case 'users':
        return <RenderContacts listData={filteredContacts} />;
      case 'staff':
        return <RenderContacts listData={filteredStaffs} />;
      case 'organizations':
        return <RenderCompanies listData={filteredCompanies} />;
      default:
        return;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...styles.header,
        }}>
        <SearchBar
          withTag={true}
          searchType={type}
          placeholder={'Search Contacts'}
          fontSize={'small'}
          value={searchValue}
          setChangeText={value => setSearchValue(value)}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.background,
          ...styles.content,
        }}>
        {isSearching ? (
          loading ? (
            <SimpleLoader />
          ) : (
            handleRenderList()
          )
        ) : (
          <CenterLabel />
        )}
      </View>
    </View>
  );
};

export default Search;
