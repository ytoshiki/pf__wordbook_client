import axios from 'axios';
import { WordListTypes } from '../actionTypes/wordList/wordListActionTypes';
import { store } from '../../store/store';

interface SaveData {
  word: string;
  examples: string[];
  memo: null | string;
}

interface WordListData {
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
  quiz: {
    answer: string;
    example: string[];
  };
  error: null | string;
  loading: boolean;
  message: null | string;
}

export const saveList = (data: SaveData) => {
  return async (dispatch: any) => {
    dispatch({
      type: WordListTypes.ACTION_START
    });
    try {
      const endPoint = `${process.env.REACT_APP_API_ENDPOINT}/lists`;
      const jwt = sessionStorage.getItem('jwt');
      if (!jwt) {
        return dispatch({
          type: WordListTypes.ACTION_ERROR,
          payload: 'Not Authorized'
        });
      }
      const response = await axios.post(endPoint, data, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      if (response.data.success !== true) {
        throw new Error();
      }

      dispatch({
        type: WordListTypes.SAVE_LIST,
        payload: 'List Saved Successfully'
      });
    } catch (error) {
      dispatch({
        type: WordListTypes.ACTION_ERROR,
        payload: error.message || 'Failed to save'
      });
    }
  };
};

export const getLists = () => {
  return async (dispatch: any) => {
    dispatch({
      type: WordListTypes.ACTION_START
    });
    try {
      const endPoint = `${process.env.REACT_APP_API_ENDPOINT}/lists`;
      const jwt = sessionStorage.getItem('jwt');
      if (!jwt) {
        return dispatch({
          type: WordListTypes.ACTION_ERROR,
          payload: 'Not Authorized'
        });
      }
      const response = await axios.get(endPoint, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      if (response.data.success !== true) {
        throw new Error();
      }

      const lists = response.data.data.map((list: { _id: string; word: string }) => {
        return {
          id: list._id,
          word: list.word
        };
      });

      dispatch({
        type: WordListTypes.GET_LISTS,
        payload: lists
      });
    } catch (error) {
      dispatch({
        type: WordListTypes.ACTION_ERROR,
        payload: error.message || 'Failed to get lists'
      });
    }
  };
};

export const getList = (id: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: WordListTypes.ACTION_START
    });
    try {
      const endPoint = `${process.env.REACT_APP_API_ENDPOINT}/lists/${id}`;
      const jwt = sessionStorage.getItem('jwt');
      if (!jwt) {
        return dispatch({
          type: WordListTypes.ACTION_ERROR,
          payload: 'Not Authorized'
        });
      }
      const response = await axios.get(endPoint, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      if (response.data.success !== true) {
        throw new Error();
      }

      const list: { _id: string; word: string; examples: [] | { id: string; example: string }[]; memo: null | string } = response.data.data;

      const returnedData = {
        id: list._id,
        word: list.word,
        examples: list.examples,
        memo: list.memo
      };

      dispatch({
        type: WordListTypes.GET_LIST,
        payload: returnedData
      });
    } catch (error) {
      dispatch({
        type: WordListTypes.ACTION_ERROR,
        payload: error.message || 'Failed to get list'
      });
    }
  };
};

export const deleteList = (id: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: WordListTypes.ACTION_START
    });
    try {
      const endPoint = `${process.env.REACT_APP_API_ENDPOINT}/lists/${id}`;
      const jwt = sessionStorage.getItem('jwt');
      if (!jwt) {
        return dispatch({
          type: WordListTypes.ACTION_ERROR,
          payload: 'Not Authorized'
        });
      }
      const response = await axios.delete(endPoint, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      if (response.data.success !== true) {
        throw new Error();
      }

      dispatch({
        type: WordListTypes.DELETE_LIST,
        payload: 'List Deleted Successfully'
      });
    } catch (error) {
      dispatch({
        type: WordListTypes.ACTION_ERROR,
        payload: error.message || 'Failed to delete list'
      });
    }
  };
};

export const takeQuiz = () => {
  return (dispatch: any) => {
    const wordList: WordListData = store.getState().wordList;

    if (!wordList.list) {
      return dispatch({
        type: WordListTypes.ACTION_ERROR,
        payload: 'Cound not find List: List is not set'
      });
    }

    dispatch({
      type: WordListTypes.QUIX_LIST,
      payload: {
        answer: wordList.list.word,
        example: wordList.list.examples
      }
    });
  };
};
