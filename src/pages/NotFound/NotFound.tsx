import dissapear from '../../assets/gif/dissapear.gif';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h2>Page was not found!</h2>
      <img className={styles.scream} src={dissapear} alt="screaming and vanishing emoji" />
    </div>
  );
};

export default NotFound;
