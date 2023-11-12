import styles from './ShowTasks.module.css';
import TaskList from 'app/TaskList/TaskList';
import TitleLink from 'components/TitleLink/TitleLink';
import Filters from 'app/FIlters/Filters';

const ShowTasks = () => {
  return (
    <>
      <div className={styles.options}>
        <TitleLink link="add_task" buttonName="Add new task"></TitleLink>
        <Filters />
      </div>
      <TaskList />
    </>
  );
};

export default ShowTasks;
