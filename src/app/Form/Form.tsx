import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Form.module.css';
import { IForm } from './Form.types';
import { addTask, editTask } from 'src/store/tasksSlice';
import { RootState } from 'src/store/store';

const Form: React.FC<IForm> = ({ type, taskId }) => {
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const taskToEdit = useSelector((state: RootState) => state.tasksInStore.tasks.find((task) => task.id === taskId));

  useEffect(() => {
    if (taskToEdit) {
      setInfo(taskToEdit.info);
      setName(taskToEdit.name);
      setIsCompleted(taskToEdit.isCompleted);
    }
  }, [taskToEdit]);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'Add task') {
      dispatch(addTask({ name: name, info: info, isCompleted: isCompleted }));
    }
    if (type === 'Edit task') {
      dispatch(editTask({ name: name, info: info, isCompleted: isCompleted, id: taskId }));
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
