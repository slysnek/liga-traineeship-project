import { useEffect, useState } from 'react';
import styles from './TaskList.module.css';
import Task from 'app/Task/Task';
import { getTasksQuery } from 'src/store/tasksSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { ITaskType } from 'app/Task/Task.types';
import Pagination from 'app/Pagination/Pagination';
import Filters from 'app/FIlters/Filters';
import { Loader } from 'components/Loader';

const TaskList = () => {
  const tasks = useAppSelector((state) => state.tasksInStore.tasks);
  const { status, error } = useAppSelector((state) => state.tasksInStore);
  const dispatch = useAppDispatch();
  const [displayedTasks, setDisplayedTasks] = useState<ITaskType[]>([]);

  useEffect(() => {
    dispatch(getTasksQuery());
  }, [dispatch]);

  const handleDisplayedTasksChange = (displayedTasks: ITaskType[]) => {
    setDisplayedTasks(displayedTasks);
  };

  return (
    <>
      <Pagination tasks={tasks} onDisplayedTasksChange={handleDisplayedTasksChange}></Pagination>
      <div className={styles.status}>
        {status === 'loading' && (
          <Loader variant="circle" isLoading={true}>
            <h2>Loading</h2>
          </Loader>
        )}
        {error && <h2>An error occured: {error}</h2>}
      </div>
      <ul className={styles.tasklist}>
        {displayedTasks.map((task) => {
          return <Task key={task.id} {...task} />;
        })}
      </ul>
    </>
  );
};

export default TaskList;
