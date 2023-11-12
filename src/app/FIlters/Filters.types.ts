import { ITaskType } from 'app/Task/Task.types';

export interface IFilterProps {
  tasks: ITaskType[];
  onFilteredTasksChange: (tasks: ITaskType[]) => void;
}
