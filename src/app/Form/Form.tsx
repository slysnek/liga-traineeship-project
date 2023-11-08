import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Form.module.css';
import { FormButton } from './Form.types';
import { addTask } from 'src/store/tasksSlice';

const Form: React.FC<{ type: FormButton }> = ({ type }) => {
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'Add task') {
      dispatch(addTask({ name: name, info: info, isCompleted: isCompleted }));
    }
    setInfo('');
    setName('');
    setIsCompleted(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form} action="">
        <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Task name" type="text" />
        <textarea
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          required
          placeholder="Task info"
          name=""
          id=""
          cols={30}
          rows={5}></textarea>
        <label>
          Is task completed?&nbsp;
          <input
            checked={isCompleted}
            onChange={(e) => {
              setIsCompleted(e.target.checked);
            }}
            type="checkbox"
          />
        </label>
        <button type="submit">{type}</button>
      </form>
    </>
  );
};

export default Form;
