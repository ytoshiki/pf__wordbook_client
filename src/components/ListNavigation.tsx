import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getLists } from '../redux';
import { State } from '../types/state';
import { Link } from 'react-router-dom';
import '../styles/components/ListNavigation.scss';
import { ReactComponent as DateIcon } from '../assets/images/date.svg';
import { ReactComponent as AlphabetIcon } from '../assets/images/alphabet.svg';
import { motion, AnimatePresence } from 'framer-motion';

interface ListNavigationProps {
  getLists: any;
  lists: {
    word: string;
    id: string;
  }[];
  loading: boolean;
  success: null | string;
}

interface SortedList {
  word: string;
  id: string;
}

const ListNavigation: React.FC<ListNavigationProps> = ({ getLists, lists, loading, success }) => {
  const [sortList, setSortList] = useState<SortedList[]>([]);

  useEffect(() => {
    getLists();
    // setIsSuccess(success);
  }, [getLists, success, sortList]);

  const onClick = () => {
    if (sortList.length > 0) {
      setSortList([]);
      return;
    }

    let SortedLists = [];
    SortedLists.push(Object.assign({}, lists));

    const defaultListArray = Object.values(SortedLists[0]);

    function compare(a: { word: string; id: string }, b: { word: string; id: string }) {
      const wordA = a.word.toUpperCase();
      const wordB = b.word.toUpperCase();

      let comparison = 0;

      if (wordA > wordB) {
        comparison = 1;
      }

      if (wordA < wordB) {
        comparison = -1;
      }

      return comparison;
    }

    setSortList(defaultListArray.sort(compare));
  };

  const wordList =
    lists &&
    lists.map((list) => {
      return (
        <li key={list.id} className='list-navigation__item'>
          <Link to={`/note/${list.id}`}>{list.word}</Link>
        </li>
      );
    });
  const sortedList = sortList
    ? sortList.map((list) => {
        return (
          <li key={list.id} className='list-navigation__item'>
            <Link to={`/note/${list.id}`}>{list.word}</Link>
          </li>
        );
      })
    : null;

  const dateSortIcon = (
    <div className='list-navigation__sort'>
      <div className='list-navigation__icon'>
        <DateIcon />
      </div>
    </div>
  );
  const alphabetIcon = (
    <div className='list-navigation__sort'>
      <div className='list-navigation__icon'>
        <AlphabetIcon />
      </div>
    </div>
  );

  return (
    <div className='list-navigation'>
      <h3 className='list-navigation__heading'>Word list</h3>
      <button className='list-navigation__sort-button' onClick={onClick}>
        {sortList.length > 0 ? 'date' : 'alphabet'}
        {sortList.length > 0 ? dateSortIcon : alphabetIcon}
      </button>

      <ul className='list-navigation__list'>{sortList.length > 0 ? sortedList : wordList}</ul>
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
