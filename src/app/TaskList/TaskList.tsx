import { useEffect, useState } from 'react';
import styles from './TaskList.module.css';
import Task from 'app/Task/Task';
import { getTasks } from 'src/store/tasksSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { ITaskType } from 'app/Task/Task.types';
import Pagination from 'app/Pagination/Pagination';

const TaskList = () => {
  const tasks = useAppSelector((state) => state.tasksInStore.tasks);
  const dispatch = useAppDispatch();
  const [displayedTasks, setDisplayedTasks] = useState<ITaskType[]>([]);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDisplayedTasksChange = (tasks: ITaskType[]) => {
    setDisplayedTasks(tasks);
  };

  return (
    <>
      <Pagination tasks={tasks} onDisplayedTasksChange={handleDisplayedTasksChange}></Pagination>
      <ul className={styles.tasklist}>
        {displayedTasks.map((task) => {
          return <Task key={task.id} {...task} />;
        })}
      </ul>
    </>
  );
};

export default TaskList;
