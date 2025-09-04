import { Theme, useTheme } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MyText from '../MyText/MyText';

type CustomSwitchProps = {
  options: string[];
  activeIndex: number;
  onChange: (index: number) => void;
};

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  options,
  activeIndex,
  onChange,
}) => {
  const theme: Theme = useTheme();
  const { colors, dark } = theme;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: dark ? colors.card : '#f2f2f2' },
      ]}
    >
      {options.map((option, index) => {
        const isActive = activeIndex === index;
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              isActive && {
                backgroundColor: dark ? colors.primary : '#ffffff',
              },
            ]}
            onPress={() => onChange(index)}
          >
            <MyText
              style={[
                styles.optionText,
                { color: dark ? '#aaa' : '#555' },
                isActive && {
                  color: dark ? colors.text : '#000',
                  fontWeight: '700',
                },
              ]}
            >
              {option}
            </MyText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 3,
  },
  option: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
