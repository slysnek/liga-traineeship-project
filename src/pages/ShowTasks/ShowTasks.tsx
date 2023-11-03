import { Link } from 'react-router-dom';
import styles from './ShowTasks.module.css';
import TaskList from 'app/TaskList/TaskList';
import AddTask from 'pages/AddTask/AddTask';

const ShowTasks = () => {
  return (
    <>
      <h2 className={styles.test}>Show tasks page</h2>
      <Link to={'/add_task'}>Add task</Link>
      <TaskList />
    </>
  );
};

export default ShowTasks;
