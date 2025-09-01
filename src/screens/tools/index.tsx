import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Switch,
  DimensionValue,
} from 'react-native';
import { useTheme, Theme } from '@react-navigation/native';
import { CustomSwitch, ToolList } from '../../components';

const ToolsScreen = () => {
  const { colors, dark }: Theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <CustomSwitch
        options={['Canned Response', 'Knowledge base']}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'semibold' }}>
        Statistics
      </Text>

      <ToolList />
    </View>
  );
};

export default ToolsScreen;
