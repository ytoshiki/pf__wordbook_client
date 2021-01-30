import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveList } from '../redux';

interface FormState {
  word: string;
  examples: string[];
  memo: null | string;
}

interface SaveFormProps {
  saveList: any;
}

const ListSaveForm: React.FC<SaveFormProps> = ({ saveList }) => {
  const [form, setForm] = useState<FormState>({
    word: '',
    examples: [],
    memo: null
  });

  const [example, setExample] = useState('');

  useEffect(() => {
    console.log('ListSaveForm Rendered');
  }, []);

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

  return (
    <div>
      <h3>Create Your Own Sentense!</h3>
      <form action='' onSubmit={onSubmit}>
        <label htmlFor=''>word</label>
        <input type='text' name='word' onChange={wordChange} value={form.word} />

        <label htmlFor=''>sentense</label>
        {form.examples && form.examples.map((example, index) => <div key={index}>{example}</div>)}
        <input type='text' name='example' onChange={(e) => setExample(e.target.value)} value={example} />
        <div className='add' onClick={addExample}>
          Add
        </div>

        <label htmlFor=''>memo</label>
        <textarea name='memo' id='' placeholder='Where did you find?&#10;When do you use?' onChange={memoChange} value={form.memo || ''}></textarea>

        <button>Save</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    saveList: (data: FormState) => dispatch(saveList(data))
  };
};

export default connect(null, mapDispatchToProps)(ListSaveForm);
