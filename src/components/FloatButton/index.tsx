import React, { useState } from 'react';
import { FAB } from 'react-native-paper';

import styles from './style';

const FloatButton = ({
  AdditionalButtons,
  onPress,
  icon = 'plus',
}: {
  AdditionalButtons?: any;
  onPress?: any;
  icon?: string;
}) => {
  const [showBtns, setShowBtns] = useState(false);
  const ShowMoreBtns = () => {
    setShowBtns(!showBtns);
  };

  return (
    <>
      {AdditionalButtons ? (
        <FAB.Group
          theme={{ colors: { background: '#111' } }}
          fabStyle={styles.floatGroup}
          open={showBtns}
          icon={showBtns ? 'close' : 'plus'}
          color="#fff"
          actions={AdditionalButtons}
          onStateChange={() => ShowMoreBtns()}
          visible={true}
          onPress={() => ShowMoreBtns()}
        />
      ) : (
        <FAB
          theme={{ colors: { background: '#111' } }}
          style={styles.floatButton}
          icon={icon}
          color="#fff"
          visible={true}
          onPress={onPress}
        />
      )}
    </>
  );
};

export default FloatButton;
