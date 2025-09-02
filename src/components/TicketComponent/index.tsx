import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import moment from 'moment';
import { CstmPressable } from '../CstmPressable';
import FA from 'react-native-vector-icons/Feather';
import { Checkbox, Text } from 'react-native-paper';

const formatDate = (value?: string) =>
  value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : 'N/A';

interface TicketComponentProps {
  item2: any;
  ind: number;
  onPress?: (e: any) => void;
  selectionMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

const TicketComponent: React.FC<TicketComponentProps> = ({
  item2,
  ind,
  onPress = () => {},
  selectionMode = false,
  isSelected = false,
  onSelect = () => {},
}) => {
  const { colors, dark } = useTheme();
  const attributes = item2?.attributes ?? {};
  const ticketId = item2?.id ?? 'N/A';
  const isClosed = attributes?.ticketstatus?.name?.toLowerCase() === 'closed';

  return (
    <CstmPressable
      onPress={() => onPress(item2)}
      style={[
        styles.container,
        { backgroundColor: dark ? colors.card : '#fafafa' },
      ]}
      key={`${ticketId}-${ind}`}
    >
      {/* Checkbox Row */}
      {selectionMode && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          <Checkbox
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={onSelect}
            color={colors.primary}
          />
        </View>
      )}

      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.statusContainer}>
          <FA name="clock" size={14} />
          <Text style={styles.statusText}>Due today</Text>
        </View>
      </View>

      {/* Title Row */}
      <View style={styles.rowBetween}>
        <Text style={[styles.title, { color: colors.text }]}>
          {attributes?.subject || `Ticket #${ticketId}`}
        </Text>
        {isClosed && (
          <View
            style={[
              styles.closedChip,
              { borderColor: dark ? colors.border : '#D9D9D9' },
            ]}
          >
            <View
              style={[styles.closedDot, { backgroundColor: colors.primary }]}
            />
            <Text style={[styles.closedChipText, { color: colors.primary }]}>
              Closed
            </Text>
          </View>
        )}
      </View>

      <View style={styles.metaContainer}>
        <MetaItem label="Ticket ID" value={`#${ticketId}`} />
        <MetaItem
          label="From"
          value={attributes?.user?.user_name}
          chip
          chipColor={dark ? colors.border : '#D9D9D9'}
        />
        <MetaItem
          label="Assigned to"
          value={attributes?.assigned_staff?.user_name}
          chip
          chipColor={dark ? colors.border : '#D9D9D9'}
        />
        <MetaItem label="Priority" value={attributes?.priority || 'Low'} />
        <MetaItem
          label="Last Activity"
          value={formatDate(attributes?.lastactivity)}
        />
        <MetaItem
          label="Created at"
          value={formatDate(attributes?.created_at)}
        />
      </View>
    </CstmPressable>
  );
};

interface MetaItemProps {
  label: string;
  value?: string;
  chip?: boolean;
  chipColor?: string;
}

const MetaItem: React.FC<MetaItemProps> = ({
  label,
  value,
  chip = false,
  chipColor = '#D9D9D9',
}) => {
  const theme: Theme = useTheme();

  return (
    <View style={styles.metaRow}>
      <Text
        style={[
          styles.metaLabel,
          { color: theme.dark ? theme.colors.text : '#8d8d8dff' },
        ]}
      >
        {label}
      </Text>

      {chip ? (
        <View style={[styles.chip, { borderColor: chipColor }]}>
          <Text
            style={[
              styles.link,
              { color: theme.dark ? theme.colors.text : theme.colors.primary },
            ]}
          >
            {value || 'N/A'}
          </Text>
        </View>
      ) : (
        <Text
          style={[
            styles.metaValue,
            { color: theme.dark ? theme.colors.text : '#000' },
          ]}
        >
          {value || 'N/A'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  closedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: 'center',
  },
  closedDot: {
    width: 5,
    aspectRatio: 1,
    borderRadius: 5,
    marginRight: 4,
  },
  closedChipText: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },

  metaContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    marginTop: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  metaLabel: {
    fontSize: 14,
    // color: '#4B5563',
    width: 120,
  },
  metaValue: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
    textAlign: 'left',
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: '#3B82F6',
    fontSize: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default TicketComponent;
