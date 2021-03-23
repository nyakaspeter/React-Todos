import { AuthAction, UnAuthAction, AuthFailureAction, AuthSuccessAction, FetchingUserAction, USER_ACTION_TYPE } from "../types"
import { Dispatch } from "redux";
import { authenticate } from "../../components";
import { AxiosResponse } from "axios";
import { User } from "../../models";
import * as jwt_decode from "jwt-decode";

export const authUser = (id: string, token: string): 
  AuthAction => ({
    type: USER_ACTION_TYPE.AUTH_USER,
    id,
    token
  });

export const unauthUser = ():
  UnAuthAction => ({
    type: USER_ACTION_TYPE.UNAUTH_USER
  });

export const fetchingUserFailure = (error: string):
  AuthFailureAction => ({
    type: USER_ACTION_TYPE.AUTH_FAILURE,
    error
  });  

export const fetchingUserSuccess  = (id: string, user: User, timestamp: Date): 
  AuthSuccessAction => ({
    type: USER_ACTION_TYPE.AUTH_SUCCESS,    
    id,
    timestamp,
    user
  });

export const fetchingUser = (): 
  FetchingUserAction => ({
    type: USER_ACTION_TYPE.FETCHING_USER
  });

export const fetchAndHandleAuthentication = (history: any, username: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchingUser());
    authenticate(username, password)
    .then((response: AxiosResponse) => {
      //TODO: token to localStorage
      const user = jwt_decode(response.data.access_token);
      dispatch(fetchingUserSuccess(user.sub, {
        id: user.sub,
        name: user.name,
        email: user.email,
        expirationDate: new Date()
      }, new Date()));
      dispatch(authUser(user.sub, response.data.access_token));
      history.push("/dashboard");      
    }).catch((error) => dispatch(fetchingUserFailure(error)));
  }
}