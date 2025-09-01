import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type HeaderProps = {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcons?: { name: string; onPress: () => void }[];
  rightText?: { label: string; onPress: () => void };
};

const V3Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  rightIcons,
  rightText,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity onPress={onBackPress}>
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Section */}
      <View style={styles.right}>
        {rightIcons &&
          rightIcons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              onPress={icon.onPress}
              style={styles.iconBtn}
            >
              <Icon name={icon.name} size={22} color="#000" />
            </TouchableOpacity>
          ))}
        {rightText && (
          <TouchableOpacity onPress={rightText.onPress}>
            <Text style={styles.rightText}>{rightText.label}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  left: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  rightText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
    marginLeft: 12,
  },
});

export default V3Header;
