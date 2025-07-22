import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH, WINDOW_WIDTH } from '../../constants';
import { LightTheme } from '../../theme/colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    richTextEditorStyle: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    //   borderWidth: 1,
    //   borderColor: '#ccaf9b',
    //   shadowColor: '#000',
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.23,
    //   shadowRadius: 2.62,
      elevation: 4,
      fontSize: 20,
      width: SCREEN_WIDTH - 30,
    },
    richTextToolbarStyle: {
      backgroundColor: LightTheme.colors.primary,
    },
  });
export default styles;
