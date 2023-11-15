import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Task name is required')
    .min(4, 'Task name must be at least 4 characters')
    .max(40, 'Task name must not exceed 40 characters'),
  info: Yup.string()
    .required('Task info is required')
    .min(4, 'Task info must be at least 4 characters')
    .max(500, 'Task info must not be too long'),
  isCompleted: Yup.boolean(),
  isImportant: Yup.boolean().test('isImportant', 'Cannot be important if task is completed', function (value) {
    const isCompleted = this.parent.isCompleted as boolean;
    return !isCompleted || !value;
  }),
});
