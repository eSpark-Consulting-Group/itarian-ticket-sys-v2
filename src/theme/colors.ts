import { Theme } from '@react-navigation/native';
import { configureFonts } from 'react-native-paper';

const fontConfig = {
  default: {
    regular: { fontFamily: 'System' },
    medium: { fontFamily: 'System' },
    light: { fontFamily: 'System' },
    thin: { fontFamily: 'System' },
  },
};

export const LightTheme: Theme = {
  //Light Theme
  dark: false,
  colors: {
    primary: '#1185E6',
    background: '#ffffff',
    card: '#F2F2F2',
    text: '#000000',
    border: '#28648f',
    notification: '#ffffff',
  },
  fonts: configureFonts({ config: fontConfig }),
};

export const DarkTheme: Theme = {
  //Dark Theme
  dark: true,
  colors: {
    primary: '#1185E6',
    background: '#141414',
    border: '#28648f',
    text: '#ffffff',
    card: '#000000',
    notification: '#28648f',
  },
  fonts: configureFonts({ config: fontConfig }),
};
