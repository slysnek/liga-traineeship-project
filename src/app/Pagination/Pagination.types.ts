import { ITaskProps } from 'app/Task/Task.types';
import TaskList from 'app/TaskList/TaskList';

export interface IPaginationProps {
  dataToMap: ITaskProps[];
  list: typeof TaskList;
}
