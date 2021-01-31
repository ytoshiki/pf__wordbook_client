import { connect } from 'react-redux';
import { State } from '../types/state';

import ListSaveForm from '../components/ListSaveForm';
import SearchResult from '../components/SearchResult';
import { useEffect } from 'react';
import '../styles/pages/Home.scss';

const Home: React.FC<State> = ({ user, wordList }) => {
  useEffect(() => {
    console.log('Home Rendered');
  }, []);
  return (
    <div className='home'>
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
