import { Link } from 'react-router-dom';
import styles from './EditTask.module.css';
import Form from 'app/Form/Form';
import { FormButton } from 'app/Form/Form.types';
import TitleLink from 'components/TitleLink/TitleLink';

const EditTask = () => {
  return (
    <>
      <TitleLink link="/" buttonName="Back to tasks"></TitleLink>
      <Form type={'Edit task' as FormButton}></Form>
    </>
  );
};

export default EditTask;
