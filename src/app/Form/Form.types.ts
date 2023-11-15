export type FormButton = 'addTask' | 'editTask';

export interface IFormProps {
  type: FormButton;
  taskId?: number;
}
