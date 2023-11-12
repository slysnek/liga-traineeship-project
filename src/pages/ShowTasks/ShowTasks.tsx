import styles from './ShowTasks.module.css';
import TaskList from 'app/TaskList/TaskList';
import TitleLink from 'components/TitleLink/TitleLink';
import { Loader } from 'components/Loader';
import { useAppSelector } from 'src/hooks/hooks';

const ShowTasks = () => {
  const { status, error } = useAppSelector((state) => state.tasksInStore);

  return (
    <>
      <TitleLink link="add_task" buttonName="Add new task"></TitleLink>
      <TaskList />
      <div className={styles.status}>
        {status === 'loading' && (
          <Loader variant="circle" isLoading={true}>
            <h2>Loading</h2>
          </Loader>
        )}
        {error && <h2>An error occured: {error}</h2>}
      </div>
    </>
  );
};

export default ShowTasks;
