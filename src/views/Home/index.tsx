import React, {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';

import Inventory from './Inventory';

import Leftovers from './Leftovers';

const HomeWrapper = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'inventory',
      title: 'Inventory',
      focusedIcon: 'bread-slice',
      unfocusedIcon: 'bread-slice-outline',
    },
    {key: 'leftovers', title: 'Leftovers', focusedIcon: 'library-shelves'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    inventory: Inventory,
    leftovers: Leftovers,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default HomeWrapper;
