import { paths } from '../types/apiTypes';

export type AddTaskForm = {
  name?: string;
  info?: string;
  isCompleted?: string;
  isImportant?: string;
};
export type ChangeTaskForm = AddTaskForm & {
  id?: string;
};
export type IGetTasksResponse = paths['/tasks']['get']['responses']['200']['content']['application/json'];
export type IPostTaskResponse = paths['/tasks']['post']['responses']['200']['content']['application/json'];
export type IGetTaskResponse = paths['/tasks/{taskId}']['get']['responses']['200']['content']['application/json'];
export type IPatchTaskResponse = paths['/tasks/{taskId}']['patch']['responses']['200']['content']['application/json'];
export type IDeleteTaskResponse =
  paths['/tasks/{taskId}']['delete']['responses']['200']['content']['application/json; charset=utf-8'];
