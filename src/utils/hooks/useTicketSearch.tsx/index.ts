import { useEffect, useState } from 'react';
import { useHookstate } from '@hookstate/core';
import { ticketStore } from '../../../stores/ticketStore';
import { searchFromArray } from '../../helperFunctions';

export const useTicketSearch = () => {
  const ticketsState = useHookstate(ticketStore.AllTickets);
  const [filteredTickets, setFilteredTickets] = useState<any[]>(
    Array.from(ticketsState.get()),
  );
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    setFilteredTickets(Array.from(ticketsState.get()));
  }, [ticketsState]);

  const handleSearch = async () => {
    setLoading(true);
    const result = await searchFromArray({
      text: searchValue,
      list: Array.from(ticketsState.get()),
      keys: [
        'attributes.detail',
        'attributes.subject',
        'attributes.id',
        'attributes.ticketstatus.name',
        'attributes.user.user_name',
      ],
    });
    setFilteredTickets(result);
    setLoading(false);
  };

  const handleClear = () => {
    setSearchValue('');
    setFilteredTickets(Array.from(ticketsState.get()));
  };

  return {
    tickets: filteredTickets,
    searchValue,
    setSearchValue,
    handleSearch,
    handleClear,
    loading,
  };
};
