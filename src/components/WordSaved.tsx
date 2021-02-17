import { deleteList, getList } from '../redux';
import { State } from '../types/state';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/components/WordSaved.scss';

interface WordSavedProps {
  list: { id: string; word: string; memo: string | null; examples: { _id: string; example: string }[] };
  loading: boolean;
  getList: any;
  deleteList: any;
  success: string;
}

const WordSaved: React.FC<WordSavedProps> = ({ list, loading, getList, deleteList }) => {
  const location = useLocation().pathname.split('/').pop();
  const history = useHistory();

  useEffect(() => {
    getList(location);
  }, [getList, location]);

  const onClick = () => {
    if (window.confirm('Once you delete the list, you lose the data. Are you sure that you delete the list?')) {
      deleteList(location);
      history.push('/');
    }

    return;
  };

  let exampleArray;
  if (list.examples.length > 0) {
    exampleArray = list.examples.map((ex: { _id: string; example: string }) => {
      return (
        <li key={ex._id} className='note-preview__example'>
          {ex.example}
        </li>
      );
    });
  }

  return (
    <div className='note-preview'>
      {list && (
        <div>
          <div className='note-preview__wrapper'>
            <h2 className='note-preview__word'>{list.word}</h2>
            <small>examples</small>
            <ul>{exampleArray}</ul>
            {list.memo && (
              <div className='note-preview__memo'>
                <small>memo</small>
                <p>{list.memo}</p>
              </div>
            )}
          </div>
          <div>
            <button onClick={onClick} className='note-preview__delete'>
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (store: State) => {
  return {
    list: store.wordList.list,
    loading: store.wordList.loading,
    success: store.wordList.message
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getList: (id: string) => dispatch(getList(id)),
    deleteList: (id: string) => dispatch(deleteList(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordSaved);
