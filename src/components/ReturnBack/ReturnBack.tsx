import { useNavigate } from 'react-router-dom';
import styles from 'components/ReturnBack/ReturnBack.module.css';
import { ReturnBackProps } from 'components/ReturnBack/ReturnBack.types';

const ReturnBack: React.FC<ReturnBackProps> = (props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <>
      <button onClick={handleNavigate} className={styles.link}>
        <h3>{props.buttonName}</h3>
      </button>
    </>
  );
};

export default ReturnBack;
