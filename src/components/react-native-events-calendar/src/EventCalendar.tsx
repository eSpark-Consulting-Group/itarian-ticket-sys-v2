// @flow
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  VirtualizedList,
  Alert,
  VirtualizedListProps,
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import React, { createRef } from 'react';
import DatePicker from '@react-native-community/datetimepicker';

import styleConstructor from './style';

import DayView, { MyProps } from './DayView';

export default class EventCalendar extends React.Component<MyProps, any> {
  calendar: React.RefObject<VirtualizedListProps<null>> | any;
  constructor(props: any) {
    super(props);
    this.state = {
      showDate: false,
      date: moment(this.props.initDate),
      currDate: this.props.initDate,
      index: this.props.size,
      currIndex: 30,
    };
    this.calendar = createRef<HTMLInputElement>();
  }

  static defaultProps = {
    size: 30,
    initDate: new Date(),
    formatHeader: 'DD MMMM YYYY',
  };

  onChangeDate = (event: any, date: any) => {
    this.setState({ showDate: false });
    console.log('Received Date', date);

    if (event?.type == 'set') {
      const currdate = moment(date);
      this.setState({ date: currdate });
      this.setState({ currDate: date });
    }
  };

  _getItemLayout(data: any, index: number) {
    const { width } = this.props;
    return { length: width, offset: width * index, index };
  }

  _getItem(events: any, index: number) {
    const date = moment(this.state.date).add(index - this.props.size, 'days');
    return _.filter(events, event => {
      const eventStartTime = moment(event.start);
      return (
        eventStartTime >= date.clone().startOf('day') &&
        eventStartTime <= date.clone().endOf('day')
      );
    });
  }

  _renderItem({ index, item }: any) {
    const { width, format24h, initDate, scrollToFirst } = this.props;
    const date = moment(this.state.date).add(index - this.props.size, 'days');
    return (
      <DayView
        key={index}
        date={date}
        index={index}
        format24h={format24h}
        formatHeader={this.props.formatHeader}
        headerStyle={this.props.headerStyle}
        renderEvent={this.props.renderEvent}
        eventTapped={this.props.eventTapped}
        events={item}
        width={width}
        styles={styleConstructor(this.props.styles, item)}
        scrollToFirst={scrollToFirst}
        initDate={''}
        size={0}
        scrollToCurrentTime={this.props.scrollToCurrentTime}
      />
    );
  }

  _goToPage(index: number) {
    // if (index <= 0 || index >= this.props.size * 2) {
    //   return;
    // }
    var tomorrow = new Date(this.state.date);
    tomorrow.setDate(tomorrow.getDate() + index);
    // const date = moment(this.state.date).add(index - this.props.size, 'days');
    this.setState({ currDate: tomorrow });

    const date = moment(tomorrow);
    console.log('State Date', this.state.date);

    // this.calendar.scrollToIndex({index, animated: false});
    console.log('Date', date);
    // this.setState({index, date});
    this.setState({ date });
  }

  render() {
    const { width, virtualizedListProps, events, initDate, formatHeader } =
      this.props;
    return (
      <View style={[styleConstructor(this.props.styles).container, { width }]}>
        <View style={styleConstructor(this.props.styles).header}>
          <TouchableOpacity onPress={() => this._goToPage(-1)}>
            <Image
              source={require('./back.png')}
              style={styleConstructor(this.props.styles).arrow}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ showDate: true })}>
            <Text style={styleConstructor(this.props.styles).headerText}>
              {this.state.date.format(formatHeader || 'DD MMMM YYYY')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._goToPage(1)}>
            <Image
              source={require('./forward.png')}
              style={styleConstructor(this.props.styles).arrow}
            />
          </TouchableOpacity>
        </View>
        <VirtualizedList
          ref={ref => (this.calendar = ref)}
          windowSize={2}
          initialNumToRender={2}
          initialScrollIndex={this.props.size}
          data={events}
          getItemCount={() => this.props.size * 2}
          getItem={this._getItem.bind(this)}
          keyExtractor={(item, index) => index?.toString()}
          getItemLayout={this._getItemLayout.bind(this)}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          renderItem={this._renderItem.bind(this)}
          style={{ width: width }}
          {...virtualizedListProps}
        />
        {this.state.showDate && (
          <DatePicker
            mode={'date'}
            value={this.state.currDate}
            onChange={this.onChangeDate}
            positiveButtonLabel={'Set Date'}
          />
        )}
      </View>
    );
  }
}
