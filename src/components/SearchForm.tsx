import { useState } from 'react';
import { resetSearch, searchImage, searchWord } from '../redux';
import { connect } from 'react-redux';
import { State } from '../types/state';
import '../styles/components/SearchForm.scss';
import { useHistory } from 'react-router-dom';
import { ReactComponent as SearchLogo } from '../assets/images/search.svg';

interface SearchProps {
  searchWord: any;
  searchImage: any;
  resetSearch: any;
  images: string[];
  result: { definitions: { definition: string; example: null | string; type: string }[]; word: string };
  isLoggedIn: string;
}

const SearchForm: React.FC<SearchProps> = ({ searchWord, searchImage, images, result, resetSearch, isLoggedIn }) => {
  const [button, setButton] = useState(1);
  const [word, setWord] = useState('');
  const [imageName, setImageName] = useState('');
  const history = useHistory();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!word) return;
    history.push('/');

    if (images.length > 0 && result.word) {
      resetSearch();
    }

    if (button === 1) {
      if (word !== imageName) {
        resetSearch();
      }

      searchWord(word);
    } else if (button === 2) {
      if (result.word !== word) {
        resetSearch();
      }

      setImageName(word);
      searchImage(word);
    }

    setWord('');
  };

  const loggedStyle_form = isLoggedIn ? 'logged' : '';

  return (
    <div className='search-form'>
      <div className='wrapper'>
        <div className='search-form__inner'>
          <form className={`search-form__form ${loggedStyle_form}`} action='' onSubmit={onSubmit}>
            {/* <label htmlFor=''>Search For a Word</label> */}
            <div className='search-form__input-wrapper'>
              <input placeholder='Search For a Word' className='search-form__input' type='text' value={word} onChange={(e) => setWord(e.target.value)} />
              <div className='search-form__logo'>
                <SearchLogo />
              </div>
            </div>
            <div className='search-form__buttons'>
              <button disabled={word ? false : true} className='search-form__button' onClick={() => setButton(1)}>
                Definitions
              </button>
              <button disabled={word ? false : true} className='search-form__button' onClick={() => setButton(2)}>
                Images
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store: State) => {
  return {
    images: store.search.images,
    result: store.search.result
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchWord: (word: string) => dispatch(searchWord(word)),
    searchImage: (word: string) => dispatch(searchImage(word)),
    resetSearch: () => dispatch(resetSearch())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
