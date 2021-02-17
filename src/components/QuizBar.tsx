import { State } from '../types/state';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/components/QuizBar.scss';

interface QuizProps {
  lists: {
    word: string;
    id: string;
  }[];
}

const QuizBar: React.FC<QuizProps> = ({ lists }) => {
  return (
    <div className='quiz-bar'>
      <h3 className='quiz-bar__heading'>Quiz</h3>
      {lists.length > 0 ? (
        <Link to='/quiz' className='quiz-bar__take'>
          Start Quizes
        </Link>
      ) : (
        <div className='quiz-bar__suggest'></div>
      )}
    </div>
  );
};

const mapStateToProps = (store: State) => {
  return {
    lists: store.wordList.lists
  };
};

// const mapDispatchToProps = (dispatch: any) => {};

export default connect(mapStateToProps)(QuizBar);
