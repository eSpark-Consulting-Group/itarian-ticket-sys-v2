import { SelectFields } from '../types';

//? ------------------------------ Tickets Selector Fields

export const priorityList: SelectFields[] = [
  {
    id: 1,
    name: 'Priority 1',
  },
  {
    id: 2,
    name: 'Priority 2',
  },
  {
    id: 3,
    name: 'Priority 3',
  },
];

//? ------------------------------- Configuration Selector Fields

export const contactNameList: SelectFields[] = [
  {
    id: 0,
    name: 'Steven Howard',
  },
  {
    id: 1,
    name: 'Blake Wesker',
  },
  {
    id: 2,
    name: 'John Doe',
  },
];

export const whereList: SelectFields[] = [
  {
    id: 0,
    name: 'Remote',
  },
  {
    id: 1,
    name: 'On-site',
  },
  {
    id: 2,
    name: 'In-house',
  },
];

//? ------------------------------- Compose Note Selector Fields
export const stNotesList: SelectFields[] = [
  {
    id: 0,
    name: 'Hello',
  },
  {
    id: 1,
    name: 'Hey',
  },
  {
    id: 2,
    name: 'Hi',
  },
];

export const GracePeriodList: SelectFields[] = [
  {
    id: 1,
    name: '6 Hours',
  },
  {
    id: 2,
    name: '12 Hours',
  },
  {
    id: 3,
    name: '18 Hours',
  },
  {
    id: 4,
    name: '24 Hours',
  },
  {
    id: 5,
    name: '36 Hours',
  },
  {
    id: 6,
    name: '48 Hours',
  },
];

export const PosList: SelectFields[] = [
  {
    id: 1,
    name: 'open',
  },
  {
    id: 2,
    name: 'closed',
  },
  {
    id: 3,
    name: 'spam',
  },
  {
    id: 4,
    name: 'deleted',
  },
];
