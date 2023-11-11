import { IGetTasksResponse } from 'api/apiTypes';

export type TasksInitialState = {
  tasks: IGetTasksResponse;
  status?: string;
  error?: string;
};
