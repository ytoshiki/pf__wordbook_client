import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveList, logout } from '../redux';
import '../styles/components/ListSaveForm.scss';
import { State } from '../types/state';

interface FormState {
  word: string;
  examples: string[];
  memo: null | string;
}

interface SaveFormProps {
  saveList: any;
  user: any;
}

const ListSaveForm: React.FC<SaveFormProps> = ({ saveList, user }) => {
  const [form, setForm] = useState<FormState>({
    word: '',
    examples: [],
    memo: null
  });

  const [example, setExample] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [focus, setOnFocus] = useState(false);

  useEffect(() => {
    setExample('');
    setForm({
      word: '',
      examples: [],
      memo: null
    });
    setIsLoggedIn(sessionStorage.getItem('jwt') || '');
  }, [setIsLoggedIn, user]);

  const wordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      word: e.target.value
    });
  };

  const memoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      memo: e.target.value
    });
  };

  const addExample = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!example) return;
    setForm({
      ...form,
      examples: form.examples.concat(example)
    });
    setExample('');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.word || form.examples.length < 1) return;
    await saveList(form);
    setForm({
      ...form,
      word: '',
      memo: null,
      examples: []
    });
  };

  const onClickOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setOnFocus(true);
    } else {
      setOnFocus(false);
    }
  };

  const onClickClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOnFocus(false);
  };

  return (
    <div className='save-form' onClick={(e) => onClickOpen(e)}>
      {focus && (
        <div className='save-form__modal'>
          <div className='save-form__modal-inner'>
            <button className='close' onClick={onClickClose}>
              Got It
            </button>
            <div className='save-form__modal-content'>
              You need to register your count.
              <br />
              <Link to='/signup' className='link'>
                sign up
              </Link>
              or
              <Link to='/signin' className='link'>
                sign in
              </Link>
              to use this functionality!
            </div>
          </div>
        </div>
      )}
      <h3 className='save-form__heading'>Add To Word List</h3>
      <form className='save-form__form' onSubmit={onSubmit}>
        <div className='save-form__block'>
          <label htmlFor=''>
            word <span className='mandatory mandatory-main'>*</span>
          </label>
          <input type='text' disabled={isLoggedIn ? false : true} name='word' onChange={wordChange} value={form.word} />
        </div>
        <div className='save-form__block'>
          <label htmlFor=''>
            sentense <span className='mandatory-main'>*</span>
          </label>
          {form.examples && form.examples.map((example, index) => <div key={index}>{example}</div>)}
          <input type='text' disabled={isLoggedIn ? false : true} name='example' onChange={(e) => setExample(e.target.value)} value={example} />
          <div className='add' onClick={addExample}>
            Add <span className='mandatory'>*</span>
          </div>
        </div>

        <div className='save-form__block'>
          <label htmlFor=''>memo</label>
          <textarea name='memo' disabled={isLoggedIn ? false : true} id='' placeholder='Write down anything you want' onChange={memoChange} value={form.memo || ''}></textarea>
        </div>
        <button className='save-form__save'>Save</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    user: state.user.user
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    saveList: (data: FormState) => dispatch(saveList(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSaveForm);
