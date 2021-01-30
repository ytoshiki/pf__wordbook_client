import { useState, useEffect } from 'react';
import { searchImage, searchWord } from '../redux';
import { connect } from 'react-redux';

interface SearchProps {
  searchWord: any;
  searchImage: any;
}

const SearchForm: React.FC<SearchProps> = ({ searchWord, searchImage }) => {
  const [button, setButton] = useState(1);
  const [word, setWord] = useState('');

  useEffect(() => {
    console.log('SearchForm Rendered');
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!word) return;
    if (button === 1) {
      searchWord(word);
    } else if (button === 2) {
      searchImage(word);
    }
  };

  return (
    <form action='' onSubmit={onSubmit}>
      <input type='text' value={word} onChange={(e) => setWord(e.target.value)} />
      <div className='buttons'>
        <div>Search By</div>
        <button onClick={() => setButton(1)}>Meaning</button>
        <button onClick={() => setButton(2)}>Image</button>
      </div>
    </form>
  );
};

// const mapStateToProps = (store: State) => {
//   return {
//     search: store.search,
//     loading: store.search.loading
//   };
// };

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchWord: (word: string) => dispatch(searchWord(word)),
    searchImage: (word: string) => dispatch(searchImage(word))
  };
};

export default connect(null, mapDispatchToProps)(SearchForm);
