import { useEffect, useState } from 'react';
import arrowRight from '../../assets/icons/icon-arrow-right.svg';
import arrowLeft from '../../assets/icons/icon-arrow-left.svg';
import styles from './Pagination.module.css';
import { IPaginationProps } from './Pagination.types';
import { PAGE_SIZE } from 'constants/constants';
import { ITaskType } from 'app/Task/Task.types';

const Pagination: React.FC<IPaginationProps> = ({ dataToMap, list: TaskList }) => {
  const pageSize = PAGE_SIZE;
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksForPage, setTasksForPage] = useState<ITaskType[]>([]);
  const totalPages = Math.ceil(dataToMap.length / pageSize);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const tasksForPageDisplay = dataToMap.slice(startIndex, endIndex);
    setTasksForPage(tasksForPageDisplay);
  }, [dataToMap, currentPage, pageSize]);

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
          onClick={() => setCurrentPage((prev) => (prev + 1 > totalPages ? prev : prev + 1))}></img>
      </div>
      <TaskList tasks={tasksForPage} />
    </>
  );
};

export default Pagination;
