import {StyleSheet} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    height: moderateVerticalScale(WINDOW_HEIGHT, 0),
  },
  imageContainer: {
    height: moderateVerticalScale(50, 0),
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerImage: {
    width: '50%',
    height: '100%',
  },
  scannerBtnContainer: {
    alignItems: 'center',
  },
  fingerScannerBtn: {
    width: WINDOW_WIDTH * 0.15,
    height: WINDOW_WIDTH * 0.15,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
