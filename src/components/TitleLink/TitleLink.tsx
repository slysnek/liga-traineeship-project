import { Link } from 'react-router-dom';
import styles from './TitleLink.module.css';
import { TitleLinkProps } from './TitleLink.types';
import TaskList from 'app/TaskList/TaskList';

const TitleLink: React.FC<TitleLinkProps> = (props) => {
  return (
    <>
      <Link className={styles.link} to={props.link}>
        <h2>{props.buttonName}</h2>
      </Link>
    </>
  );
};

export default TitleLink;
