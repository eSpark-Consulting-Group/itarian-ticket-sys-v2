import { Theme, useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '../MyText/MyText';

interface StatsRow {
  label: string;
  value: string | number;
}

interface DashboardStatsProps {
  title?: string;
  rows: StatsRow[];
  headers?: [string, string]; // Two column headers
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  title = 'Statistics',
  rows,
  headers = ['Department', 'Open'], // default headers
}) => {
  const theme: Theme = useTheme();
  return (
    <>
      <MyText style={styles.sectionTitle}>{title}</MyText>
      <View
        style={[
          styles.statsCard,
          { backgroundColor: theme.dark ? theme.colors.card : '#FAFAFA' },
        ]}
      >
        {/* Header row */}
        <View style={[styles.statsRow, styles.headerRow]}>
          <MyText style={styles.headerText}>{headers[0]}</MyText>
          <MyText style={styles.headerText}>{headers[1]}</MyText>
        </View>

        {/* Data rows */}
        {rows.map((row, index) => (
          <React.Fragment key={index}>
            <View style={styles.statsRow}>
              <MyText style={styles.statsLabel}>{row.label}</MyText>
              <MyText style={styles.statsValue}>{row.value}</MyText>
            </View>

            {index !== rows.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>
    </>
  );
};

export default DashboardStats;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  statsCard: {
    // backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  headerRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 6,
    marginBottom: 6,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsLabel: { fontSize: 14, fontWeight: '600',  },
  statsValue: { fontSize: 14, opacity: 0.8},
});
