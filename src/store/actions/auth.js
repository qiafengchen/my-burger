import Axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    };
};

export const authSuccess = (token,localId) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        localId:localId
    };
};

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userID');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARY4zQjnvvBKrTTQF24nYGTi0HSzIrb54';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARY4zQjnvvBKrTTQF24nYGTi0HSzIrb54'
        }
        Axios.post(url,authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userID', response.data.localId);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error=>{
            dispatch(authFail(error.response.data.error));
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userID = localStorage.getItem('userID')
                dispatch(authSuccess(token,userID))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
}