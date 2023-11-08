import { useSelector } from 'react-redux';
import styles from './TaskList.module.css';
import Task from 'app/Task/Task';
import { RootState } from 'src/store/store';

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasksInStore.tasks);

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
