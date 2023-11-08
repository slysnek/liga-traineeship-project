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
        id: state.idCounter,
        name: action.payload.name,
        info: action.payload.info,
        isCompleted: action.payload.isCompleted,
      });
      state.idCounter = state.idCounter++;
    },
  },
});

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;
