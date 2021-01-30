import { connect } from 'react-redux';
import { State } from '../types/state';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

interface SearchProps {
  result: { definition: string; example: null | string; type: string }[];
  images: string[];
  loading: boolean;
}

const SearchResult: React.FC<SearchProps> = ({ result, images, loading }) => {
  useEffect(() => {
    console.log('Search Result Rendered');
  }, []);
  return (
    <div>
      {loading && <div>loading...</div>}
      {result &&
        result.map((word, index) => {
          return (
            <ul key={uuidv4()}>
              <li>Type: {word.type}</li>
              <li>Definition: {word.definition}</li>
              {word.example && <li>Example: {word.example}</li>}
            </ul>
          );
        })}
      {images &&
        images.map((image, index) => {
          return (
            <ul key={uuidv4()}>
              <li>
                <div>
                  <img src={image} alt='' />
                </div>
              </li>
            </ul>
          );
        })}
    </div>
  );
};

const mapStateToProps = (store: State) => {
  return {
    result: store.search.result,
    images: store.search.images,
    loading: store.search.loading
  };
};

export default connect(mapStateToProps)(SearchResult);
