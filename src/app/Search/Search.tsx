import { useEffect, useState } from 'react';
import searchIcon from '../../assets/icons/icon-search.svg';
import styles from './Search.module.css';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { changeFilters, getTasksQuery } from 'src/store/tasksSlice';

const Search: React.FC = () => {
  const reduxFilters = useAppSelector((state) => state.tasksInStore.filters);
  const dispatch = useAppDispatch();

  const handleTyping = (searchValue: string) => {
    dispatch(changeFilters({ ...reduxFilters, name_like: searchValue }));
  };
  const handleSearch = () => {
    dispatch(getTasksQuery(reduxFilters));
  };

  return (
    <div className={styles['search-wrapper']}>
      <input
        onChange={(e) => handleTyping(e.target.value)}
        value={reduxFilters.name_like}
        placeholder="Task name"
        required
        className={styles['search-window']}
        type="text"
      />
      <img onClick={handleSearch} className={styles['search-icon']} src={searchIcon} alt="search icon" />
    </div>
  );
};

export default Search;
