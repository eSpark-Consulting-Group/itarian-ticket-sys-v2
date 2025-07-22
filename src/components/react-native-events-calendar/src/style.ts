// @flow
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

const calendarHeight = 2400;
// const eventPaddingLeft = 4
const leftMargin = 50 - 1;

export interface ThemeStyle {
  container?: ViewStyle;
  contentStyle?: ViewStyle;
  header?: ViewStyle;
  event?: ViewStyle;
  eventTitle?: TextStyle;
  eventSummary?: TextStyle;
  eventTimes?: TextStyle;
  line?: ViewStyle;
  timeLabel?: TextStyle;
  headerText?: TextStyle;
  arrow?: ImageStyle;
  lineNow?: ViewStyle;
}
export default function styleConstructor(theme: ThemeStyle = {}, item?: any) {
  let style: ThemeStyle = {
    container: {
      flex: 1,
      backgroundColor: '#ffff',
      ...theme.container,
    },
    contentStyle: {
      backgroundColor: '#fff',
      height: calendarHeight + 10,
      ...theme.contentStyle,
    },
    header: {
      paddingHorizontal: 30,
      height: 50,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#000',
      backgroundColor: '#F5F5F6',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 3,
      zIndex: 100,
      ...theme.header,
    },
    headerText: {
      fontSize: 16,
      ...theme.headerText,
    },
    arrow: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    event: {
      position: 'absolute',
      backgroundColor: '#F0F4FF',
      opacity: 0.8,
      borderColor: '#DDE5FD',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 4,
      minHeight: 25,
      flex: 1,
      paddingTop: 5,
      paddingBottom: 0,
      flexDirection: 'column',
      alignItems: 'flex-start',
      overflow: 'hidden',
      ...theme.event,
    },
    eventTitle: {
      color: '#615B73',
      fontWeight: '600',
      minHeight: 15,
      ...theme.eventTitle,
    },
    eventSummary: {
      color: '#615B73',
      fontSize: 12,
      flexWrap: 'wrap',
      ...theme.eventSummary,
    },
    eventTimes: {
      marginTop: 3,
      fontSize: 10,
      fontWeight: 'bold',
      color: '#615B73',
      flexWrap: 'wrap',
      ...theme.eventTimes,
    },
    line: {
      height: 1,
      position: 'absolute',
      left: leftMargin,
      backgroundColor: 'rgb(216,216,216)',
      ...theme.line,
    },
    lineNow: {
      position: 'absolute',
      flexDirection: 'row',
      // left: leftMargin,
      left: 5,

      // backgroundColor: 'red',
      zIndex: -1,
      ...theme.line,
    },
    timeLabel: {
      position: 'absolute',
      left: 15,
      color: 'rgb(170,170,170)',
      fontSize: 10,
      fontFamily: 'Helvetica Neue',
      fontWeight: '500',
      ...theme.timeLabel,
    },
  };
  return StyleSheet.create(style);
}
