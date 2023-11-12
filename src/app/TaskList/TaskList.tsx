import { useEffect, useState } from 'react';
import styles from './TaskList.module.css';
import Task from 'app/Task/Task';
import { getTasks } from 'src/store/tasksSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { ITaskType } from 'app/Task/Task.types';
import Pagination from 'app/Pagination/Pagination';
import Filters from 'app/FIlters/Filters';

const TaskList = () => {
  const tasks = useAppSelector((state) => state.tasksInStore.tasks);
  const dispatch = useAppDispatch();
  const [displayedTasks, setDisplayedTasks] = useState<ITaskType[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITaskType[]>(tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDisplayedTasksChange = (displayedTasks: ITaskType[]) => {
    setDisplayedTasks(displayedTasks);
  };

  const handleFilteredTasksChange = (filteredTasks: ITaskType[]) => {
    setFilteredTasks(filteredTasks);
  };

  return (
    <>
      <Filters tasks={tasks} onFilteredTasksChange={handleFilteredTasksChange} />
      <Pagination tasks={filteredTasks} onDisplayedTasksChange={handleDisplayedTasksChange}></Pagination>
      <ul className={styles.tasklist}>
        {displayedTasks.map((task) => {
          return <Task key={task.id} {...task} />;
        })}
      </ul>
    </>
  );
};

export default TaskList;
