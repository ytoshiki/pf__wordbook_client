import { connect } from 'react-redux';
import { State } from '../types/state';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { resetSearch, store } from '../redux';
import '../styles/components/SearchResult.scss';
import TopImage from '../assets/images/top.png';
import { ReactComponent as ChevronDown } from '../assets/images/chevron-down.svg';

interface SearchProps {
  result: { definitions: { word: string; definition: string; example: null | string; type: string }[] };
  images: string[];
  loading: boolean;
  resetSearch: any;
  error: string | null;
}

const SearchResult: React.FC<SearchProps> = ({ result, images, loading, resetSearch, error }) => {
  useEffect(() => {
    resetSearch();
  }, [resetSearch]);

  const wordSearched = result.definitions.length > 0 ? result.definitions[0].word : '';

  const imageList =
    images &&
    images.map((image, index) => {
      return (
        <li key={index} className='search-result__item-img'>
          <div className='search-result__img'>
            <img src={image} alt='' />
          </div>
        </li>
      );
    });

  const definitionList =
    result.definitions &&
    result.definitions.map((word, index) => {
      return (
        <div key={index} className='search-result__block'>
          <div className='search-result__type'>{word.type}</div>
          <div className='search-result__usage'>
            <div className='search-result__index'>{index + 1}</div>
            <ul className='search-result__list' key={uuidv4()}>
              <li className='search-result__item definition'>{word.definition}</li>
              {word.example && <li className='search-result__item example'>{word.example}</li>}
            </ul>
          </div>
        </div>
      );
    });

  return (
    <div className='search-result'>
      <div className='wrapper'>
        <div className='search-result__inner'>
          {loading && (
            <div className='sk-chase-wrapper'>
              <div className='sk-chase'>
                <div className='sk-chase-dot'></div>
                <div className='sk-chase-dot'></div>
                <div className='sk-chase-dot'></div>
                <div className='sk-chase-dot'></div>
                <div className='sk-chase-dot'></div>
                <div className='sk-chase-dot'></div>
              </div>
            </div>
          )}
          {error && <div className='no-match'>{error}</div>}
          {!wordSearched && !images.length && !error && (
            <div className='prior-message'>
              <div className='prior-message__content'>
                <h1>Learn New Words Every day!</h1>
                <h3>How you can get the most out of this app</h3>
                <div className='svg-wrapper'>
                  <ChevronDown />
                </div>
                <ul>
                  <li>1. Search a word</li>
                  <li>2. Make your own wordbook</li>
                  <li>3. Take quizes from your wordbook</li>
                </ul>
              </div>
              <div className='prior-message__image'>
                <img src={TopImage} alt='' />
              </div>
            </div>
          )}

          {wordSearched && <h2 className='search-result__heading'>{wordSearched}</h2>}
          {definitionList}
          {images && (
            <ul key={uuidv4()} className='search-result__list-img'>
              {imageList}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store: State) => {
  return {
    result: store.search.result,
    images: store.search.images,
    loading: store.search.loading,
    error: store.search.error
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    resetSearch: () => dispatch(resetSearch())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
