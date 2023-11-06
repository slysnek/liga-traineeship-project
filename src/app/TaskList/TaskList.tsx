import { useState } from 'react';
import styles from './TaskList.module.css';
import Task from 'app/Task/Task';

const TaskList = () => {
  const [tasksData, setTaskData] = useState([
    {
      name: 'Test name',
      info: 'Test info bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
      isCompleted: false,
      id: 1,
    },
    {
      name: 'Test name 2 ',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, vel. Illo qui omnis, asperiores ab neque, impedit necessitatibus esse eligendi exercitationem totam aliquid id maiores, quasi cum veniam sunt eius!',
      isCompleted: true,
      id: 2,
    },
    {
      name: 'Test name 3 ',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, vel. Illo qui omnis, asperiores ab neque, impedit necessitatibus esse eligendi exercitationem totam aliquid id maiores, quasi cum veniam sunt eius!',
      isCompleted: true,
      id: 3,
    },
    {
      name: 'Test name 4 ',
      info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, nam beatae? Eligendi ex assumenda autem repellendus voluptatem neque beatae a fugit fugiat? Magnam ad ratione labore accusamus fuga delectus, explicabo in, quasi quam placeat laboriosam neque vel! Explicabo harum ullam doloremque officia? Debitis nihil exercitationem veritatis nesciunt, perspiciatis praesentium nulla sunt cum? Maiores debitis et, corrupti facilis voluptas pariatur veniam perferendis similique error sit tenetur illum eum rem labore sed quod id eaque aut repudiandae veritatis cum necessitatibus rerum eos magnam. Illo quod nemo quidem consectetur hic? Esse provident repellat officia sequi aperiam debitis voluptate officiis, quae, impedit libero aliquid.',
      isCompleted: false,
      id: 4,
    },
  ]);

  return (
    <>
      <ul className={styles.tasklist}>
        {tasksData.map((task) => {
          return <Task key={task.id} {...task} />;
        })}
      </ul>
    </>
  );
};

export default TaskList;
