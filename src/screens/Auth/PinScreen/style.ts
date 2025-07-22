import {StyleSheet} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  text: {
    padding: 10,
    fontSize: 40,
    opacity: 0.85,
  },
  icon: {
    padding: 10,
    opacity: 0.85,
  },
});

export default styles;
