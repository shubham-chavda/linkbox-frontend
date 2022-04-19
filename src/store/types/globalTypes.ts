import { IUser } from '../../types/User.interface';
// import { ActionType } from 'typesafe-actions';

// import * as globalAction from './globalAction';
export interface IGlobalState {
	user: IUser | null;
	globalLoading: boolean;
}

export enum GlobalActionTypes {
	LOGIN_USER = 'LOGIN_USER',
	LOGOUT_USER = 'LOGOUT_USER',
	GET_USER_DETAILS = 'GET_USER_DETAILS',
	SET_USER_DETAILS = 'SET_USER_DETAILS',
	TOGGLE_LOADING = 'TOGGLE_LOADING'
}

// export type GlobalAction = ActionType<typeof globalAction>;
