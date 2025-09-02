import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  DashboardCard,
  DashboardReport,
  DashboardStats,
} from '../../components';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      {/* <DashboardHeader /> */}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardRow}>
          <DashboardCard
            icon={<Icon name="mail-outline" size={20} color="#5F6368" />}
            label="Inbox"
            value={175}
          />
          <DashboardCard
            icon={
              <MaterialIcon name="ticket-outline" size={20} color="#5F6368" />
            }
            label="My Tickets"
            value={0}
          />
          <DashboardCard
            icon={<Icon name="people-outline" size={20} color="#5F6368" />}
            label="Unassigned"
            value={139}
          />
        </View>

        <View style={styles.cardRow}>
          <DashboardCard
            icon={<Icon name="time-outline" size={20} color="#5F6368" />}
            label="Overdue"
            value={1}
          />
          <DashboardCard
            icon={<Icon name="calendar-outline" size={20} color="#5F6368" />}
            label="Due Today"
            value={0}
          />
          <DashboardCard
            icon={<Icon name="trash-outline" size={20} color="#5F6368" />}
            label="Trash"
            value={20}
          />
        </View>

        <DashboardReport
          labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
          datasets={[
            { data: [5, 2, 6, 8, 5], color: 'blue' },
            { data: [2, 3, 4, 2, 1], color: 'green' },
          ]}
          onDateSelect={() => console.log('Pick date')}
        />
        <DashboardStats
          rows={[
            { label: 'Support', value: 1 },
            { label: 'Sales', value: 2 },
          ]}
        />
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  scrollView: { backgroundColor: '#fff', padding: 15 },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});
