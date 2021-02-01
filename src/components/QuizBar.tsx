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
      Quiz
      <br />
      {lists.length > 0 && <Link to='/quiz'>Take Quiz</Link>}
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
