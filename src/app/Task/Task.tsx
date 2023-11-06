import { Link } from 'react-router-dom';
import pencilIcon from '../../assets/icons/icon-pencil.svg';
import crossIcon from '../../assets/icons/icon-cross.svg';
import checkmarkIcon from '../../assets/icons/icon-checkmark.svg';
import styles from './Task.module.css';
import { ITaskType } from './Task.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Task: React.FC<ITaskType> = (taskData: ITaskType) => {
  return (
    <li className={styles.task}>
      <h3 className={styles.name}>{taskData.name}</h3>
      <Link className={styles.edit} to={`add_task/${taskData.id}`}>
        <img className={styles.icon} src={pencilIcon} alt="pencil icon" />
      </Link>
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
