import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from 'app/Search/Search.module.css';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { changeFilters } from 'src/store/tasksSlice';
import { searchSchema } from 'utils/searchSchema';

const Search: React.FC = () => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      searchValue: '',
    },
    resolver: yupResolver(searchSchema),
  });
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

  useEffect(() => {
    if (reduxFilters.name_like) {
      setValue('searchValue', reduxFilters.name_like);
    }
  }, [reduxFilters]);

  const handleTyping = (value: { searchValue: string }) => {
    if (value.searchValue) {
      searchParams.set('searchQuery', value.searchValue);
    } else {
      searchParams.delete('searchQuery');
    }

    setSearchParams(searchParams);
  };

  return (
    <div className={styles['search-wrapper']}>
      <form onSubmit={handleSubmit(handleTyping)}>
        <Controller
          name="searchValue"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleTyping({ searchValue: e.target.value });
              }}
              placeholder="Task name"
              className={styles['search-window']}
              type="text"
            />
          )}
        />
      </form>
    </div>
  );
};

export default Search;
