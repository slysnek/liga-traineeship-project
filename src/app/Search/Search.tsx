import { useEffect, useState } from 'react';
import searchIcon from '../../assets/icons/icon-search.svg';
import styles from './Search.module.css';
import { useAppDispatch } from 'src/hooks/hooks';
import { getFilteredTasksQuery } from 'src/store/tasksSlice';
import { GetFilteredTasksQuery } from 'api/apiTypes';

const Search: React.FC = () => {
  return (
    <div className={styles['search-wrapper']}>
      <input className={styles['search-window']} type="text" />
      <img className={styles['search-icon']} src={searchIcon} alt="search icon" />
    </div>
  );
};

export default Search;
