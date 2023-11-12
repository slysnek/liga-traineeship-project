import { useEffect, useState } from 'react';
import styles from './Filters.module.css';
import { useAppDispatch } from 'src/hooks/hooks';
import { getFilteredTasksQuery } from 'src/store/tasksSlice';
import { GetFilteredTasksQuery } from 'api/apiTypes';

const Filters: React.FC = () => {
  const [filters, setFilters] = useState<GetFilteredTasksQuery>({ isImportant: undefined, isCompleted: undefined });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFilteredTasksQuery(filters));
  }, [filters]);

  const handleFilter = (filterKey: keyof GetFilteredTasksQuery) => {
    setFilters((prevFilters) => {
      const currentValue = prevFilters[filterKey];

      if (currentValue === undefined) {
        return { ...prevFilters, [filterKey]: true };
      } else if (currentValue === true) {
        return { ...prevFilters, [filterKey]: false };
      } else {
        return { ...prevFilters, [filterKey]: undefined };
      }
    });
  };

  const getButtonStyle = (filterValue: boolean | undefined) => {
    if (filterValue === true) {
      return { backgroundColor: 'green' };
    } else if (filterValue === false) {
      return { backgroundColor: 'red' };
    }
  };

  return (
    <div className={styles['filters-wrapper']}>
      <button
        className={styles['filter-button']}
        onClick={() => setFilters({ isImportant: undefined, isCompleted: undefined })}>
        All
      </button>
      <button
        className={styles['filter-button']}
        style={getButtonStyle(filters.isImportant)}
        onClick={() => handleFilter('isImportant')}>
        Important
      </button>
      <button
        className={styles['filter-button']}
        style={getButtonStyle(filters.isCompleted)}
        onClick={() => handleFilter('isCompleted')}>
        Completed
      </button>
    </div>
  );
};

export default Filters;
