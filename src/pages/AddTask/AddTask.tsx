import styles from './AddTask.module.css';
import Form from 'app/Form/Form';
import { Loader } from 'components/Loader';
import PopUp from 'components/PopUp/PopUp';
import ReturnBack from 'components/ReturnBack/ReturnBack';
import { useAppSelector } from 'src/hooks/hooks';

const AddTask = () => {
  const { status, error } = useAppSelector((state) => state.tasksInStore);

  return (
    <>
      <div className={styles.status}>
        {status.addTaskStatus === 'loading' && (
          <Loader variant="circle" isLoading={true}>
            <h2>Loading</h2>
          </Loader>
        )}
      </div>
      {status.addTaskStatus === 'resolved' && <PopUp error={false} message="Task was added successfuly!"></PopUp>}
      {error && <PopUp error={true} message={error}></PopUp>}
      <ReturnBack buttonName="Back to tasks"></ReturnBack>
      <Form type={'addTask'}></Form>
    </>
  );
};

export default AddTask;
