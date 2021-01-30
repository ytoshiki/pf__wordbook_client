import { userReducer } from './userReducer/user.reducer';
import { searchReducer } from './searchReducer/search.reducer';
import { wordListReducer } from './wordListReducer/wordList.reducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  wordList: wordListReducer
});
