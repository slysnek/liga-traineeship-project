import { useEffect, useState } from 'react';
import styles from './Filters.module.css';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { changeFilters, getTasksQuery } from 'src/store/tasksSlice';
import { GetFilteredTasksQuery } from 'api/apiTypes';

const Filters: React.FC = () => {
  const [filters, setFilters] = useState<GetFilteredTasksQuery>({ isImportant: undefined, isCompleted: undefined });
  const reduxFilters = useAppSelector((state) => state.tasksInStore.filters);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(changeFilters(filters));
    dispatch(getTasksQuery(filters));
  }, [filters]);

  const handleFilter = (filterKey: keyof GetFilteredTasksQuery) => {
    const currentValue = reduxFilters[filterKey];

    if (currentValue === undefined) {
      setFilters({ ...reduxFilters, [filterKey]: true });
      dispatch(changeFilters({ ...reduxFilters, [filterKey]: true }));
    } else if (currentValue === true) {
      setFilters({ ...reduxFilters, [filterKey]: false });
      dispatch(changeFilters({ ...reduxFilters, [filterKey]: false }));
    } else {
      setFilters({ ...reduxFilters, [filterKey]: undefined });
      dispatch(changeFilters({ ...reduxFilters, [filterKey]: undefined }));
    }
  };

  const getButtonStyle = (filterValue: boolean | undefined) => {
    if (filterValue === true) {
      return styles.green;
    } else if (filterValue === false) {
      return styles.red;
    }
  };

  return (
    <div className={styles['filters-wrapper']}>
      <button
        className={styles['filter-button']}
        onClick={() => setFilters({ ...reduxFilters, isImportant: undefined, isCompleted: undefined })}>
        All
      </button>
      <button
        className={`${styles['filter-button']} ${getButtonStyle(filters.isImportant)}`}
        onClick={() => handleFilter('isImportant')}>
        Important
      </button>
      <button
        className={`${styles['filter-button']} ${getButtonStyle(filters.isCompleted)}`}
        onClick={() => handleFilter('isCompleted')}>
        Completed
      </button>
    </div>
  );
};

export default Filters;
