import { createSlice } from '@reduxjs/toolkit';
import { fakeList } from 'constants/fakeList';

const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState: {
    tasks: fakeList,
    idCounter: fakeList.length + 1,
  },
  reducers: {
    addTask(state, action) {
      state.tasks.push({
        name: action.payload.name,
        info: action.payload.info,
        isCompleted: action.payload.isCompleted,
        id: state.idCounter,
      });
      state.idCounter += 1;
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
  },
});

export const { addTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
