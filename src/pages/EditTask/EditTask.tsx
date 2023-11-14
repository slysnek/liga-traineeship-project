import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from 'pages/EditTask/EditTask.module.css';
import taskNotFound from 'assets/gif/task-not-found.gif';
import Form from 'app/Form/Form';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { getTaskByIdQuery, getTasksQuery } from 'src/store/tasksSlice';
import { Loader } from 'components/Loader';
import ReturnBack from 'components/ReturnBack/ReturnBack';
import PopUp from 'components/PopUp/PopUp';

const EditTask = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { status, error } = useAppSelector((state) => state.tasksInStore);
  const task = useAppSelector((state) => state.tasksInStore.currentTask);

  useEffect(() => {
    dispatch(getTasksQuery({}));
    dispatch(getTaskByIdQuery(Number(id)));
  }, []);

  return (
    <>
      <ReturnBack buttonName="Back to tasks"></ReturnBack>
      {status.getTaskByIdStatus === 'resolved' && <PopUp error={false} message="Task was found."></PopUp>}
      {status.editTaskStatus === 'resolved' && <PopUp error={false} message="Task was edited successfuly!"></PopUp>}
      {error && <PopUp error={true} message={error}></PopUp>}
      {!task && status.getTaskByIdStatus === 'loading' ? (
        <div className={styles.status}>
          {status.getTaskByIdStatus === 'loading' && (
            <Loader variant="circle" isLoading={true}>
              <h2>Loading</h2>
            </Loader>
          )}
        </div>
      ) : !task && status.getTaskByIdStatus === 'rejected' ? (
        <div className={styles.taskNotFound}>
          <h2>Such a task was not found...</h2>
          <img className={styles.travoltaGif} src={taskNotFound} alt="task not found" />
        </div>
      ) : (
        <Form taskId={Number(id)} type={'editTask'}></Form>
      )}
    </>
  );
};

export default EditTask;
