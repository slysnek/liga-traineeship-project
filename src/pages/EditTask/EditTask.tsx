import { useParams } from 'react-router-dom';
import styles from './EditTask.module.css';
import Form from 'app/Form/Form';
import { FormButton } from 'app/Form/Form.types';
import TitleLink from 'components/TitleLink/TitleLink';

const EditTask = () => {
  const { id } = useParams();

  return (
    <>
      <TitleLink link="/" buttonName="Back to tasks"></TitleLink>
      <Form taskId={Number(id)} type={'Edit task' as FormButton}></Form>
    </>
  );
};

export default EditTask;
