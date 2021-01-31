import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { signin } from '../redux';
import { SignInType } from '../types/user';
import { useHistory } from 'react-router-dom';
import SignupImage from '../assets/images/signup.png';
import '../styles/pages/Signin.scss';

interface SignInProps {
  signin: (credential: SignInType) => void;
}

const Signin: React.FC<SignInProps> = ({ signin }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const history = useHistory();

  useEffect(() => {
    console.log('SignIn Rendered');
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin(form);
    history.push('/');
  };

  return (
    <div className='signin'>
      <div className='signin__sidebar'>
        <img src={SignupImage} alt='' />
      </div>
      <div className='signin__content'>
        <div className='signin__content-inner'>
          <h1 className='signin__heading'>Sign In</h1>
          <p className='signin__paragraph'>
            Sign in to make your own word list and
            <br />
            learn new English words.
          </p>
          <form className='signin__form' action='' onSubmit={onSubmit}>
            <div className='signin__input-block'>
              <label className='signin__label' htmlFor=''>
                Email
              </label>
              <input className='signin__input' type='email' value={form.email} name='email' onChange={onChange} />
            </div>
            <div className='signin__input-block'>
              <label className='signin__label' htmlFor=''>
                Password
              </label>
              <input className='signin__input' type='password' value={form.password} name='password' onChange={onChange} />
            </div>
            <button className='signin__button'>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  signin: (credintials: SignInType) => dispatch(signin(credintials))
});

export default connect(null, mapDispatchToProps)(Signin);
