import { Link } from 'react-router-dom';
import styles from './EditTask.module.css';
import Form from 'app/Form/Form';

const EditTask = () => {
  return (
    <>
      <Link to={'/'}>Back to main page</Link>
      <h2>EditTask page</h2>
      <Form type={'Edit task'}></Form>
    </>
  );
};

export default EditTask;
