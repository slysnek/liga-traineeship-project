import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import taskNotFound from '../../assets/gif/task-not-found.gif';
import styles from './EditTask.module.css';
import Form from 'app/Form/Form';
import { FormButton } from 'app/Form/Form.types';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { getTaskByIdQuery } from 'src/store/tasksSlice';
import { Loader } from 'components/Loader';
import ReturnBack from 'components/ReturnBack/ReturnBack';

const EditTask = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const task = useAppSelector((state) => state.tasksInStore.currentTask);

  useEffect(() => {
    dispatch(getTaskByIdQuery(Number(id)));
  }, []);

  if (!task) {
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
      <ReturnBack buttonName="Back to tasks"></ReturnBack>
      {task ? (
        <Form taskId={Number(id)} type={'editTask'}></Form>
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
