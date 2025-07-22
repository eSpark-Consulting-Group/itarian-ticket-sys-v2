import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    elevation: 1.5,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#00000030',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.8,
    padding: 4,
  },
  subTitle: {
    fontSize: 14,
    opacity: 0.5,
    padding: 4,
  },
  rightContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default styles;
