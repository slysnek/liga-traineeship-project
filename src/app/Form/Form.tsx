import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import styles from './Form.module.css';
import { IForm } from './Form.types';
import { addNewTaskQuery, changeTaskQuery } from 'src/store/tasksSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { AddTaskQuery, ChangeTaskQuery } from 'api/apiTypes';
import { validationSchema } from 'utils/validationSchema';

const Form: React.FC<IForm> = ({ type, taskId }) => {
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const taskToEdit = useAppSelector((state) => state.tasksInStore.tasks.find((task) => task.id === taskId));

  useEffect(() => {
    if (taskToEdit) {
      setValue('name', taskToEdit.name);
      setValue('info', taskToEdit.info);
      setValue('isCompleted', taskToEdit.isCompleted as boolean);
      setValue('isImportant', taskToEdit.isImportant as boolean);
    }
  }, [taskToEdit]);

  const dispatch = useAppDispatch();

  const onSubmit = (data: AddTaskQuery | ChangeTaskQuery) => {
    if (type === 'Add task') {
      dispatch(addNewTaskQuery(data));
    }
    if (type === 'Edit task') {
      dispatch(changeTaskQuery({ ...data, id: taskId }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} action="">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <input className={styles['form-input']} {...field} placeholder="Task name" type="text" />
              {fieldState.error && <p>{fieldState.error.message}</p>}
            </>
          )}
        />

        <Controller
          name="info"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <textarea
                className={styles['form-textarea']}
                {...field}
                placeholder="Task info"
                cols={30}
                rows={5}></textarea>
              {fieldState.error && <p>{fieldState.error.message}</p>}
            </>
          )}
        />

        <label>
          Is task completed?&nbsp;
          <Controller
            name="isCompleted"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <input checked={field.value} onChange={(e) => field.onChange(e.target.checked)} type="checkbox" />
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </>
            )}
          />
        </label>

        <label>
          Is task important?&nbsp;
          <Controller
            name="isImportant"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <input checked={field.value} onChange={(e) => field.onChange(e.target.checked)} type="checkbox" />
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </>
            )}
          />
        </label>

        <button type="submit">{type}</button>
      </form>
    </>
  );
};

export default Form;
