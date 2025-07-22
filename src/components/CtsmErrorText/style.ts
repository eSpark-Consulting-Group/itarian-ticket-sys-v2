import { StyleSheet } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    height: moderateVerticalScale(20, 0),
  },
  center: {
    flex: 0.8,
  },
  adjuster: {
    flex: 0.1,
  },
});

export default styles;
