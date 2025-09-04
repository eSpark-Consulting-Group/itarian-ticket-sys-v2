import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LineChart } from 'react-native-chart-kit';
import MyText from '../MyText/MyText';
import { Theme, useTheme } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

interface DashboardReportProps {
  title?: string;
  labels: string[];
  datasets: { data: number[]; color?: string }[];
  onDateSelect?: () => void;
}

const DashboardReport: React.FC<DashboardReportProps> = ({
  title = 'Report',
  labels,
  datasets,
  onDateSelect,
}) => {
  const legendLabels = ['Created', 'Reopen', 'Closed'];
  const theme: Theme = useTheme();
  return (
    <>
      <View style={styles.reportHeader}>
        <MyText style={styles.sectionTitle}>{title}</MyText>
        <TouchableOpacity style={styles.dateSelector} onPress={onDateSelect}>
          <Icon name="calendar-outline" size={16} color="#007aff" />
          <MyText style={styles.dateText}> Select date</MyText>
        </TouchableOpacity>
      </View>
      <View style={styles.legendRow}>
        {datasets.map((ds, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 15,
            }}
          >
            <MyText style={[styles.legendDot, { color: ds.color || '#007aff' }]}>
              ●
            </MyText>
            <MyText style={styles.legendLabel}>
              {legendLabels[i] || `Series ${i + 1}`}
            </MyText>
          </View>
        ))}
      </View>
      <LineChart
        data={{
          labels,
          datasets: datasets.map(ds => ({
            ...ds,
            color: ds.color ? (opacity = 1) => ds.color! : undefined,
          })),
        }}
        width={screenWidth - 30}
        height={180}
        chartConfig={{
          backgroundColor: theme.colors.background,
          backgroundGradientFrom: theme.colors.background,
          backgroundGradientTo: theme.colors.background,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: () => '#999',
          propsForDots: { r: '4', strokeWidth: '2', stroke: '#007aff' },
        }}
        bezier
        style={styles.chart}
      />
    </>
  );
};

export default DashboardReport;

const styles = StyleSheet.create({
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
  legendLabel: { fontSize: 14, marginLeft: 4, opacity: 0.8 },
  chart: { borderRadius: 10, marginVertical: 8, alignSelf: 'center' },
});
