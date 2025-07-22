import { StyleSheet } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    height: moderateVerticalScale(50, 0),
    flexDirection: 'row',
    marginVertical: 10,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  adjuster: { flex: 0.1 },
  text: { color: '#F7F7F7', fontWeight: '800', fontSize: 18 },
});

export default styles;
