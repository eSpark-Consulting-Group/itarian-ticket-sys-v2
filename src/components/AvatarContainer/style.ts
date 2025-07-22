import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    backgroundColor: '#fff',
    width: moderateScale(70, 0.5),
    height: moderateScale(70, 0.5),
  },
  AvatarImage: {
    borderRadius: 1000,
    width: moderateScale(70, 0.5),
    height: moderateScale(70, 0.5),
    borderWidth: 2,
  },
});

export default styles;
