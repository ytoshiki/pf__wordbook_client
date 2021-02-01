import ListSaveForm from '../components/ListSaveForm';
import SearchResult from '../components/SearchResult';

import '../styles/pages/Home.scss';

const Home: React.FC = () => {
  return (
    <div className='home'>
      <SearchResult />

      <ListSaveForm />
    </div>
  );
};

export default Home;
