import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasksInitialState } from 'src/store/storeTypes';
import Controller from 'api/apiController';
import Fetcher from 'api/apiFetcher';
import { BASE_URL } from 'constants/constants';
import {
  AddTaskQuery,
  ChangeTaskQuery,
  GetFilteredTasksQuery,
  IGetTaskResponse,
  IGetTasksResponse,
  IPatchTaskResponse,
  IPostTaskResponse,
} from 'api/apiTypes';

const controller = new Controller(BASE_URL, new Fetcher());

export const getTasksQuery = createAsyncThunk<IGetTasksResponse, GetFilteredTasksQuery, { rejectValue: string }>(
  'tasksSlice/getTasksQuery',
  async function (filters, { rejectWithValue }) {
    try {
      const response = await controller.getData(filters);
      return response;
    } catch {
      return rejectWithValue('Error while fetching tasks!');
    }
  }
);

export const getTaskByIdQuery = createAsyncThunk<IGetTaskResponse, number, { rejectValue: string }>(
  'tasksSlice/getTaskByIdQuery',
  async function (id, { rejectWithValue }) {
    try {
      const response = await controller.getDataById(id);
      return response;
    } catch {
      return rejectWithValue('Error while fetching task!');
    }
  }
);

export const removeTaskQuery = createAsyncThunk<void, number, { rejectValue: string }>(
  'tasksSlice/removeTaskQuery',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      await controller.deleteData(id);
      dispatch(deleteTask(id));
      return;
    } catch {
      return rejectWithValue('Error while removing task!');
    }
  }
);

export const addNewTaskQuery = createAsyncThunk<IPostTaskResponse, AddTaskQuery, { rejectValue: string }>(
  'tasksSlice/addNewTaskQuery',
  async function (data, { rejectWithValue, dispatch }) {
    try {
      const taskResponse = await controller.addData(data);
      dispatch(addTask(taskResponse));
      return taskResponse;
    } catch {
      return rejectWithValue('Error while adding new task!');
    }
  }
);

export const changeTaskQuery = createAsyncThunk<IPatchTaskResponse, ChangeTaskQuery, { rejectValue: string }>(
  'tasksSlice/changeTaskQuery',
  async function (data, { rejectWithValue, dispatch }) {
    try {
      const taskResponse = await controller.changeData(data);
      dispatch(editTask(taskResponse));
      return taskResponse;
    } catch {
      return rejectWithValue('Error while editing task!');
    }
  }
);

const initialState: TasksInitialState = {
  tasks: [],
  status: {
    addTaskStatus: undefined,
    getTaskByIdStatus: undefined,
    getTasksStatus: undefined,
    editTaskStatus: undefined,
    deleteTaskStatus: undefined,
  },
  error: undefined,
  currentTask: undefined,
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
        isImportant: action.payload.isImportant,
      });
    },
    changeFilters(state, action: PayloadAction<GetFilteredTasksQuery>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    editTask(state, action: PayloadAction<IPatchTaskResponse>) {
      const taskID = state.tasks.findIndex((task) => task.id === action.payload.id);
      state.tasks[taskID].name = action.payload.name;
      state.tasks[taskID].info = action.payload.info;
      state.tasks[taskID].isCompleted = action.payload.isCompleted;
      state.tasks[taskID].isImportant = action.payload.isImportant;
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    resetAddAndEditTaskStatus(state) {
      state.status.addTaskStatus = undefined;
      state.status.editTaskStatus = undefined;
    },
    resetdeleteTaskStatus(state) {
      state.status.deleteTaskStatus = undefined;
    },
  },
  extraReducers: {
    //get
    [String(getTasksQuery.pending)]: (state) => {
      state.status.getTasksStatus = 'loading';
      state.error = undefined;
    },
    [String(getTasksQuery.fulfilled)]: (state, action: PayloadAction<IGetTasksResponse>) => {
      state.status.getTasksStatus = 'resolved';
      state.error = undefined;
      state.tasks = action.payload;
    },
    [String(getTasksQuery.rejected)]: (state, action: PayloadAction<string>) => {
      state.status.getTasksStatus = 'rejected';
      state.error = action.payload;
    },
    //get by id
    [String(getTaskByIdQuery.pending)]: (state) => {
      state.status.getTaskByIdStatus = 'loading';
      state.error = undefined;
    },
    [String(getTaskByIdQuery.fulfilled)]: (state, action: PayloadAction<IGetTaskResponse>) => {
      state.status.getTaskByIdStatus = 'resolved';
      state.error = undefined;
      state.currentTask = action.payload;
    },
    [String(getTaskByIdQuery.rejected)]: (state, action: PayloadAction<string>) => {
      state.status.getTaskByIdStatus = 'rejected';
      state.error = action.payload;
    },
    //delete
    [String(removeTaskQuery.pending)]: (state) => {
      state.status.deleteTaskStatus = 'loading';
      state.error = undefined;
    },
    [String(removeTaskQuery.fulfilled)]: (state) => {
      state.status.deleteTaskStatus = 'resolved';
      state.error = undefined;
    },
    [String(removeTaskQuery.rejected)]: (state, action: PayloadAction<string>) => {
      state.status.deleteTaskStatus = 'rejected';
      state.error = action.payload;
    },
    //edit
    [String(changeTaskQuery.pending)]: (state) => {
      state.status.editTaskStatus = 'loading';
      state.error = undefined;
    },
    [String(changeTaskQuery.fulfilled)]: (state) => {
      state.status.editTaskStatus = 'resolved';
      state.error = undefined;
    },
    [String(changeTaskQuery.rejected)]: (state, action: PayloadAction<string>) => {
      state.status.editTaskStatus = 'rejected';
      state.error = action.payload;
    },
    //add
    [String(addNewTaskQuery.pending)]: (state) => {
      state.status.addTaskStatus = 'loading';
      state.error = undefined;
    },
    [String(addNewTaskQuery.fulfilled)]: (state) => {
      state.status.addTaskStatus = 'resolved';
      state.error = undefined;
    },
    [String(addNewTaskQuery.rejected)]: (state, action: PayloadAction<string>) => {
      state.status.addTaskStatus = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { addTask, resetdeleteTaskStatus, resetAddAndEditTaskStatus, deleteTask, editTask, changeFilters } =
  tasksSlice.actions;

export default tasksSlice.reducer;
