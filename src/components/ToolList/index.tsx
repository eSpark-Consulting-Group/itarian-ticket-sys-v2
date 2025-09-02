import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import ToolListItem from '../ToolListItem';
import FA from 'react-native-vector-icons/Feather';
import { Theme, useTheme } from '@react-navigation/native';

type Tool = { id: string; title: string };

const ToolList: React.FC = () => {
  const theme: Theme = useTheme();
  const [tools, setTools] = useState<Tool[]>([
    { id: '1', title: 'Test tool title 1' },
    { id: '2', title: 'Test tool title 2' },
    { id: '3', title: 'Test tool title 3' },
    { id: '4', title: 'Test tool title 4' },
  ]);

  const handleDelete = (id: string) => {
    setTools(tools.filter(tool => tool.id !== id));
  };

  const renderItem = ({ item, index }: { item: Tool; index: number }) => {
    const isFirst = index === 0;
    const isLast = index === tools.length - 1;

    return (
      <View style={styles.rowContainer}>
        {/* Left List Block */}
        <View
          style={[
            styles.row,
            isFirst && styles.firstRow,
            isLast && styles.lastRow,
            { backgroundColor: theme.dark ? '#1F1F1F' : '#fafafa' },
          ]}
        >
          <ToolListItem
            title={item.title}
            onEdit={() => console.log('Edit', item.id)}
            onView={() => console.log('View', item.id)}
          />
          {/* Separator line inside the item */}
          {!isLast && (
            <View
              style={[
                styles.separator,
                { backgroundColor: theme.dark ? '#333' : '#E5E7EB' },
              ]}
            />
          )}
        </View>

        {/* Delete Button Block */}
        <View
          style={[
            styles.deleteWrapper,
            isFirst && styles.firstDelete,
            isLast && styles.lastDelete,
            { backgroundColor: theme.dark ? 'rgba(37, 2, 2, 1)' : '#FFF1F1' },
          ]}
        >
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            style={styles.deleteButton}
          >
            <FA name="trash-2" size={20} color="red" />
          </TouchableOpacity>
          {/* Matching separator for delete column */}
          {!isLast && (
            <View
              style={[
                styles.delSeparator,
                { backgroundColor: theme.dark ? '#5f5e5eff' : '#e2bcbcff' },
              ]}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tools}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ToolList;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  row: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 16,
    // paddingVertical: 4,
  },
  firstRow: {
    borderTopLeftRadius: 16,
  },
  lastRow: {
    borderBottomLeftRadius: 16,
  },
  separator: {
    height: 1,
    // backgroundColor: '#E5E7EB',
    // marginTop: 8,
  },
  delSeparator: {
    height: 1,
    backgroundColor: '#dabebeff', // same as tool separator
    width: '50%', // take full width of deleteWrapper
    // marginTop: 18,
    position: 'absolute',
    bottom: 0,
  },
  deleteWrapper: {
    backgroundColor: '#FFF1F1',
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  firstDelete: {
    borderTopRightRadius: 16,
  },
  lastDelete: {
    borderBottomRightRadius: 16,
  },
  deleteButton: {
    padding: 8,
    paddingBottom: 0,
  },
});
