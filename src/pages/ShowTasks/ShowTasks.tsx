import { Link } from 'react-router-dom';
import styles from './ShowTasks.module.css';
import TaskList from 'app/TaskList/TaskList';

const ShowTasks = () => {
  return (
    <>
      <Link to={'/add_task'}>Add task</Link>
      <TaskList />
    </>
  );
};

export default ShowTasks;
