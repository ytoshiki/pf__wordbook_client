import { SearchTypes } from '../../actions/actionTypes/search/searchActionTypes';
import { SearchAction } from '../../actions/actionTypes/search/searchAction';

interface SearchState {
  result: {
    definitions: {
      word: string;
      definition: string;
      example: string | null;
    }[];
    word: string;
  };
  images: string[];
  loading: boolean;
  error: null | string;
}

const initialState = {
  result: {
    definitions: [],
    word: ''
  },
  images: [],
  loading: false,
  error: null
};

export const searchReducer = (state: SearchState = initialState, action: SearchAction) => {
  switch (action.type) {
    case SearchTypes.ACTION_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SearchTypes.ACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SearchTypes.SEARCH_WORD:
      return {
        ...state,
        loading: false,
        result: action.payload,
        error: null
      };
    case SearchTypes.SEARCH_IMAGE:
      return {
        ...state,
        loading: false,
        error: null,
        images: action.payload
      };
    case SearchTypes.SEARCH_RESET:
      return {
        ...state,
        result: {
          definitions: [],
          word: ''
        },
        images: [],
        loading: false,
        error: null
      };
    default:
      return state;
  }
};
