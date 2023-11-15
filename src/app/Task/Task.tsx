import { Link } from 'react-router-dom';
import styles from 'app/Task/Task.module.css';
import { ITaskType } from 'app/Task/Task.types';
import pencilIcon from 'assets/icons/icon-pencil.svg';
import crossIcon from 'assets/icons/icon-cross.svg';
import checkmarkIcon from 'assets/icons/icon-checkmark.svg';
import deleteIcon from 'assets/icons/icon-delete.svg';
import importantIcon from 'assets/icons/icon-important.svg';
import { removeTaskQuery } from 'src/store/tasksSlice';
import { useAppDispatch } from 'src/hooks/hooks';
import { convertToBoolean } from 'utils/convertToBoolean';

const Task: React.FC<ITaskType> = (taskData: ITaskType) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    const idTodelete = taskData.id;
    dispatch(removeTaskQuery(idTodelete as number));
  };

  return (
    <li className={`${styles.task} ${taskData.isImportant ? styles.important : ''}`}>
      <h3 className={styles.name}>{taskData.name ? taskData.name : 'Empty task name'}</h3>
      <div className={styles.edit}>
        <Link to={`task_form/${taskData.id}`}>
          <img className={styles.icon} src={pencilIcon} alt="pencil icon" />
        </Link>
        <img onClick={handleDelete} className={styles.icon} src={deleteIcon} alt="delete icon" />
      </div>
      <p>{taskData.info}</p>
      <label className={styles.inputCheck}>
        {convertToBoolean(taskData.isCompleted) ? (
          <>
            Completed&nbsp;
            <img className={styles.icon} src={checkmarkIcon} alt="checkmark icon" />
          </>
        ) : (
          <>
            Not completed&nbsp;
            <img className={styles.icon} src={crossIcon} alt="cross icon" />
          </>
        )}
        {convertToBoolean(taskData.isImportant) ? (
          <>
            <br />
            <span className={styles.importantText}>Important&nbsp;</span>
            <img className={styles.icon} src={importantIcon} alt="important icon" />
          </>
        ) : null}
      </label>
    </li>
  );
};

export default Task;
