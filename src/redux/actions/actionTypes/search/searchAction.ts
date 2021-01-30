import { SearchTypes } from './searchActionTypes';

export interface SuccessPayload {
  word: string;
  definition: string;
  example: string | null;
}

interface SearchActionError {
  type: SearchTypes.ACTION_ERROR;
  payload: string;
}

interface SearchActionStart {
  type: SearchTypes.ACTION_START;
}

interface SearchWord {
  type: SearchTypes.SEARCH_WORD;
  payload: SuccessPayload[];
}

interface SearchImage {
  type: SearchTypes.SEARCH_IMAGE;
  payload: string[];
}

export type SearchAction = SearchActionStart | SearchActionError | SearchWord | SearchImage;
