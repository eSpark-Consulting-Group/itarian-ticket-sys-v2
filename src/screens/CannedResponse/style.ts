import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    elevation: 1,
    width: WINDOW_WIDTH,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    width: WINDOW_WIDTH,
  },
  listItemContainer: {
    flexDirection: 'row',
    padding: moderateScale(15),
    justifyContent: 'space-between',
  },
  subtitleStyle: {
    fontSize: 10,
    opacity: 0.75,
    marginLeft: 3,
    textAlignVertical: 'bottom',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalAdjuster: {width: 14},
  iconStyle: {
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 8,
  },
  dividerStyle: {
    opacity: 0.2,
    transform: [{scale: 2}],
  },
});

export default styles;
