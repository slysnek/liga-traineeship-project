import { useEffect, useState } from 'react';
import styles from './Filters.module.css';
import { IFilterProps } from 'app/FIlters/Filters.types';
import { ITaskType } from 'app/Task/Task.types';

const Filters: React.FC<IFilterProps> = ({ tasks, onFilteredTasksChange }) => {
  useEffect(() => {
    onFilteredTasksChange(tasks);
  }, [tasks]);
  const resetTasks = () => {
    onFilteredTasksChange(tasks);
  };
  const filterCompletedTasks = () => {
    const completedTasks = tasks.filter((task) => {
      return task.isCompleted === true;
    });
    onFilteredTasksChange(completedTasks);
  };
  const filterImportantTasks = () => {
    const importantTasks = tasks.filter((task) => {
      return task.isImportant === true;
    });
    onFilteredTasksChange(importantTasks);
  };

  return (
    <div className={styles['filters-wrapper']}>
      <button onClick={() => resetTasks()}>All</button>
      <button onClick={() => filterCompletedTasks()}>Completed</button>
      <button onClick={() => filterImportantTasks()}>Important</button>
    </div>
  );
};

export default Filters;
