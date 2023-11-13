import Form from 'app/Form/Form';
import TitleLink from 'components/TitleLink/TitleLink';

const AddTask = () => {
  return (
    <>
      <TitleLink link="/" buttonName="Back to tasks"></TitleLink>
      <Form type={'Add task'}></Form>
    </>
  );
};

export default AddTask;
