import { Link } from 'react-router-dom';
import pencilIcon from '../../assets/icons/icon-pencil.svg';
import crossIcon from '../../assets/icons/icon-cross.svg';
import checkmarkIcon from '../../assets/icons/icon-checkmark.svg';
import deleteIcon from '../../assets/icons/icon-delete.svg';
import styles from './Task.module.css';
import { ITaskType } from './Task.types';
import { removeTask } from 'src/store/tasksSlice';
import { useAppDispatch } from 'src/hooks/hooks';

const Task: React.FC<ITaskType> = (taskData: ITaskType) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    const idTodelete = taskData.id;
    dispatch(removeTask(idTodelete as number));
  };

  return (
    <li className={styles.task}>
      <h3 className={styles.name}>{taskData.name}</h3>
      <div className={styles.edit}>
        <Link to={`add_task/${taskData.id}`}>
          <img className={styles.icon} src={pencilIcon} alt="pencil icon" />
        </Link>
        <img onClick={handleDelete} className={styles.icon} src={deleteIcon} alt="delete icon" />
      </div>
      <p>{taskData.info}</p>
      <label className={styles.inputCheck}>
        {taskData.isCompleted ? (
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
      </label>
    </li>
  );
};

export default Task;
