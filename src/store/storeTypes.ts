import { GetFilteredTasksQuery, GetTaskResponse, GetTasksResponse } from 'api/apiTypes';

export type TasksInitialState = {
  tasks: GetTasksResponse;
  currentTask?: GetTaskResponse;
  status: QueryStatuses;
  error?: string;
  filters: GetFilteredTasksQuery;
};

export type QueryStatuses = {
  getTasksStatus?: string;
  getTaskByIdStatus?: string;
  deleteTaskStatus?: string;
  editTaskStatus?: string;
  addTaskStatus?: string;
};
