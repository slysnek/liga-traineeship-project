import { Link } from 'react-router-dom';
import styles from './TitleLink.module.css';
import { TitleLinkProps } from './TitleLink.types';

const TitleLink: React.FC<TitleLinkProps> = (props) => {
  return (
    <>
      <Link className={styles.link} to={props.link}>
        <h3>{props.buttonName}</h3>
      </Link>
    </>
  );
};

export default TitleLink;
