import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';
// import {configure, shallow} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({adapter: new Adapter()});

describe('auth reducer', () => {
    it('should return the initial state',()=>{
        expect(reducer(undefined,{})).toEqual({
            token: null,
            userId:null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store token upon the login',()=>{
        expect(reducer({
            token: null,
            userId:null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        },{
            type:actionTypes.AUTH_SUCCESS,
            idToken: "some-token",
            userId: "some-user-id"
        })).toEqual({
            token: "some-token",
            userId:"some-user-id",
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
});
