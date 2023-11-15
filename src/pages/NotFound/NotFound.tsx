import styles from 'pages/NotFound/NotFound.module.css';
import dissapear from 'assets/gif/dissapear.gif';
import ReturnBack from 'components/ReturnBack/ReturnBack';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <ReturnBack buttonName="Return me back!"></ReturnBack>
      <h2>Page was not found!</h2>
      <img className={styles.scream} src={dissapear} alt="screaming and vanishing emoji" />
    </div>
  );
};

export default NotFound;
