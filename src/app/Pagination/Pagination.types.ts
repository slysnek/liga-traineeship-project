import { ITaskType } from 'app/Task/Task.types';
import TaskList from 'app/TaskList/TaskList';

export interface IPaginationProps {
  dataToMap: ITaskType[];
  list: typeof TaskList;
}
