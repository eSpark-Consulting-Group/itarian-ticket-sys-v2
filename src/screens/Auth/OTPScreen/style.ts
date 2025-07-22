import { StyleSheet } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  resendCode: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#3669C9',
  },
});

export default styles;
