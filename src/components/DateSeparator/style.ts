import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { SCREEN_WIDTH, WINDOW_WIDTH } from '../../constants';

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  divider_1: {
    width: moderateScale(40, 0),
    transform: [{ scaleY: 6 }],
  },
  centerContent: {
    width: WINDOW_WIDTH * 0.25,
    textAlign: 'center',
  },
  divider_2: {
    width: moderateScale(SCREEN_WIDTH * 0.55, 0),
    transform: [{ scaleY: 6 }],
  },
});

export default styles;
