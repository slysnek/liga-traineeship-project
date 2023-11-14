import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Filters.module.css';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { changeFilters } from 'src/store/tasksSlice';
import { GetFilteredTasksQuery } from 'api/apiTypes';
import { convertToFilterValue } from 'utils/convertToFilterValue';

const Filters: React.FC = () => {
  const [searchFilterParams, setFilterParams] = useSearchParams();
  const reduxFilters = useAppSelector((state) => state.tasksInStore.filters);
  const dispatch = useAppDispatch();

  const isImportantQuery = searchFilterParams.get('isImportant');
  const isCompletedQuery = searchFilterParams.get('isCompleted');

  useEffect(() => {
    if (isImportantQuery) {
      dispatch(changeFilters({ isImportant: convertToFilterValue(isImportantQuery) }));
    }
    if (isImportantQuery === '' || isImportantQuery === null) {
      dispatch(changeFilters({ isImportant: undefined }));
    }
  }, [isImportantQuery]);

  useEffect(() => {
    if (isCompletedQuery) {
      dispatch(changeFilters({ isCompleted: convertToFilterValue(isCompletedQuery) }));
    }
    if (isCompletedQuery === '' || isCompletedQuery === null) {
      dispatch(changeFilters({ isCompleted: undefined }));
    }
  }, [isCompletedQuery]);

  const handleFilter = (filterKey: keyof GetFilteredTasksQuery) => {
    const currentValue = reduxFilters[filterKey];

    if (currentValue === undefined) {
      searchFilterParams.set(String(filterKey), 'true');
      setFilterParams(searchFilterParams);
    } else if (currentValue === true) {
      searchFilterParams.set(String(filterKey), 'false');
      setFilterParams(searchFilterParams);
    } else {
      searchFilterParams.delete(String(filterKey));
      setFilterParams(searchFilterParams);
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
