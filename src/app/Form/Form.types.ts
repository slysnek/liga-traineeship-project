export type FormButton = 'Add task' | 'Edit task';

export interface IForm {
  type: FormButton;
  taskId?: number;
}
