import { GetFilteredTasksQuery, IGetTaskResponse, IGetTasksResponse } from 'api/apiTypes';

export type TasksInitialState = {
  tasks: IGetTasksResponse;
  currentTask?: IGetTaskResponse;
  status?: string;
  error?: string;
  filters: GetFilteredTasksQuery;
};
