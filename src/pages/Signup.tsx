import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup } from '../redux';
import { SignUpType } from '../types/user';
import SignupImage from '../assets/images/signup.png';
import '../styles/pages/Signup.scss';
import { State } from '../types/state';

interface SignupProps {
  signup: (credential: SignUpType) => void;
  error: null | string;
  user: string;
}

const Signup: React.FC<SignupProps> = ({ signup, error, user }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [formError, setFormError] = useState({
    email: '',
    password: '',
    username: ''
  });

  const [serverError, setServerError] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push('/');
    }

    const isLoggedIn = sessionStorage.getItem('jwt');
    if (isLoggedIn) {
      history.push('/');
    }
    setServerError(error ? 'Either username or email is already taken' : '');
  }, [error, signup, history, user]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email || !form.username || !form.password) {
      setFormError({
        ...formError,
        username: !form.username ? 'Username must be provided' : '',
        email: !form.email ? 'Email must be provided' : '',
        password: !form.password ? 'Password must be provided' : ''
      });
      return;
    }

    if (form.password.length < 6) {
      setFormError({
        username: '',
        email: '',
        password: 'Password must be at least 6 characters'
      });
      return;
    }
    signup(form);
  };

  return (
    <div className='signup'>
      <div className='signup__sidebar'>
        <img src={SignupImage} alt='' />
      </div>
      <div className='signup__content'>
        <div className='signup__content-inner'>
          <h1 className='signup__heading'>Sign Up For Free</h1>
          <p className='signup__paragraph'>
            Sign up to make your own word list and
            <br />
            learn new English words.
          </p>
          <form className='signup__form' action='' onSubmit={onSubmit}>
            <div className='signup__input-block'>
              <label className='signup__label' htmlFor=''>
                Username
              </label>

              <input className='signup__input' type='text' value={form.username} name='username' onChange={onChange} />
              {formError.username && <div className='form-error'>{formError.username}</div>}
            </div>
            <div className='signup__input-block'>
              <label className='signup__label' htmlFor=''>
                Email
              </label>
              <input className='signup__input' type='email' value={form.email} name='email' onChange={onChange} />
              {formError.email && <div className='form-error'>{formError.email}</div>}
            </div>
            <div className='signup__input-block'>
              <label className='signup__label' htmlFor=''>
                Password
              </label>

              <input className='signup__input' type='password' value={form.password} name='password' onChange={onChange} />
              <div>*Include at least 6 characters</div>
              {formError.password && <div className='form-error'>{formError.password}</div>}
            </div>
            {serverError && <div className='form-error'>{serverError}</div>}
            <button className='signup__button'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store: State) => {
  return {
    error: store.user.error,
    user: store.user.user.token
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  signup: (credintials: SignUpType) => dispatch(signup(credintials))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
