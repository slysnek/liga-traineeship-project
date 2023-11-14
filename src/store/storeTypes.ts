import { GetFilteredTasksQuery, IGetTaskResponse, IGetTasksResponse } from 'api/apiTypes';

export type TasksInitialState = {
  tasks: IGetTasksResponse;
  currentTask?: IGetTaskResponse;
  status: Statuses;
  error?: string;
  filters: GetFilteredTasksQuery;
};

export type Statuses = {
  getTasksStatus?: string;
  getTaskByIdStatus?: string;
  deleteTaskStatus?: string;
  editTaskStatus?: string;
  addTaskStatus?: string;
};
