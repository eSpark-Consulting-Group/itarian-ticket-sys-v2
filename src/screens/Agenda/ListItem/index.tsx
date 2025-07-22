import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-paper';

import styles from './style';
import {
  DateSeparator,
  GapView,
  CstmPressable,
  NotFound,
} from '../../../components';
import { Ticket } from '../../../types';

const ListItem = ({
  dataSource,
  renderDate = true,
  flag,
  onPress,
  isResource = false,
}: {
  dataSource: any;
  renderDate?: boolean;
  flag?: boolean;
  onPress?: (item: Ticket) => void;
  isResource?: boolean;
}) => {
  const { colors, dark }: Theme = useTheme();
  const navigation: any = useNavigation();

  const renderData = (item2: any, ind: number) => {
    return (
      <CstmPressable
        style={{ paddingHorizontal: 20 }}
        key={item2.id}
        onPress={() => {
          onPress?.(item2);
        }}
        android_ripple={{ color: dark ? '#ffffff0e' : '#0000000e' }}>
        <View style={styles.itemContentContainer}>
          <View style={styles.itemContentIconContainer}>
            <View
              style={{
                ...styles.itemContentIcon,
                backgroundColor:
                  item2.type == 'Ticket' ? '#28648f' : 'lightgreen',
              }}>
              {item2.type == 'Ticket' ? (
                <II name="pricetag" size={22} color="#fff" />
              ) : (
                <MCI name="clipboard-text-outline" size={22} color={'#fff'} />
              )}
            </View>
          </View>
          <View style={{ width: '75%' }}>
            {item2?.assigned_to && isResource && (
              <Text style={{ fontWeight: 'bold', color: colors.text }}>
                Assigned to: {item2.assigned_to}
              </Text>
            )}
            {item2.type == 'Ticket' && (
              <Text style={{ fontWeight: 'bold', color: colors.text }}>
                Ticket {item2.ticket_no}
              </Text>
            )}
            <Text style={{ fontWeight: 'bold', color: colors.text }}>
              {item2.summary}
            </Text>
            <View style={styles.descContentContainer}>
              {item2.expType && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '110%',
                  }}>
                  <Text style={{ color: colors.text }}>{item2.expType}</Text>
                  <Text style={{ ...styles.schedule_dur }}>{item2.totExp}</Text>
                </View>
              )}
              {item2.time_dur && (
                <View style={styles.rowContainer}>
                  <II
                    name="calendar-outline"
                    color={colors.text}
                    style={styles.margin_5}
                  />
                  <Text style={{ ...styles.margin_5, color: colors.text }}>
                    {item2.start_time + '-' + item2.end_time}
                  </Text>
                  <Text style={{ ...styles.schedule_dur, color: '#fff' }}>
                    {item2.time_dur}
                  </Text>
                </View>
              )}
              {item2.company_name && (
                <View style={styles.rowContainer}>
                  <II
                    name="business"
                    color={colors.text}
                    style={styles.margin_5}
                  />
                  <Text style={{ color: colors.text }}>
                    {item2.company_name}
                  </Text>
                </View>
              )}
              {item2.site && (
                <View style={styles.rowContainer}>
                  <II
                    name="location-outline"
                    color={colors.text}
                    style={styles.margin_5}
                  />
                  <Text style={{ color: colors.text }}>{item2.site}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {renderDate ? (
          dataSource.data.length === ind + 1 ? null : (
            <Divider style={styles.divider} />
          )
        ) : dataSource.length === ind + 1 ? null : (
          <Divider style={styles.divider} />
        )}
      </CstmPressable>
    );
  };

  const renderAddTime = (date: Date) => {
    return (
      <CstmPressable
        onPress={() => {
          navigation.navigate('Stack1', {
            screen: 'NewTimeSheet',
            params: { date: date.toDateString() },
          });
        }}>
        <View style={[styles.itemContentContainer, { paddingHorizontal: 20 }]}>
          <View style={styles.itemContentIconContainer}>
            <View
              style={[styles.itemContentIcon, { backgroundColor: '#bdbdbd' }]}>
              <MCI name="clock-outline" size={22} color="#fff" />
            </View>
          </View>
          <View style={{ width: '75%' }}>
            <Text style={{ color: colors.text }}>No time recorded yet</Text>
            <Text style={{ fontWeight: 'bold', color: colors.text }}>
              Tap to add time
            </Text>
          </View>
        </View>
      </CstmPressable>
    );
  };

  return (
    <View style={styles.itemContainer}>
      <GapView />
      {renderDate && (
        <DateSeparator text={dataSource.date.toString().slice(0, 10)} />
      )}
      {dataSource.data ? (
        <FlatList
          data={renderDate ? dataSource.data : dataSource}
          renderItem={({ item, index }) => renderData(item, index)}
        />
      ) : (
        !flag && renderAddTime(dataSource?.date)
      )}
      {flag && (
        <FlatList
          data={renderDate ? dataSource.data : dataSource}
          renderItem={({ item, index }) => renderData(item, index)}
        />
      )}
    </View>
  );
};

export const RenderTickets = ({ listData }: { listData: Ticket[] }) => {
  const navigation: any = useNavigation();
  return (
    <>
      {listData.length !== 0 ? (
        <View style={styles.renderListContainer}>
          <ListItem
            dataSource={listData}
            flag={true}
            renderDate={false}
            onPress={iValue =>
              navigation.navigate('Stack1', {
                screen: 'STickets',
                params: {
                  title: iValue?.ticket_no?.toString(),
                  ticket_info: {
                    id: iValue.ticket_no?.toString(),
                    summary: iValue.summary,
                  },
                },
              })
            }
          />
        </View>
      ) : (
        <NotFound label="Tickets" />
      )}
    </>
  );
};

export default ListItem;
