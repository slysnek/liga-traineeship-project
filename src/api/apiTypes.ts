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
export type GetTasksResponse = paths['/tasks']['get']['responses']['200']['content']['application/json'];
export type PostTaskResponse = paths['/tasks']['post']['responses']['200']['content']['application/json'];
export type GetTaskResponse = paths['/tasks/{taskId}']['get']['responses']['200']['content']['application/json'];
export type PatchTaskResponse = paths['/tasks/{taskId}']['patch']['responses']['200']['content']['application/json'];
export type DeleteTaskResponse =
  paths['/tasks/{taskId}']['delete']['responses']['200']['content']['application/json; charset=utf-8'];
