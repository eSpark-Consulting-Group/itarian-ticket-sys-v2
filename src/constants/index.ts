import { Dimensions } from 'react-native';

export const BUILD_VERSION = '0.34.14';

export const alert_Dur = 1000;

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get('window');

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('screen');

export const fileIcons: any = {
  pdf: {
    icon: 'file-pdf-box',
    color: '#f40f02',
  },
  xls: {
    icon: 'microsoft-excel',
    color: '#1D6F42',
  },
  xlsx: {
    icon: 'microsoft-excel',
    color: '#1D6F42',
  },
  txt: {
    icon: 'file-document',
    color: '#8585858a',
  },
  doc: {
    icon: 'microsoft-word',
    color: '#1992fa',
  },
  docx: {
    icon: 'microsoft-word',
    color: '#1992fa',
  },
};
