import { useEffect, useState } from 'react';
import styles from './Form.module.css';
import { IForm } from './Form.types';
import { addNewTaskQuery, changeTaskQuery } from 'src/store/tasksSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';

const Form: React.FC<IForm> = ({ type, taskId }) => {
  const [name, setName] = useState<string | undefined>('');
  const [info, setInfo] = useState<string | undefined>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const taskToEdit = useAppSelector((state) => state.tasksInStore.tasks.find((task) => task.id === taskId));

  useEffect(() => {
    if (taskToEdit) {
      setInfo(taskToEdit.info);
      setName(taskToEdit.name);
      setIsCompleted(taskToEdit.isCompleted as boolean);
    }
  }, []);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'Add task') {
      dispatch(addNewTaskQuery({ name: name, info: info, isCompleted: isCompleted }));
      setInfo('');
      setName('');
      setIsCompleted(false);
    }
    if (type === 'Edit task') {
      dispatch(changeTaskQuery({ name: name, info: info, isCompleted: isCompleted, id: taskId }));
    }
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
