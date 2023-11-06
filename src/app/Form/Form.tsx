import styles from './Form.module.css';
import { FormButton } from './Form.types';

const Form: React.FC<{ type: FormButton }> = ({ type }) => {
  return (
    <>
      <form className={styles.form} action="">
        <input required placeholder="Task name" type="text" />
        <textarea required placeholder="Task info" name="" id="" cols={30} rows={5}></textarea>
        <label>
          Is task completed?&nbsp;
          <input type="checkbox" />
        </label>
        <button type="submit">{type}</button>
      </form>
    </>
  );
};

export default Form;
