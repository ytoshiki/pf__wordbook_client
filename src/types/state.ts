export interface State {
  user: {
    error: string | null;
    loading: boolean;
    user: {
      name: string;
      token: string;
    };
  };
  search: {
    error: string | null;
    result: { definitions: { definition: string; example: null | string; type: string }[]; word: string };
    loading: boolean;
    images: string[];
  };
  wordList: {
    lists: [
      {
        id: string;
        word: string;
      }
    ];
    list: {
      id: string;
      word: string;
      memo: null | string;
      examples: [] | { _id: string; example: string }[];
    };
    error: null | string;
    loading: boolean;
    message: string;
  };
}
