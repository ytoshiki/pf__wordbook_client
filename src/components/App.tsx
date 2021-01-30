import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../pages/Home';
import Signup from './Signup';
import Signin from './Signin';
import Navigation from './Navigation';
import { useEffect, useState } from 'react';
import { State } from '../types/state';
import ListNavigation from './ListNavigation';
import { logout } from '../redux';
import '../styles/components/App.scss';

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
    console.log('App rendered');
  }, [user, setIsLoggedIn, logout]);

  console.log(isLoggedIn);
  return (
    <Router>
      <div className='wrapper'>
        <Navigation logout={logout} isLoggedIn={isLoggedIn} />
        <div id='main'>
          {isLoggedIn && <ListNavigation />}
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/signup'>
              <Signup />
            </Route>
            <Route path='/signin'>
              <Signin />
            </Route>
          </Switch>
        </div>
      </div>
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
