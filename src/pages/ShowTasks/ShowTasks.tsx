import { Link } from 'react-router-dom';
import styles from './ShowTasks.module.css';
import TaskList from 'app/TaskList/TaskList';
import TitleLink from 'components/TitleLink/TitleLink';

const ShowTasks = () => {
  return (
    <>
      <TitleLink link="add_task" buttonName="Add new task"></TitleLink>
      <TaskList />
    </>
  );
};

export default ShowTasks;
