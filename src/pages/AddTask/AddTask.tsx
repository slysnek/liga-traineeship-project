import { Link } from 'react-router-dom';
import styles from './AddTask.module.css';
import Form from 'app/Form/Form';

const AddTask = () => {
  return (
    <>
      <Link to={'/'}>Back to main page</Link>
      <Form type={'Add task'}></Form>
    </>
  );
};

export default AddTask;
