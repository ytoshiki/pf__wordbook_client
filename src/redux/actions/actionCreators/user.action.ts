import axios from 'axios';
import { UserTypes } from '../actionTypes/user/userActionTypes';

interface SignUp {
  username: string;
  email: string;
  password: string;
}

interface SignIn {
  email: string;
  password: string;
}

export const signin = ({ email, password }: SignIn) => {
  return async (dispatch: any) => {
    dispatch({
      type: UserTypes.ACTION_START
    });
    try {
      const endPoint = `${process.env.REACT_APP_API_ENDPOINT}/users/signin`;
      const result = await axios.post(endPoint, {
        email,
        password
      });

      if (result.data.success === false) {
        throw new Error('');
      }

      sessionStorage.setItem('jwt', result.data.token);

      dispatch({
        type: UserTypes.SIGN_IN,
        payload: {
          user: result.data.data.username,
          token: result.data.token
        }
      });
    } catch (error) {
      dispatch({
        type: UserTypes.ACTION_ERROR,
        payload: error.message || 'Failed to sign in'
      });
    }
  };
};

export const signup = ({ username, email, password }: SignUp) => {
  return async (dispatch: any) => {
    dispatch({
      type: UserTypes.ACTION_START
    });
    try {
      const endPoint = `${process.env.REACT_APP_API_ENDPOINT}/users/signup`;
      const result = await axios.post(endPoint, {
        username,
        email,
        password
      });

      if (result.data.success === false) {
        throw new Error();
      }
      sessionStorage.setItem('jwt', result.data.token);

      dispatch({
        type: UserTypes.SIGN_UP,
        payload: {
          user: result.data.data.username,
          token: result.data.token
        }
      });
    } catch (error) {
      dispatch({
        type: UserTypes.ACTION_ERROR,
        payload: error.message || 'Failed to sign up'
      });
    }
  };
};

export const logout = () => {
  return async (dispatch: any) => {
    dispatch({
      type: UserTypes.ACTION_START
    });
    try {
      const endPoint = `${process.env.REACT_APP_API_ENDPOINT}/users/logout`;
      const jwt = sessionStorage.getItem('jwt');
      if (!jwt) {
        return dispatch({
          type: UserTypes.ACTION_ERROR
        });
      }
      const response = await axios.post(
        endPoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
      if (!response.data.success === true) {
        throw new Error();
      }

      sessionStorage.removeItem('jwt');

      dispatch({
        type: UserTypes.LOG_OUT
      });
    } catch (error) {
      dispatch({
        type: UserTypes.ACTION_ERROR,
        payload: error.message || 'Failed to log out'
      });
    }
  };
};
