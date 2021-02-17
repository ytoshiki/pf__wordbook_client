import axios from 'axios';
import { SearchTypes } from '../../actions/actionTypes/search/searchActionTypes';

interface Word {
  partOfSpeech: string;
  text: string;
  word: string;
}

export const searchWord = (word: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: SearchTypes.ACTION_START
    });
    try {
      const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + '/search/' + word);
      if (response.data.success === false) {
        throw new Error('Your search terms did not match any entries');
      }

      const returnedData = response.data.map((word: Word) => {
        return {
          word: word.word,
          definition: word.text,
          example: null,
          type: word.partOfSpeech
        };
      });

      dispatch({
        type: SearchTypes.SEARCH_WORD,
        payload: {
          definitions: returnedData
        }
      });
    } catch (error) {
      dispatch({
        type: SearchTypes.ACTION_ERROR,
        payload: 'Your search terms did not match any entries'
      });
    }
  };
};

export const searchImage = (word: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: SearchTypes.ACTION_START
    });
    try {
      const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + '/images/' + word);
      if (!response.data) {
        throw new Error('Your search terms did not match any entries');
      }

      const images = response.data.data.map((image: { previewURL: string }) => {
        return image.previewURL;
      });

      dispatch({
        type: SearchTypes.SEARCH_IMAGE,
        payload: images
      });
    } catch (error) {
      dispatch({
        type: SearchTypes.ACTION_ERROR,
        payload: 'Your search terms did not match any entries'
      });
    }
  };
};

export const resetSearch = () => {
  return function (dispatch: any) {
    dispatch({ type: SearchTypes.SEARCH_RESET });
  };
};
