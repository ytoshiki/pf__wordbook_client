import { getList, takeQuiz } from '../redux';
import '../styles/pages/Quiz.scss';
import { State } from '../types/state';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReactComponent as CheckSVG } from '../assets/images/check.svg';
import { ReactComponent as CloseSVG } from '../assets/images/close.svg';

interface QuizProps {
  lists: {
    word: string;
    id: string;
  }[];
  getList: any;
  list: {
    id: string;
    word: string;
    memo: null | string;
    examples: [] | { _id: string; example: string }[];
  };
  takeQuiz: any;
  quiz: {
    answer: string;
    example: {
      example: string;
      _id: string;
    }[];
  };
  success: null | string;
}

const Quiz: React.FC<QuizProps> = ({ lists, getList, list, takeQuiz, quiz, success }) => {
  const [guess, setGuess] = useState('');

  const [result, setResult] = useState('');
  const [correct, setCorrect] = useState(false);
  // const [listClone, setListClone] = useState<List[]>([]);

  useEffect(() => {
    async function init() {
      console.log('Quiz rendered');
      const listClone = lists.map((list) => Object.assign({}, list));
      console.log(listClone);
      const randomNum = Math.floor(Math.random() * listClone.length);
      await getList(listClone[randomNum].id);
      takeQuiz();
      setCorrect(false);
      // setIsSuccess(success);
      // console.log(success);
    }

    init();
  }, [takeQuiz, lists, getList, correct]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!guess) {
      return;
    }

    if (!quiz.answer) {
      return;
    }

    setResult('');

    if (guess === quiz.answer) {
      setResult('Correct');
    }

    if (guess !== quiz.answer) {
      setResult('Wrong');
    }
  };

  const hideAnswer = (example: string) => {
    let keyword = '_';
    for (let i = 0; i < quiz.answer.length; i++) {
      keyword += '_';
    }
    return example.replace(quiz.answer, keyword);
  };

  const displayQuiz = quiz.answer ? (
    <div className='quiz-content__question'>
      {quiz.example.map((q) => {
        return <div key={q._id}>{hideAnswer(q.example)}</div>;
      })}
    </div>
  ) : null;

  const onClick = () => {
    setCorrect(true);
    setResult('');
    setGuess('');
  };

  return (
    <div className='quiz-content'>
      <h2>Q</h2>
      {displayQuiz}
      <form onSubmit={onSubmit} className='quiz-content__form'>
        <input className='quiz-content__input' type='text' value={guess} onChange={(e) => setGuess(e.target.value)} />
        <button className='quiz-content__button'>check</button>
      </form>
      {result && (
        <div className='quiz-content__result'>
          <div className='quiz-content__svg'>{result === 'Correct' ? <CheckSVG /> : <CloseSVG />}</div>
          {result}
        </div>
      )}
      {result === 'Correct' ? (
        <div className='quiz-content__next-wrapper'>
          <button className='quiz-content__next' onClick={onClick}>
            Try Again
          </button>
        </div>
      ) : (
        false
      )}
    </div>
  );
};

const mapStateToProps = (store: State) => {
  return {
    list: store.wordList.list,
    lists: store.wordList.lists,
    quiz: store.wordList.quiz,
    success: store.wordList.message
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getList: (id: string) => dispatch(getList(id)),
    takeQuiz: () => dispatch(takeQuiz())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
