import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import taskNotFound from '../../assets/gif/task-not-found.gif';
import styles from './EditTask.module.css';
import Form from 'app/Form/Form';
import { FormButton } from 'app/Form/Form.types';
import TitleLink from 'components/TitleLink/TitleLink';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { getTasksQuery } from 'src/store/tasksSlice';
import { Loader } from 'components/Loader';

const EditTask = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const tasks = useAppSelector((state) => state.tasksInStore.tasks);
  const task = tasks.find((task) => task.id === Number(id));

  useEffect(() => {
    dispatch(getTasksQuery({}));
  }, []);

  if (!tasks.length) {
    return (
      <div className={styles.loader}>
        <Loader isLoading={true}>
          <h2>Loading...</h2>
        </Loader>
      </div>
    );
  }

  return (
    <>
      <TitleLink link="/" buttonName="Back to tasks"></TitleLink>
      {task ? (
        <Form taskId={Number(id)} type={'Edit task' as FormButton}></Form>
      ) : (
        <div className={styles.taskNotFound}>
          <h2>Such a task was not found...</h2>
          <img className={styles.travoltaGif} src={taskNotFound} alt="task not found" />
        </div>
      )}
    </>
  );
};

export default EditTask;
