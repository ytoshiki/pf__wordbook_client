import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getLists } from '../redux';
import { State } from '../types/state';
import { v4 as uuidv4 } from 'uuid';

interface ListNavigationProps {
  getLists: any;
  lists: {
    word: string;
    id: string;
  }[];
  loading: boolean;
  success: null | string;
}

const ListNavigation: React.FC<ListNavigationProps> = ({ getLists, lists, loading, success }) => {
  const [isSuccess, setIsSuccess] = useState('');
  useEffect(() => {
    console.log('ListNavigation Rendered');

    getLists();

    if (success && success === 'List Saved Successfully') {
      setIsSuccess(String(uuidv4()));
    }
  }, [getLists, success]);

  return (
    <div>
      <h3>Word list</h3>
      {loading && <div>Loading...</div>}
      <ul>
        {lists &&
          lists.map((list) => {
            return <li key={list.id}>{list.word}</li>;
          })}
      </ul>
    </div>
  );
};

const mapStateToProps = (store: State) => {
  return {
    lists: store.wordList.lists,
    loading: store.wordList.loading,
    success: store.wordList.message
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getLists: () => dispatch(getLists())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListNavigation);
