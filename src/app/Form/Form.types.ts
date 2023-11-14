export type FormButton = 'addTask' | 'editTask';

export interface IForm {
  type: FormButton;
  taskId?: number;
}
