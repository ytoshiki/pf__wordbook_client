import axios from "axios";
import { SearchTypes } from "../../actions/actionTypes/search/searchActionTypes";

interface Word {
  type: string;
  definition: string;
  word: string;
}

export const searchWord = (word: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: SearchTypes.ACTION_START,
    });
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_ENDPOINT + "/search/" + word
      );

      console.log(response.data);

      if (response.data.success === false) {
        console.log("error");
        throw new Error("Your search terms did not match any entries");
      }

      const returnedData = response.data.data.definitions.map((word: Word) => {
        return {
          word: response.data.data.word,
          definition: word.definition,
          example: null,
          type: word.type,
        };
      });

      console.log(returnedData);

      dispatch({
        type: SearchTypes.SEARCH_WORD,
        payload: {
          definitions: returnedData,
        },
      });
    } catch (error) {
      dispatch({
        type: SearchTypes.ACTION_ERROR,
        payload: "Your search terms did not match any entries",
      });
    }
  };
};

export const searchImage = (word: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: SearchTypes.ACTION_START,
    });
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_ENDPOINT + "/images/" + word
      );
      if (!response.data) {
        throw new Error("Your search terms did not match any entries");
      }

      const images = response.data.data.map((image: { previewURL: string }) => {
        return image.previewURL;
      });

      dispatch({
        type: SearchTypes.SEARCH_IMAGE,
        payload: images,
      });
    } catch (error) {
      dispatch({
        type: SearchTypes.ACTION_ERROR,
        payload: "Your search terms did not match any entries",
      });
    }
  };
};

export const resetSearch = () => {
  return function (dispatch: any) {
    dispatch({ type: SearchTypes.SEARCH_RESET });
  };
};
