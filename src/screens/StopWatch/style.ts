import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { WINDOW_WIDTH } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  dividerStyle: {
    opacity: 0.2,
    transform: [{ scale: 2 }],
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  listInner: {
    padding: moderateScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  priorityContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  listItemContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  horizontalItemStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
