import { ITaskType } from 'app/Task/Task.types';

export interface IPaginationProps {
  tasks: ITaskType[];
  onDisplayedTasksChange: (tasks: ITaskType[]) => void;
}
