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
    editTask(state, action) {
      const taskID = state.tasks.findIndex((task) => task.id === action.payload.id);
      state.tasks[taskID].name = action.payload.name;
      state.tasks[taskID].info = action.payload.info;
      state.tasks[taskID].isCompleted = action.payload.isCompleted;
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
  },
});

export const { addTask, deleteTask, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;
