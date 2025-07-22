import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    elevation: 1,
    width: WINDOW_WIDTH,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySearchLabel: {
    fontWeight: 'bold',
    fontSize: 17,
    opacity: 0.6,
  },
  emptySearchCriteria: {
    fontSize: 15,
    opacity: 0.6,
    textAlign: 'center',
  },
});

export default styles;
