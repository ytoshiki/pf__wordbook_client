import { act } from 'react-dom/test-utils';
import { WordListType } from '../../actions/actionTypes/wordList/wordListAction';
import { WordListTypes } from '../../actions/actionTypes/wordList/wordListActionTypes';

const initialState = {
  lists: [
    {
      id: '',
      word: ''
    }
  ],
  list: {
    id: '',
    word: '',
    memo: null,
    examples: []
  },
  error: null,
  loading: false,
  message: null
};

interface WordListState {
  lists: {
    id: string;
    word: string;
  }[];
  list: {
    id: string;
    word: string;
    memo: null | string;
    examples:
      | []
      | {
          id: string;
          example: string;
        }[];
  };
  error: null | string;
  loading: boolean;
  message: null | string;
}

export const wordListReducer = (state: WordListState = initialState, action: WordListType) => {
  switch (action.type) {
    case WordListTypes.ACTION_START:
      return {
        ...state,
        loading: true
      };
    case WordListTypes.ACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case WordListTypes.SAVE_LIST:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload
      };
    case WordListTypes.GET_LISTS:
      return {
        ...state,
        loading: false,
        error: null,
        lists: action.payload,
        message: ''
      };
    case WordListTypes.GET_LIST:
      return {
        ...state,
        loading: false,
        error: null,
        list: action.payload
      };
    case WordListTypes.DELETE_LIST:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload
      };
    default:
      return state;
  }
};
