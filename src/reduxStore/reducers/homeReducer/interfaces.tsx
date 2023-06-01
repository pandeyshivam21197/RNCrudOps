import {IRadioButton} from '../../../components/atoms/radioButtonList';

export interface IUserInfo {
  name?: string;
  surname?: string;
  gender?: string;
  info?: string;
  id?: string;
}

export interface IHomeScreenState {
  users: IUsers;
  userForAddOrUpdate?: IUserInfo;
  genderRadioButton: IRadioButton[];
}

export type IUsers = Record<string, IUserInfo>;
