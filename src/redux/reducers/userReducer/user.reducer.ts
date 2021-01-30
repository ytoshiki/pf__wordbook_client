import { UserAction } from '../../actions/actionTypes/user/userAction';
import { UserTypes } from '../../actions/actionTypes/user/userActionTypes';

const initialState = {
  user: {
    name: '',
    token: ''
  },
  loading: false,
  error: null
};

interface UserState {
  user: {
    name: string;
    token: string;
  };
  loading: boolean;
  error: null | string;
}

export const userReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case UserTypes.SIGN_UP:
      return {
        ...state,
        user: {
          name: action.payload.user,
          token: action.payload.token
        },
        loading: false
      };
    case UserTypes.SIGN_IN:
      return {
        ...state,
        user: {
          name: action.payload.user,
          token: action.payload.token
        },
        loading: false
      };
    case UserTypes.LOG_OUT:
      return {
        ...state,
        user: {
          name: '',
          token: ''
        },
        loading: false
      };
    case UserTypes.ACTION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case UserTypes.ACTION_START:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
