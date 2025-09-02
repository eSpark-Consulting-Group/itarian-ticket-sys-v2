import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const Dashboard = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerIcons}>
          <Icon
            name="notifications-outline"
            size={22}
            color="#000"
            style={{ marginRight: 15 }}
          />
          <Icon
            name="settings-outline"
            size={22}
            color="#000"
            onPress={() =>
              navigation.navigate('Stack3', { screen: 'Settings' })
            }
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <View style={styles.rowItem}>
              <Icon name="mail-outline" size={20} color="#5F6368" />
              <Text style={styles.cardLabel}>Inbox</Text>
            </View>
            <Text style={styles.cardNumber}>175</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.rowItem}>
              <MaterialIcon name="ticket-outline" size={20} color="#5F6368" />
              <Text style={styles.cardLabel}>My Tickets</Text>
            </View>
            <Text style={styles.cardNumber}>0</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.rowItem}>
              <Icon name="people-outline" size={20} color="#5F6368" />
              <Text style={styles.cardLabel}>Unassigned</Text>
            </View>
            <Text style={styles.cardNumber}>139</Text>
          </View>
        </View>

        <View style={styles.cardRow}>
          <View style={styles.card}>
            <View style={styles.rowItem}>
              <Icon name="time-outline" size={20} color="#5F6368" />
              <Text style={styles.cardLabel}>Overdue</Text>
            </View>
            <Text style={styles.cardNumber}>1</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.rowItem}>
              <Icon name="calendar-outline" size={20} color="#5F6368" />
              <Text style={styles.cardLabel}>Due Today</Text>
            </View>
            <Text style={styles.cardNumber}>0</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.rowItem}>
              <Icon name="trash-outline" size={20} color="#5F6368" />
              <Text style={styles.cardLabel}>Trash</Text>
            </View>
            <Text style={styles.cardNumber}>20</Text>
          </View>
        </View>

        <View style={styles.reportHeader}>
          <Text style={styles.sectionTitle}>Report</Text>
          <TouchableOpacity style={styles.dateSelector}>
            <Icon name="calendar-outline" size={16} color="#007aff" />
            <Text style={styles.dateText}> Select date</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.legendRow}>
          <Text style={[styles.legendDot, { color: '#007aff' }]}>●</Text>
          <Text style={styles.legendLabel}>Created</Text>
          <Text style={[styles.legendDot, { color: 'green', marginLeft: 15 }]}>
            ●
          </Text>
          <Text style={styles.legendLabel}>Reopen</Text>
          <Text style={[styles.legendDot, { color: 'red', marginLeft: 15 }]}>
            ●
          </Text>
          <Text style={styles.legendLabel}>Closed</Text>
        </View>

        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [{ data: [5, 2, 6, 8, 5] }],
          }}
          width={screenWidth - 30}
          height={180}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: () => '#999',
            propsForDots: { r: '4', strokeWidth: '2', stroke: '#007aff' },
          }}
          bezier
          style={styles.chart}
        />

        <Text style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Department</Text>
            <Text style={styles.statsLabel}>Open</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsValue}>Support</Text>
            <Text style={styles.statsValue}>1</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsValue}>Sales</Text>
            <Text style={styles.statsValue}>2</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  scrollView: { backgroundColor: '#fff', padding: 15 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  headerIcons: { flexDirection: 'row' },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 2,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#000',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'space-between',
  },
  cardLabel: { fontSize: 12, color: '#697580' },

  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  dateSelector: { flexDirection: 'row', alignItems: 'center' },
  dateText: { color: '#007aff', fontSize: 14 },

  legendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  legendDot: { fontSize: 16 },
  legendLabel: { fontSize: 14, marginLeft: 4, color: '#333' },

  chart: { borderRadius: 10, marginVertical: 8, alignSelf: 'center' },

  statsCard: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  statsLabel: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  statsValue: { fontSize: 14, color: '#333' },
});
