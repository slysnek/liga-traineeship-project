import { useState } from 'react';
import styles from './TaskList.module.css';
import Task from 'app/Task/Task';

const TaskList = () => {
  const [tasksData, setTaskData] = useState([
    {
      name: 'Test name',
      info: 'Test info bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
      isCompleted: 'false',
      id: 1,
    },
    {
      name: 'Test name 2 ',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, vel. Illo qui omnis, asperiores ab neque, impedit necessitatibus esse eligendi exercitationem totam aliquid id maiores, quasi cum veniam sunt eius!',
      isCompleted: 'true',
      id: 2,
    },
    {
      name: 'Test name 3 ',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, vel. Illo qui omnis, asperiores ab neque, impedit necessitatibus esse eligendi exercitationem totam aliquid id maiores, quasi cum veniam sunt eius!',
      isCompleted: 'true',
      id: 3,
    },
    {
      name: 'Test name 4 ',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, vel. Illo qui omnis, asperiores ab neque, impedit necessitatibus esse eligendi exercitationem totam aliquid id maiores, quasi cum veniam sunt eius!',
      isCompleted: 'true',
      id: 4,
    },
  ]);

  return (
    <>
      <h2>TaskList</h2>
      <ul className={styles.tasklist}>
        {tasksData.map((task) => {
          return <Task key={task.id} taskData={task} />;
        })}
      </ul>
    </>
  );
};

export default TaskList;
