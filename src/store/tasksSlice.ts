import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasksInitialState } from './storeTypes';
import Controller from 'api/apiController';
import Fetcher from 'api/apiFetcher';
import { BASE_URL } from 'constants/constants';
import { IGetTasksResponse, IPatchTaskResponse, IPostTaskResponse } from 'api/apiTypes';

const controller = new Controller(BASE_URL, new Fetcher());

export const getTasks = createAsyncThunk<IGetTasksResponse, void, { rejectValue: string }>(
  'tasksSlice/getTasks',
  async function (_, { rejectWithValue }) {
    try {
      const response = await controller.getData();
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while fetching tasks!');
    }
  }
);

export const removeTask = createAsyncThunk<void, number, { rejectValue: string }>(
  'tasksSlice/removeTask',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      await controller.deleteData(id);
      dispatch(deleteTask(id));
      return;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while removing task!');
    }
  }
);

export const addNewTask = createAsyncThunk<IPostTaskResponse, IPostTaskResponse, { rejectValue: string }>(
  'tasksSlice/addNewTask',
  async function ({ name, info, isCompleted }, { rejectWithValue, dispatch }) {
    try {
      const taskResponse = await controller.addData({ name, info, isCompleted });
      dispatch(addTask(taskResponse));
      return taskResponse;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while adding new task!');
    }
  }
);

export const changeTask = createAsyncThunk<IPatchTaskResponse, IPatchTaskResponse, { rejectValue: string }>(
  'tasksSlice/changeTask',
  async function ({ name, info, isCompleted, id }, { rejectWithValue, dispatch }) {
    try {
      const taskResponse = await controller.changeData({ name, info, isCompleted, id });
      console.log(taskResponse);
      dispatch(editTask(taskResponse));
      return taskResponse;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while editing task!');
    }
  }
);

const initialState: TasksInitialState = {
  tasks: [],
  status: undefined,
  error: undefined,
};

const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState: initialState,
  reducers: {
    addTask(state, action: PayloadAction<IPostTaskResponse>) {
      state.tasks.push({
        name: action.payload.name,
        info: action.payload.info,
        isCompleted: action.payload.isCompleted,
      });
    },
    editTask(state, action) {
      const taskID = state.tasks.findIndex((task) => task.id === action.payload.id);
      state.tasks[taskID].name = action.payload.name;
      state.tasks[taskID].info = action.payload.info;
      state.tasks[taskID].isCompleted = action.payload.isCompleted;
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers: {
    [String(getTasks.pending)]: (state) => {
      state.status = 'loading';
      state.error = undefined;
    },
    [String(getTasks.fulfilled)]: (state, action: PayloadAction<IGetTasksResponse>) => {
      state.status = 'resolved';
      state.error = undefined;
      state.tasks = action.payload;
    },
    [String(getTasks.rejected)]: (state, action: PayloadAction<string>) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [String(removeTask.rejected)]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { addTask, deleteTask, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;
