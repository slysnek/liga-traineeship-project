import { useEffect, useState } from 'react';
import arrowRight from '../../assets/icons/icon-arrow-right.svg';
import arrowLeft from '../../assets/icons/icon-arrow-left.svg';
import styles from './TaskList.module.css';
import Task from 'app/Task/Task';
import { getTasks } from 'src/store/tasksSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { ITaskType } from 'app/Task/Task.types';

const TaskList = () => {
  const tasks = useAppSelector((state) => state.tasksInStore.tasks);
  const dispatch = useAppDispatch();
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedTasks, setDisplayedTasks] = useState<ITaskType[]>([]);
  const totalPages = Math.ceil(tasks.length / pageSize);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const tasksForPage = tasks.slice(startIndex, endIndex);
    setDisplayedTasks(tasksForPage);
  }, [tasks, currentPage, pageSize]);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <>
      <div className={styles['select-page-wrapper']}>
        <img
          className={styles.arrow}
          src={arrowLeft}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}></img>
        <select value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))}>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
        <img
          className={styles.arrow}
          src={arrowRight}
          onClick={() => setCurrentPage((prev) => (prev + 1 >= totalPages ? prev : prev + 1))}></img>
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
