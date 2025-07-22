import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WINDOW_WIDTH * 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5,
    marginBottom: 8,
  },
  divider: {
    transform: [{ scaleY: 3 }],
  },
  centerContent: {
    paddingHorizontal: 15,
    fontSize: 14,
  },
});

export default styles;
