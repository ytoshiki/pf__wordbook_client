import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup } from '../redux';
import { SignUpType } from '../types/user';
import SignupImage from '../assets/images/signup.png';
import '../styles/pages/Signup.scss';

interface SignupProps {
  signup: (credential: SignUpType) => void;
}

const Signup: React.FC<SignupProps> = ({ signup }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const history = useHistory();

  useEffect(() => {
    console.log('SignUp Rendered');
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(form);
    history.push('/');
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
            </div>
            <div className='signup__input-block'>
              <label className='signup__label' htmlFor=''>
                Email
              </label>
              <input className='signup__input' type='email' value={form.email} name='email' onChange={onChange} />
            </div>
            <div className='signup__input-block'>
              <label className='signup__label' htmlFor=''>
                Password
              </label>

              <input className='signup__input' type='password' value={form.password} name='password' onChange={onChange} />
              <div>Use at least 6 characters</div>
            </div>
            <button className='signup__button'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  signup: (credintials: SignUpType) => dispatch(signup(credintials))
});

export default connect(null, mapDispatchToProps)(Signup);
