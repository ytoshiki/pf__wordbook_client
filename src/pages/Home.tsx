import { connect } from 'react-redux';
import { State } from '../types/state';
import SearchForm from '../components/SearchForm';
import ListSaveForm from '../components/ListSaveForm';
import SearchResult from '../components/SearchResult';
import { useEffect } from 'react';

const Home: React.FC<State> = ({ user, wordList }) => {
  useEffect(() => {
    console.log('Home Rendered');
  }, []);
  return (
    <div>
      <SearchForm />
      <SearchResult />
      <ListSaveForm />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
  search: state.search,
  wordList: state.wordList
});

export default connect(mapStateToProps)(Home);
