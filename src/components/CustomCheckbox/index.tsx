import { TouchableOpacity } from 'react-native';
import FA from 'react-native-vector-icons/Feather';

type CustomCheckboxProps = {
  checked: boolean;
  onPress: () => void;
};

const CustomCheckbox = ({ checked, onPress }: CustomCheckboxProps) => (
  <TouchableOpacity onPress={onPress}>
    <FA
      name={checked ? 'check-square' : 'square'}
      size={22}
      color={checked ? '#3B82F6' : '#9CA3AF'}
    />
  </TouchableOpacity>
);

export default CustomCheckbox;
