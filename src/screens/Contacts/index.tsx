import React from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';

import { CstmTabBar } from '../../components';
import Staffs from './Screens/staffs';
import Users from './Screens/users';

const renderScene = SceneMap({
  first: Users,
  second: Staffs,
});

const Contacts = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Users' },
    { key: 'second', title: 'Staffs' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={props => <CstmTabBar {...props} />}
    />
  );
};

export default Contacts;
