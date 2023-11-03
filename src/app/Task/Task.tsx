import { Link } from 'react-router-dom';
import styles from './Task.module.css';
import { ITaskType } from './TaskTypes.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Task: React.FC<ITaskType> = (taskData: ITaskType) => {
  return (
    <li className={styles.task}>
      <h2>{taskData.name}</h2>
      <p>{taskData.info}</p>
      <label>
        Completed:&nbsp;
        <input type="checkbox" checked={taskData.isCompleted ? true : false} />
      </label>
      <br />
      <Link className={styles.edit} to={`add_task/${taskData.id}`}>
        Edit
      </Link>
    </li>
  );
};

export default Task;
