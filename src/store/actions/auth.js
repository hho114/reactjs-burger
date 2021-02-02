import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as api from './api';

export const authStart = ()=>{
    return {
         type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId)=>{
    
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail=(error)=>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const logout = ()=>{

    localStorage.clear('token');
    localStorage.clear('expirationDate');
    localStorage.clear('userId');
    return{
        type:actionTypes.AUTH_LOGOUT,

    }
}

export const checkAuthTimeOut = (expirationTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime*1000);
    };
};

export const auth = (email, password, isSignup)=>{
    return dispatch =>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken: true
        };
        let url = api.SIGNUP;
        if (!isSignup){
            url = api.SIGNIN;
        }
        axios.post(url,authData)
        .then(response=>{
            console.log(response);
            const expirationDate = new Date(new Date().getTime() +response.data.expiresIn * 1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeOut(response.data.expiresIn)); 
        })
        .catch(error =>{
            console.log(error);
            dispatch(authFail(error.response.data.error));
        })

    };
};

export const setAuthRedirectPath =(path)=>{
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    };
};

export const authCheckState = ()=>{
    return dispatch=>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else
        {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            }
            else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000));
            }
            
        }
    };
};