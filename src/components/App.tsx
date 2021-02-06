import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Navigation from './Navigation';
import { useEffect, useState } from 'react';
import { State } from '../types/state';
import ListNavigation from './ListNavigation';
import { logout } from '../redux';
import '../styles/components/App.scss';
import Note from '../pages/Note';
import SearchForm from './SearchForm';
import QuizBar from './QuizBar';
import Quiz from '../pages/Quiz';
import NotFoundPage from '../pages/NotFoundPage';

interface Props {
  user: {
    name: string;
    token: string;
  };
  logout: any;
}

//

const App: React.FC<Props> = ({ user, logout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState('');
  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem('jwt') || '');
  }, [user, setIsLoggedIn, logout]);

  return (
    <Router>
      <>
        <Navigation logout={logout} isLoggedIn={isLoggedIn} />
        <SearchForm isLoggedIn={isLoggedIn} />
        <main className='main'>
          <div className='wrapper'>
            <div className='main__inner'>
              {isLoggedIn && (
                <div className='main__side'>
                  {<QuizBar />}
                  {<ListNavigation />}
                </div>
              )}
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route path='/note/:id'>
                  <Note />
                </Route>
                <Route path='/quiz'>
                  <Quiz />
                </Route>
                <Route path='/signup'>
                  <Signup />
                </Route>
                <Route path='/signin'>
                  <Signin />
                </Route>
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </div>
        </main>
      </>
    </Router>
  );
};

const mapStateToProps = (state: State) => {
  return {
    user: state.user.user
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
