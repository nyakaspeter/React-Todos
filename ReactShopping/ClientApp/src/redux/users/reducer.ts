import { UserState, UserAction, AuthSuccessAction, AuthFailureAction, AuthAction, USER_ACTION_TYPE } from "../types";
import { User } from "../../models/user";

const initialUserState: User = {
    id: "",
    name: "",
    email: "",
    expirationDate: new Date()
}

function user(state: User = initialUserState, action: AuthSuccessAction): User {
    return {
        ...state,
        id: action.id,
        name: action.user.name,
        email: action.user.email,
        expirationDate: action.timestamp
    }
}

const initialState: UserState = {
    user: {
        id: "",
        name: "",
        email: "",
        expirationDate: new Date()
    },
    authedId: "",
    error: "",
    isAuthed: false,
    isFetching: false,
    token: ""
}

export function users(state: UserState = initialState, action: UserAction): UserState {
    switch (action.type) {
        case USER_ACTION_TYPE.AUTH_USER:
            const authAction = action as AuthAction;
            return {
                ...state,
                isAuthed: true,
                authedId: authAction.id,
                token: authAction.token
            }

        case USER_ACTION_TYPE.UNAUTH_USER:
            return {
                ...state,
                isAuthed: false,
                authedId: "",
            }

        case USER_ACTION_TYPE.AUTH_SUCCESS:
            const authSuccessAction = action as AuthSuccessAction;
            return authSuccessAction.user === null ?
                {
                    ...state,
                    isFetching: false,
                    error: "",
                }
                : {
                    ...state,
                    isFetching: false,
                    error: "",
                    user: user(state[authSuccessAction.id], authSuccessAction),
                }

        case USER_ACTION_TYPE.AUTH_FAILURE:
            const authFailureAction = action as AuthFailureAction;
            return {
                ...state,
                isFetching: false,
                error: authFailureAction.error,
            }

        case USER_ACTION_TYPE.FETCHING_USER:
            return {
                ...state,
                isFetching: true,
            }

        default:
            return state
    }
}