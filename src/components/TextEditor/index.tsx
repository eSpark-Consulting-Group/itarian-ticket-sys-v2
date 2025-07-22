import { Theme, useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import { SCREEN_WIDTH } from '../../constants';
import CstmColorPicker from '../CstmColorPicker';
import styles from './styles';
import MI from 'react-native-vector-icons/MaterialIcons';
import FA5 from 'react-native-vector-icons/FontAwesome5';

export const TextEditor = ({
  value = '',
  onChangeText,
  placeholder,
}: {
  title?: string;
  value?: string;
  width?: string | number;
  placeholder?: string;
  onChangeText?: (text: string) => void;
}) => {
  const richText = useRef<any>();
  const { colors, dark }: Theme = useTheme();
  const [isEditorRegistered, setisEditorRegistered] = useState(false);
  const [showColorPicker, setColorPicker] = useState(false);
  const [ColorPickerType, setColorPickerType] = useState('textColor');

  const editorInitializedCallback = () => {
    console.log('registerToolbar');
    setisEditorRegistered(true);
  };

  const fontColor = (color: any) => {
    if (ColorPickerType == 'textColor') {
      richText.current?.setForeColor(color);
    } else {
      richText.current?.setHiliteColor(color);
    }
    setColorPicker(false);
  };

  return (
    <View>
      <CstmColorPicker
        color="#fff"
        updateColor={fontColor}
        visible={showColorPicker}
        onClose={() => setColorPicker(false)}
        erasable={true}
        onErase={() => {
          fontColor(
            ColorPickerType == 'textColor' ? colors.text : colors.background,
          );
        }}
      />
      {isEditorRegistered && (
        <RichToolbar
          editor={richText}
          selectedIconTint={colors.text}
          iconTint={colors.card}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.setSubscript,
            actions.setSuperscript,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.blockquote,
            actions.setParagraph,
            actions.heading1,
            actions.heading2,
            actions.heading3,
            actions.heading4,
            actions.outdent,
            actions.indent,
            actions.setStrikethrough,
            actions.setUnderline,
            actions.checkboxList,
            actions.undo,
            actions.redo,
            actions.hiliteColor,
            actions.setBackgroundColor,
          ]}
          iconMap={{
            [actions.heading1]: ({ tintColor }) => (
              <Text style={[{ color: tintColor }]}>H1</Text>
            ),
            [actions.heading2]: ({ tintColor }) => (
              <Text style={[{ color: tintColor }]}>H2</Text>
            ),
            [actions.heading3]: ({ tintColor }) => (
              <Text style={[{ color: tintColor }]}>H3</Text>
            ),
            [actions.heading4]: ({ tintColor }) => (
              <Text style={[{ color: tintColor }]}>H4</Text>
            ),
            [actions.setParagraph]: ({ tintColor }) => (
              <Text style={[{ color: tintColor }]}>P</Text>
            ),
            [actions.hiliteColor]: params => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setColorPicker(true);
                    setColorPickerType('textColor');
                  }}>
                  <MI
                    name="format-color-text"
                    size={20}
                    color={params?.tintColor}
                  />
                </TouchableOpacity>
              );
            },
            [actions.setBackgroundColor]: ({ tintColor }) => (
              <TouchableOpacity
                onPress={() => {
                  setColorPicker(true);
                  setColorPickerType('bgColor');
                }}>
                <FA5 name="highlighter" size={20} color={tintColor} />
              </TouchableOpacity>
            ),
          }}
          style={{ backgroundColor: colors.primary, width: SCREEN_WIDTH - 30 }}
        />
      )}
      <RichEditor
        ref={richText}
        onChange={onChangeText}
        placeholder={placeholder}
        initialContentHTML={value}
        androidHardwareAccelerationDisabled={true}
        style={{ ...styles.richTextEditorStyle, opacity: 0.99 }}
        editorStyle={{ backgroundColor: colors.background, color: colors.text }}
        initialHeight={100}
        injectedJavaScript='document.body.style.webkitUserSelect = "none";'
        injectedJavaScriptBeforeContentLoaded='document.body.style.webkitUserSelect = "none";'
        editorInitializedCallback={editorInitializedCallback}
        // scrollEnabled={false}
        // mixedContentMode={'never'} // security
        // startInLoadingState={true} // when starting this component
        // javaScriptEnabled={true} 
        // focusable
      />
    </View>
  );
};
