import Form from 'app/Form/Form';
import ReturnBack from 'components/ReturnBack/ReturnBack';

const AddTask = () => {
  return (
    <>
      <ReturnBack buttonName="Back to tasks"></ReturnBack>
      <Form type={'addTask'}></Form>
    </>
  );
};

export default AddTask;
