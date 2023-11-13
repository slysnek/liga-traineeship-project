import styles from './Filters.module.css';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { changeFilters, getTasksQuery } from 'src/store/tasksSlice';
import { GetFilteredTasksQuery } from 'api/apiTypes';

const Filters: React.FC = () => {
  const reduxFilters = useAppSelector((state) => state.tasksInStore.filters);
  const dispatch = useAppDispatch();

  const handleFilter = (filterKey: keyof GetFilteredTasksQuery) => {
    const currentValue = reduxFilters[filterKey];

    if (currentValue === undefined) {
      dispatch(changeFilters({ ...reduxFilters, [filterKey]: true }));
      dispatch(getTasksQuery({ ...reduxFilters, [filterKey]: true }));
    } else if (currentValue === true) {
      dispatch(changeFilters({ ...reduxFilters, [filterKey]: false }));
      dispatch(getTasksQuery({ ...reduxFilters, [filterKey]: false }));
    } else {
      dispatch(changeFilters({ ...reduxFilters, [filterKey]: undefined }));
      dispatch(getTasksQuery({ ...reduxFilters, [filterKey]: undefined }));
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
      {/*       <button
        className={styles['filter-button']}
        onClick={() => setFilters({ ...reduxFilters, isImportant: undefined, isCompleted: undefined })}>
        All
      </button> */}
      <button
        className={`${styles['filter-button']} ${getButtonStyle(reduxFilters.isImportant)}`}
        onClick={() => handleFilter('isImportant')}>
        Important
      </button>
      <button
        className={`${styles['filter-button']} ${getButtonStyle(reduxFilters.isCompleted)}`}
        onClick={() => handleFilter('isCompleted')}>
        Completed
      </button>
    </div>
  );
};

export default Filters;
