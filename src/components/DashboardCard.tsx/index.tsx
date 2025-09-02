import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DashboardCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  backgroundColor?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  label,
  value,
  backgroundColor = '#F2F2F2',
}) => {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.rowItem}>
        {icon}
        <Text style={styles.cardLabel}>{label}</Text>
      </View>
      <Text style={styles.cardNumber}>{value}</Text>
    </View>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 2,
  },
  rowItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardLabel: { fontSize: 12, color: '#697580' },
  cardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#000',
  },
});
