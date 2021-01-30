import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup } from '../redux';
import { SignUpType } from '../types/user';

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
    <div>
      <h1>Sign Up</h1>
      <form action='' onSubmit={onSubmit}>
        <label htmlFor=''>Username</label>
        <input type='text' value={form.username} name='username' onChange={onChange} />
        <label htmlFor=''>Email</label>
        <input type='email' value={form.email} name='email' onChange={onChange} />
        <label htmlFor=''>Password</label>
        <input type='password' value={form.password} name='password' onChange={onChange} />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  signup: (credintials: SignUpType) => dispatch(signup(credintials))
});

export default connect(null, mapDispatchToProps)(Signup);
