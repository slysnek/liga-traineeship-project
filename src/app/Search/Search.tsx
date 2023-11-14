import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import searchIcon from '../../assets/icons/icon-search.svg';
import styles from './Search.module.css';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { changeFilters, getTasksQuery } from 'src/store/tasksSlice';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const reduxFilters = useAppSelector((state) => state.tasksInStore.filters);
  const dispatch = useAppDispatch();

  const searchQuery = searchParams.get('searchQuery');

  useEffect(() => {
    if (searchQuery) {
      dispatch(changeFilters({ name_like: searchQuery }));
    }
    if (searchQuery === '' || searchQuery === null) {
      dispatch(changeFilters({ name_like: undefined }));
    }
  }, [searchQuery]);

  const handleTyping = (searchValue: string) => {
    if (searchValue) {
      searchParams.set('searchQuery', searchValue);
    } else {
      searchParams.delete('searchQuery');
    }

    setSearchParams(searchParams);
  };

  return (
    <div className={styles['search-wrapper']}>
      <input
        onChange={(e) => handleTyping(e.target.value)}
        placeholder="Task name"
        value={reduxFilters.name_like || ''}
        required
        className={styles['search-window']}
        type="text"
      />
    </div>
  );
};

export default Search;
