import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  menuItemButtonStyle: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  menuIconContainer: {
    width: moderateScale(30),
    flexDirection: 'row-reverse',
  },
});
