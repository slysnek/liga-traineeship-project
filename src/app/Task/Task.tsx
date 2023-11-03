import { Link } from 'react-router-dom';
import styles from './Task.module.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Task = ({ taskData }: any) => {
  return (
    <li className={styles.task}>
      <h2>{taskData.name}</h2>
      <p>{taskData.info}</p>
      <label>
        Completed:&nbsp;
        <input type="checkbox" checked={taskData.isCompleted === 'true' ? true : false} />
      </label>
      <Link to={`add_task/${taskData.id}`}>Edit</Link>
    </li>
  );
};

export default Task;
