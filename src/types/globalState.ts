import { State } from '@hookstate/core';

export interface UserInfo {
  email?: string;
  subDomain?: string;
  token?: string;
  userId?: string;
  user_name?: string;
}

export type User = {
  userDetails: any;
  currentStatus: boolean;
  currentGoneTo: {
    id: number;
    name: string;
  };
  additionalInfo: string;
  dateBack: string;
  timeBack: string;
  user: State<UserInfo>;
  pinCode: string | null;
  users: State<any[]>;
  locationToken: string | null;
  countries: State<any[]>;
  states: State<any[]>;
};
