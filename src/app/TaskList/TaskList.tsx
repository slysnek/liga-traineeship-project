import styles from './TaskList.module.css';
import { ITaskListProps } from './TaskList.types';
import Task from 'app/Task/Task';
import { useAppSelector } from 'src/hooks/hooks';
import { Loader } from 'components/Loader';

const TaskList: React.FC<ITaskListProps> = ({ tasks }) => {
  const { status, error } = useAppSelector((state) => state.tasksInStore);
  return (
    <>
      <div className={styles.status}>
        {status === 'loading' && (
          <Loader variant="circle" isLoading={true}>
            <h2>Loading</h2>
          </Loader>
        )}
        {error && <h2>An error occured: {error}</h2>}
      </div>
      <ul className={styles.tasklist}>
        {tasks.map((task) => {
          return <Task key={task.id} {...task} />;
        })}
      </ul>
    </>
  );
};

export default TaskList;
