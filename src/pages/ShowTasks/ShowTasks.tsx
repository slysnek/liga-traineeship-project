import { useEffect } from 'react';
import styles from './ShowTasks.module.css';
import TaskList from 'app/TaskList/TaskList';
import TitleLink from 'components/TitleLink/TitleLink';
import Filters from 'app/FIlters/Filters';
import Pagination from 'app/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { getTasksQuery } from 'src/store/tasksSlice';

const ShowTasks = () => {
  const tasks = useAppSelector((state) => state.tasksInStore.tasks);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTasksQuery());
  }, [dispatch]);
  return (
    <>
      <div className={styles.options}>
        <TitleLink link="add_task" buttonName="Add new task"></TitleLink>
        <Filters />
      </div>
      <Pagination taskList={TaskList} tasks={tasks}></Pagination>
    </>
  );
};

export default ShowTasks;
