import { UserTypes } from './userActionTypes';

interface UserSignUp {
  type: UserTypes.SIGN_UP;
  payload: {
    user: string;
    token: string;
  };
}

interface UserSignIn {
  type: UserTypes.SIGN_IN;
  payload: {
    user: string;
    token: string;
  };
}

interface UserActionError {
  type: UserTypes.ACTION_ERROR;
  payload: string;
}

interface UserLogOut {
  type: UserTypes.LOG_OUT;
}

interface UserActionStart {
  type: UserTypes.ACTION_START;
}

export type UserAction = UserSignIn | UserSignUp | UserActionError | UserLogOut | UserActionStart;
