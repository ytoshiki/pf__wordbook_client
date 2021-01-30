import { WordListTypes } from './wordListActionTypes';

interface WordListActionError {
  type: WordListTypes.ACTION_ERROR;
  payload: string;
}

interface WordListActionStart {
  type: WordListTypes.ACTION_START;
}

interface WordListSaveList {
  type: WordListTypes.SAVE_LIST;
  payload: string;
}

interface WordListGetList {
  type: WordListTypes.GET_LIST;
  payload: {
    id: string;
    word: string;
    memo: null | string;
    examples:
      | null
      | {
          id: string;
          example: string;
        }[];
  };
}

interface WordListGetLists {
  type: WordListTypes.GET_LISTS;
  payload: {
    id: string;
    word: string;
  }[];
}

interface WordListDeleteList {
  type: WordListTypes.DELETE_LIST;
  payload: string;
}

export type WordListType = WordListActionStart | WordListActionError | WordListSaveList | WordListGetList | WordListGetLists | WordListDeleteList;
