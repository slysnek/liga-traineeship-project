import { Link } from 'react-router-dom';
import styles from './EditTask.module.css';
import Form from 'app/Form/Form';
import { FormButton } from 'app/Form/Form.types';

const EditTask = () => {
  return (
    <>
      <Link to={'/'}>Back to main page</Link>
      <Form type={'Edit task' as FormButton}></Form>
    </>
  );
};

export default EditTask;
