import axios from "axios";
import * as querystring from "querystring";

export const authenticate = (username: string, password: string) => {
    return axios.post('/connect/token', 
        querystring.stringify({
            username: username,
            password: password,
            grant_type: 'password',
            client_id: 'react_shopping',
            client_secret: 'react_shopping_secret',
            scope: 'openid profile email name'
        }), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
    );
}

export const checkIfAuthenticated = (store: any) => {
    return store.getState().isAuthed;
}