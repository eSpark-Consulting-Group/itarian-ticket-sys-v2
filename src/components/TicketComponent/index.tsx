import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import { CstmPressable } from '../CstmPressable';
import { SCREEN_WIDTH } from '../../constants';
import styles from './styles';

const TicketComponent = ({
  item2,
  ind,
  onPress = e => {},
}: {
  item2: any;
  ind: number;
  onPress: (e: any) => void;
}) => {
  const checkDueDate = (value: Date): boolean => moment(value).isBefore();
  const { dark, colors }: Theme = useTheme();

  return (
    <CstmPressable
      style={{ paddingHorizontal: 12, width: SCREEN_WIDTH }}
      key={`${item2?.id}-${ind}`}
      onPress={() => {
        onPress(item2);
      }}
      android_ripple={{ color: dark ? '#ffffff0e' : '#0000000e' }}>
      <View style={styles.itemContentContainer}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.itemContentIconContainer}>
            <View
              style={{
                ...styles.itemContentIcon,
                backgroundColor: '#28648f',
              }}>
              <II name="pricetag" size={22} color="#fff" />
            </View>
          </View>
          <View>
            <Text
              style={{ fontWeight: 'bold', color: colors.text, fontSize: 22 }}>
              Ticket #{item2?.id}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontWeight: '500',
                color: colors.text,
                fontSize: 16,
                width: SCREEN_WIDTH * 0.5,
              }}>
              Subject: {item2?.attributes?.subject}
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: 12,
                fontWeight: '400',
              }}>
              Status: {item2?.attributes?.ticketstatus?.name}
            </Text>
            <View style={styles.descContentContainer}>
              {item2?.attributes?.company && (
                <View style={styles.rowContainer}>
                  <II
                    name="business"
                    color={colors.text}
                    style={styles.margin_5}
                  />
                  <Text style={{ color: colors.text }}>
                    {item2?.attributes?.company?.name?.toString()}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <View>
          {checkDueDate(item2?.attributes?.duedate) && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#dc3545',
                  padding: 1,
                  paddingHorizontal: 4,
                  borderRadius: 3,
                  opacity: 0.65,
                }}>
                <Text
                  style={{ color: '#ffffff', fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : 'OpenSans-Medium' }}>
                  Overdue
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </CstmPressable>
  );
};

export default TicketComponent;
