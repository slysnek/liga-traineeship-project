import { paths } from 'types/apiTypes';

export type AddTaskQuery = {
  name?: string;
  info?: string;
  isCompleted?: boolean;
  isImportant?: boolean;
};
export type ChangeTaskQuery = AddTaskQuery & {
  id?: number;
};
export type GetFilteredTasksQuery = {
  isImportant?: boolean;
  isCompleted?: boolean;
  name_like?: string;
};
export type IGetTasksResponse = paths['/tasks']['get']['responses']['200']['content']['application/json'];
export type IPostTaskResponse = paths['/tasks']['post']['responses']['200']['content']['application/json'];
export type IGetTaskResponse = paths['/tasks/{taskId}']['get']['responses']['200']['content']['application/json'];
export type IPatchTaskResponse = paths['/tasks/{taskId}']['patch']['responses']['200']['content']['application/json'];
export type IDeleteTaskResponse =
  paths['/tasks/{taskId}']['delete']['responses']['200']['content']['application/json; charset=utf-8'];
