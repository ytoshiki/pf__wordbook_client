import axios from 'axios';
import { SearchTypes } from '../../actions/actionTypes/search/searchActionTypes';

export const searchWord = (word: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: SearchTypes.ACTION_START
    });
    try {
      const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + '/search/' + word);
      if (!response.data) {
        throw new Error('Your search terms did not match any entries.');
      }

      dispatch({
        type: SearchTypes.SEARCH_WORD,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: SearchTypes.ACTION_ERROR,
        payload: 'Your search terms did not match any entries.'
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
        throw new Error('Your search terms did not match any entries.');
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
        payload: 'Your search terms did not match any entries.'
      });
    }
  };
};

export const resetSearch = () => {
  return function (dispatch: any) {
    dispatch({ type: SearchTypes.SEARCH_RESET });
  };
};
