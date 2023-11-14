import { useEffect, useRef } from 'react';
import styles from './ShowTasks.module.css';
import TaskList from 'app/TaskList/TaskList';
import TitleLink from 'components/TitleLink/TitleLink';
import Filters from 'app/FIlters/Filters';
import Pagination from 'app/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import Search from 'app/Search/Search';
import { getTasksQuery } from 'src/store/tasksSlice';

const ShowTasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasksInStore.tasks);
  const filters = useAppSelector((state) => state.tasksInStore.filters);

  const prevFilters = useRef(filters);

  useEffect(() => {
    if (filters !== prevFilters.current) {
      dispatch(getTasksQuery(filters));
    }
  }, [dispatch, filters]);

  return (
    <>
      <div className={styles.options}>
        <TitleLink link="task_form" buttonName="Add new task"></TitleLink>
        <Search />
        <Filters />
      </div>
      <Pagination list={TaskList} dataToMap={tasks}></Pagination>
    </>
  );
};

export default ShowTasks;
