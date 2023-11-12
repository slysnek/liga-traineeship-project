import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasksInitialState } from './storeTypes';
import Controller from 'api/apiController';
import Fetcher from 'api/apiFetcher';
import { BASE_URL } from 'constants/constants';
import { GetFilteredTasksQuery, IGetTasksResponse, IPatchTaskResponse, IPostTaskResponse } from 'api/apiTypes';

const controller = new Controller(BASE_URL, new Fetcher());

export const getTasksQuery = createAsyncThunk<IGetTasksResponse, void, { rejectValue: string }>(
  'tasksSlice/getTasksQuery',
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
export const getFilteredTasksQuery = createAsyncThunk<
  IGetTasksResponse,
  GetFilteredTasksQuery,
  { rejectValue: string }
>('tasksSlice/getFilteredTasksQuery', async function (filters, { rejectWithValue }) {
  try {
    const response = await controller.getFilteredData(filters);
    return response;
  } catch (error) {
    console.error(error);
    return rejectWithValue('Error while fetching filtered tasks!');
  }
});

export const removeTaskQuery = createAsyncThunk<void, number, { rejectValue: string }>(
  'tasksSlice/removeTaskQuery',
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

export const addNewTaskQuery = createAsyncThunk<IPostTaskResponse, IPostTaskResponse, { rejectValue: string }>(
  'tasksSlice/addNewTaskQuery',
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

export const changeTaskQuery = createAsyncThunk<IPatchTaskResponse, IPatchTaskResponse, { rejectValue: string }>(
  'tasksSlice/changeTaskQuery',
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
  filters: {
    isImportant: undefined,
    isCompleted: undefined,
    name_like: undefined,
  },
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
    searchTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => {
        if (task.name) {
          return task.name.toString().toLowerCase().includes(action.payload.toLowerCase());
        }
        if (task.info) {
          return task.info.toString().toLowerCase().includes(action.payload.toLowerCase());
        }
      });
    },
    changeFilters(state, action: PayloadAction<GetFilteredTasksQuery>) {
      state.filters = action.payload;
    },
    editTask(state, action: PayloadAction<IPatchTaskResponse>) {
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
    [String(getTasksQuery.pending)]: (state) => {
      state.status = 'loading';
      state.error = undefined;
    },
    [String(getTasksQuery.fulfilled)]: (state, action: PayloadAction<IGetTasksResponse>) => {
      state.status = 'resolved';
      state.error = undefined;
      state.tasks = action.payload;
    },
    [String(getTasksQuery.rejected)]: (state, action: PayloadAction<string>) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [String(getFilteredTasksQuery.pending)]: (state) => {
      state.status = 'loading';
      state.error = undefined;
    },
    [String(getFilteredTasksQuery.fulfilled)]: (state, action: PayloadAction<IGetTasksResponse>) => {
      state.status = 'resolved';
      state.error = undefined;
      state.tasks = action.payload;
    },
    [String(getFilteredTasksQuery.rejected)]: (state, action: PayloadAction<string>) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [String(removeTaskQuery.rejected)]: (state, action: PayloadAction<string>) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { addTask, deleteTask, editTask, changeFilters, searchTask } = tasksSlice.actions;

export default tasksSlice.reducer;
