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
    result: { definition: string; example: null | string; type: string }[];
    loading: boolean;
    images: string[];
  };
  wordList: {
    lists: [
      {
        id: '';
        word: '';
      }
    ];
    list: {
      id: '';
      word: '';
      memo: null;
      examples: null;
    };
    error: null;
    loading: false;
    message: '';
  };
}
