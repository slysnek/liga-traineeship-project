import { useEffect } from 'react';
import styles from './TaskList.module.css';
import Task from 'app/Task/Task';
import { getTasks } from 'src/store/tasksSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';

const TaskList = () => {
  const tasks = useAppSelector((state) => state.tasksInStore.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <>
      <ul className={styles.tasklist}>
        {tasks.map((task) => {
          return <Task key={task.id} {...task} />;
        })}
      </ul>
    </>
  );
};

export default TaskList;
