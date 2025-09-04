import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar'; // Assuming you have a SearchBar component
import TicketComponent from '../../components/TicketComponent';
import { Checkbox, Divider } from 'react-native-paper';
import { NotFound } from '../../components';
import II from 'react-native-vector-icons/Ionicons';
import { Touchable } from 'react-native';
import MyText from '../../components/MyText/MyText';

// Dummy data for testing
const dummyTickets = [
  {
    id: '1',
    attributes: {
      subject: 'Issue with Login',
      detail: 'User unable to login to the application.',
      ticketstatus: { name: 'Open' },
      user: { user_name: 'John Doe' },
      assigned_staff: { user_name: 'Jane Smith' },
      priority: 'High',
      lastactivity: '2025-09-01 14:30:00',
      created_at: '2025-08-28 09:00:00',
    },
  },
  {
    id: '2',
    attributes: {
      subject: 'Payment Error',
      detail: 'Payment gateway not responding.',
      ticketstatus: { name: 'In Progress' },
      user: { user_name: 'Alice Johnson' },
      assigned_staff: { user_name: 'David Miller' },
      priority: 'Medium',
      lastactivity: '2025-09-01 10:00:00',
      created_at: '2025-08-29 11:00:00',
    },
  },
  {
    id: '3',
    attributes: {
      subject: 'App Crashing',
      detail: 'App crashes when trying to open the settings page.',
      ticketstatus: { name: 'Closed' },
      user: { user_name: 'Mark Davis' },
      assigned_staff: { user_name: 'Emily Brown' },
      priority: 'Low',
      lastactivity: '2025-08-30 16:45:00',
      created_at: '2025-08-27 12:15:00',
    },
  },
];

const TicketsScreen = ({ navigation }: any) => {
  const { colors, dark } = useTheme();
  const [tickets, setTickets] = useState(dummyTickets);
  const [filteredTickets, setFilteredTickets] = useState(dummyTickets);
  const [searchValue, setSearchValue] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  // selection states
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSort = () => {
    const sorted = [...filteredTickets].sort((a, b) => {
      const subjectA = a.attributes.subject?.toLowerCase() || a.id;
      const subjectB = b.attributes.subject?.toLowerCase() || b.id;

      if (subjectA < subjectB) return sortAscending ? -1 : 1;
      if (subjectA > subjectB) return sortAscending ? 1 : -1;
      return 0;
    });

    setFilteredTickets(sorted);
    setSortAscending(!sortAscending);
  };
  // toggle selection mode
  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      setSelectedTickets([]);
      setSelectAll(false);
    }
  };

  // toggle individual ticket
  const toggleTicketSelection = (id: string) => {
    setSelectedTickets(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id],
    );
  };

  // toggle all tickets
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedTickets([]);
      setSelectAll(false);
    } else {
      setSelectedTickets(filteredTickets.map(t => t.id));
      setSelectAll(true);
    }
  };

  // filtering logic (same as before)
  useEffect(() => {
    if (searchValue === '') {
      setFilteredTickets(tickets);
    } else {
      const filtered = tickets.filter(
        t =>
          t.attributes.subject
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          t.attributes.detail.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredTickets(filtered);
    }
  }, [searchValue, tickets]);

  const renderTicketList = () => {
    if (filteredTickets.length === 0) {
      return <NotFound label="Tickets" />;
    }

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingVertical: 10,
            gap: 12,
          }}
        >
          <TouchableOpacity onPress={toggleSelectionMode}>
            <MyText style={{ color: dark ? '#fff' : '#000' }}>
              {selectionMode ? 'Cancel' : 'Select'}
            </MyText>
          </TouchableOpacity>
          {/* might have other options, not sure yet */}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            onPress={toggleSort}
          >
            <MyText style={{ color: dark ? '#fff' : '#000' }}>Sort By</MyText>
            <II name="swap-vertical" size={20} color={dark ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>
        {selectionMode && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Checkbox
              status={selectAll ? 'checked' : 'unchecked'}
              onPress={toggleSelectAll}
              color={colors.primary}
            />
            <MyText style={{ marginLeft: 8, color: dark ? '#fff' : '#000' }}>
              Select All
            </MyText>
          </View>
        )}

        <FlatList
          data={filteredTickets}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TicketComponent
              item2={item}
              ind={index}
              selectionMode={selectionMode}
              isSelected={selectedTickets.includes(item.id)}
              onSelect={() => toggleTicketSelection(item.id)}
              onPress={() => {
                if (selectionMode) {
                  toggleTicketSelection(item.id);
                } else {
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
                }
              }}
            />
          )}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search tickets..."
        value={searchValue}
        setChangeText={setSearchValue}
        onSubmit={() => {}}
        onClear={() => setSearchValue('')}
        searchType="tickets"
      />
      {renderTicketList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default TicketsScreen;
