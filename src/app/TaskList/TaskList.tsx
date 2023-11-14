import { ITaskListProps } from 'app/TaskList/TaskList.types';
import Task from 'app/Task/Task';
import styles from 'app/TaskList/TaskList.module.css';
import { useAppSelector } from 'src/hooks/hooks';
import { Loader } from 'components/Loader';
import PopUp from 'components/PopUp/PopUp';

const TaskList: React.FC<ITaskListProps> = ({ tasks }) => {
  const { status, error } = useAppSelector((state) => state.tasksInStore);
  return (
    <>
      <div className={styles.status}>
        {status.getTasksStatus === 'loading' && (
          <Loader variant="circle" isLoading={true}>
            <h2>Loading</h2>
          </Loader>
        )}
        {status.getTasksStatus === 'resolved' && <PopUp error={false} message="Tasks are loaded."></PopUp>}
        {error && <PopUp error={true} message={error}></PopUp>}
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
