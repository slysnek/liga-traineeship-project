import { useEffect, useState } from 'react';
import { IPaginationProps } from 'app/Pagination/Pagination.types';
import styles from 'app/Pagination/Pagination.module.css';
import arrowLeft from 'assets/icons/icon-arrow-left.svg';
import arrowRight from 'assets/icons/icon-arrow-right.svg';
import { PAGE_SIZE } from 'constants/constants';
import { ITaskProps } from 'app/Task/Task.types';

const Pagination: React.FC<IPaginationProps> = ({ dataToMap, list: TaskList }) => {
  const pageSize = PAGE_SIZE;
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksForPage, setTasksForPage] = useState<ITaskProps[]>([]);
  const totalPages = Math.ceil(dataToMap.length / pageSize);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const tasksForPageDisplay = dataToMap.slice(startIndex, endIndex);
    if (!tasksForPageDisplay.length && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    setTasksForPage(tasksForPageDisplay);
  }, [dataToMap, currentPage, pageSize]);

  return (
    <>
      {dataToMap.length ? (
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
      ) : null}
      <TaskList tasks={tasksForPage} />
    </>
  );
};

export default Pagination;
