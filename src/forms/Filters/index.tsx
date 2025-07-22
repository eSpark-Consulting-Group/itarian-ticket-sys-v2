import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { SingleLineField } from '../../components';
import { Filter } from '../../types';
import { SelectItems } from '../../utils/helperFunctions';

export default function Filters({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var { dataSource: dSource, title } = route?.params;
  const [dataSource, setDataSource] = useState(dSource);

  useEffect(() => {
    navigation.setParams({
      ...route?.params,
      filter: dataSource,
      stack: route?.params?.FilterStack,
      from: route?.params?.FilterFrom,
    });
  }, []);

  const updateSwitch = (index: number) => {
    let tempArr: Filter[] = [...dataSource];
    tempArr[index].rightSwitchVal = !tempArr[index].rightSwitchVal;
    tempArr[index].value = tempArr[index].rightSwitchVal ? 'John Doe' : null;
    setDataSource(tempArr);
  };

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].value = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
    }

    if (route?.params?.from == 'Filters') {
      navigation.setParams({
        ...route?.params,
        filter: dataSource,
        stack: route?.params?.FilterStack,
        from: route?.params?.FilterFrom,
      });
    }
  }, [route?.params]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}>
      {dataSource.map((item: Filter, index: number) => (
        <SingleLineField
          key={index}
          subTitle={item.subTitle}
          title={item.title != '' ? item.title : title}
          enable={item.enable}
          titleWidth={item.titleWidth}
          rightIcon={item.rightIcon}
          showRightSwitch={item.showRightSwitch}
          rightSwitchVal={item.rightSwitchVal}
          onChangeSwitch={() => updateSwitch(index)}
          leftIcon={item.leftIcon}
          leftIconStyles={{ opacity: 1 }}
          onPress={() =>
            SelectItems(item, index, navigation, route, 'Filters', 'Stack1')
          }
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
