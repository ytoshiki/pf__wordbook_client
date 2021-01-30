import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/components/Navigation.scss';

interface NavigationProps {
  logout: any;
  isLoggedIn: string;
}

const Navigation: React.FC<NavigationProps> = ({ logout, isLoggedIn }) => {
  const history = useHistory();

  const onClick = () => {
    logout();
    history.push('/');
  };
  useEffect(() => {
    console.log('Navigation rendered');
  }, []);
  return (
    <nav className='navigation'>
      <ul className='navigation__list'>
        <li className='navigation__item'>
          <Link to='/'>Home</Link>
        </li>

        {!isLoggedIn && (
          <>
            <li className='navigation__item'>
              <Link to='/signup'>Sign up</Link>
            </li>
            <li className='navigation__item'>
              <Link to='/signin'>Sign in</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <li className='navigation__item'>
            <button onClick={onClick}>Log out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     logout: () => dispatch(logout())
//   };
// };

// export default connect(null, mapDispatchToProps)(Navigation);

export default Navigation;
