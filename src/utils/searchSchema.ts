import * as Yup from 'yup';

export const searchSchema = Yup.object().shape({
  searchQuery: Yup.string(),
});
