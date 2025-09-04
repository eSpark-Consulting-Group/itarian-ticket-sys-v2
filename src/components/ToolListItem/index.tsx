import { Theme, useTheme } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FA from 'react-native-vector-icons/Feather';
import MyText from '../MyText/MyText';

type ToolListItemProps = {
  title: string;
  onEdit: () => void;
  onView: () => void;
};

const ToolListItem: React.FC<ToolListItemProps> = ({
  title,
  onEdit,
  onView,
}) => {
  const theme: Theme = useTheme();
  return (
    <View style={styles.container}>
      <MyText style={[styles.title, { color: theme.colors.text }]}>{title}</MyText>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
          <FA name="edit-3" size={18} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onView} style={styles.iconButton}>
          <FA name="eye" size={18} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToolListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#111',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 6,
  },
});
