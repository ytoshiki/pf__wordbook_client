import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { signin } from '../redux';
import { SignInType } from '../types/user';
import { useHistory } from 'react-router-dom';

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
    <div>
      <h1>Sign In</h1>
      <form action='' onSubmit={onSubmit}>
        <label htmlFor=''>Email</label>
        <input type='email' value={form.email} name='email' onChange={onChange} />
        <label htmlFor=''>Password</label>
        <input type='password' value={form.password} name='password' onChange={onChange} />
        <button>Sign In</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  signin: (credintials: SignInType) => dispatch(signin(credintials))
});

export default connect(null, mapDispatchToProps)(Signin);
