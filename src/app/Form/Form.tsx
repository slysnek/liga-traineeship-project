import styles from './Form.module.css';

const Form = ({ type }: any) => {
  return (
    <>
      <form action="">
        <input required placeholder="Task name" type="text" />
        <input required placeholder="Task info" type="text" />
        <label>
          Is task completed?
          <input type="checkbox" />
        </label>
        <button type="submit">{type}</button>
      </form>
    </>
  );
};

export default Form;
