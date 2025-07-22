import { StyleSheet } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoHolder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: moderateVerticalScale(160, 0.5),
    elevation: 1,
  },
  statusButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    elevation: 1,
  },
});

export default styles;
