import { useEffect, useState } from 'react';
import styles from 'components/PopUp/PopUp.module.css';
import { PopUpProps } from 'components/PopUp/PopUp.types';

const PopUp: React.FC<PopUpProps> = ({ message, error }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(false);
    }, 1300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={`${styles.popUp} ${error ? styles.error : ''} `}>
      <h3>{message}</h3>
    </div>
  );
};

export default PopUp;
