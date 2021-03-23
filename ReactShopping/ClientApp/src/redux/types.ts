import { User } from "../models";

export enum USER_ACTION_TYPE {
  AUTH_USER = "USER_ACTION_TYPE_AUTH_USER",
  UNAUTH_USER = "USER_ACTION_TYPE_UNAUTH_USER",
  AUTH_FAILURE = "USER_ACTION_TYPE_AUTH_FAILURE",
  AUTH_SUCCESS = "USER_ACTION_TYPE_AUTH_SUCCESS",
  FETCHING_USER = "USER_ACTION_TYPE_FETCHING_USER"
}

export interface UserState {
  user: User;
  isFetching: boolean;
  error: string;
  isAuthed: boolean;
  authedId: string;
  token: string;
}

export interface AuthAction {
  type: USER_ACTION_TYPE;
  id: string;
  token: string;
}

export interface UnAuthAction {
  type: USER_ACTION_TYPE;
}

export interface AuthSuccessAction {
  type: USER_ACTION_TYPE;
  id: string;
  user: User;
  timestamp: Date;
}

export interface AuthFailureAction {
  type: USER_ACTION_TYPE;
  error: string;
}

export interface FetchingUserAction {
  type: USER_ACTION_TYPE;
}

export type UserAction =
  | AuthAction
  | UnAuthAction
  | AuthSuccessAction
  | AuthFailureAction
  | FetchingUserAction;
