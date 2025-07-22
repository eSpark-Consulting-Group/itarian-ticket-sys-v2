import { AdditionalButtons } from '../types';

const AdditionalButtonStyle = {
  color: '#fff',
  labelTextColor: '#000000c2',
  labelStyle: { backgroundColor: '#fff' },
  style: {
    backgroundColor: '#28648f',
    borderRadius: 1000,
  },
};

//? -------- Float Action Additional Buttons for Multiple Screens

export const SchAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'tag-plus-outline',
    label: 'Add Ticket',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
];

export const UnschAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'tag-plus-outline',
    label: 'Add Ticket',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
];

export const STicketsAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'tag-plus-outline',
    label: 'Add Ticket',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
];

export const NotesAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'clipboard-plus',
    label: 'Standard Note',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
  {
    icon: 'clock-plus-outline',
    label: 'Time Stamp',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
];

export const AttachmentAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'file-search-outline',
    label: 'Add Files',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
  {
    icon: 'image',
    label: 'Choose Image',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
  {
    icon: 'camera-outline',
    label: 'Take Photo',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
];

export const CollaboratorAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'account-search',
    label: 'Search Existing User',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
  {
    icon: 'account-plus',
    label: 'Add New User',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
];
