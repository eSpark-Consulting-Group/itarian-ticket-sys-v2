import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Platform, UIManager} from 'react-native';

import {ModalView} from '../../../../components';
import Details from './Details';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const routes: any = useRoute();
  return (
    <ModalView>
      <Details />
    </ModalView>
  );
};

export default App;
