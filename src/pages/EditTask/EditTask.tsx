import { useParams } from 'react-router-dom';
import taskNotFound from '../../assets/gif/task-not-found.gif';
import styles from './EditTask.module.css';
import Form from 'app/Form/Form';
import { FormButton } from 'app/Form/Form.types';
import TitleLink from 'components/TitleLink/TitleLink';
import { useAppSelector } from 'src/hooks/hooks';

const EditTask = () => {
  const { id } = useParams();
  const taskToEdit = useAppSelector((state) => state.tasksInStore.tasks.find((task) => task.id === Number(id)));
  return (
    <>
      <TitleLink link="/" buttonName="Back to tasks"></TitleLink>
      {taskToEdit ? (
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
