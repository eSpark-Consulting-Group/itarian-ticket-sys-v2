import { Theme, useTheme } from '@react-navigation/native';
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
  const theme: Theme = useTheme();
  const isDark = theme.dark;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? theme.colors.card : '#F2F2F2' },
      ]}
    >
      {/* Left Section */}
      {showBack && (
        <View style={styles.left}>
          <TouchableOpacity onPress={onBackPress}>
            <Icon
              name="chevron-back"
              size={24}
              color={isDark ? theme.colors.text : '#000'}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Title */}
      <Text
        style={[styles.title, { color: isDark ? theme.colors.text : '#000' }]}
      >
        {title}
      </Text>

      {/* Right Section */}
      <View style={styles.right}>
        {rightIcons &&
          rightIcons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              onPress={icon.onPress}
              style={styles.iconBtn}
            >
              <Icon
                name={icon.name}
                size={22}
                color={isDark ? theme.colors.text : '#000'}
              />
            </TouchableOpacity>
          ))}

        {rightText && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: '2%',
            }}
            onPress={rightText.onPress}
          >
            <Icon size={24} name="add" color={isDark ? '#fff' : '#1185E6'} />
            <Text style={{ color: isDark ? '#fff' : '#1185E6', fontSize: 16 }}>
              {rightText.label}
            </Text>
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
    flex: 1,
  },
  rightText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
});

export default V3Header;
