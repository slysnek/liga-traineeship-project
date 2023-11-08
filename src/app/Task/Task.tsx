import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import pencilIcon from '../../assets/icons/icon-pencil.svg';
import crossIcon from '../../assets/icons/icon-cross.svg';
import checkmarkIcon from '../../assets/icons/icon-checkmark.svg';
import deleteIcon from '../../assets/icons/icon-delete.svg';
import styles from './Task.module.css';
import { ITaskType } from './Task.types';
import { deleteTask } from 'src/store/tasksSlice';

const Task: React.FC<ITaskType> = (taskData: ITaskType) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const idTodelete = taskData.id;
    dispatch(deleteTask({ id: idTodelete }));
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
