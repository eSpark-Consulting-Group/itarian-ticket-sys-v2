import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    padding: 3.5,
    borderRadius: 10,
  },
  itemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 10,
  },
  textStyle: {
    fontWeight: 'bold',
    opacity: 0.8,
  },
  dividerStyle: {
    width: 2,
    height: 25,
    margin: 2,
    backgroundColor: '#8f8f8f26',
    alignSelf: 'center',
  },
});

export default styles;
