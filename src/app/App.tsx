import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import AddTask from 'pages/AddTask/AddTask';
import EditTask from 'pages/EditTask/EditTask';
import ShowTasks from 'pages/ShowTasks/ShowTasks';
import NotFound from 'pages/NotFound/NotFound';
import Layout from 'components/Layout/Layout';
import Controller from 'api/apiController';
import Fetcher from 'api/apiFetcher';
import { AddTaskForm } from 'api/apiTypes';

export function App() {
  const controller = new Controller('http://37.220.80.108/tasks', new Fetcher());

  useEffect(() => {
    async function getData() {
      const data = await controller.getData();
      console.log(data);
    }
    async function add() {
      const form: AddTaskForm = {
        name: 'apple',
        info: 'carrot',
        isImportant: 'true',
      };

      const data = await controller.addData(form);
    }
    async function deleteTask() {
      const data = await controller.deleteData('100');
      console.log(data);
    }
    async function changeTask() {
      const data = await controller.changeData({ id: '100', info: 'change task' });
      console.log(data);
    }
    //getData();
    //add();
    //getData();
    //changeTask();
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ShowTasks />} />
          <Route path="*" element={<Navigate to="not_found" replace={true} />} />
          <Route path="not_found" element={<NotFound />} />
          <Route path="add_task" element={<AddTask />} />
          <Route path="add_task/:id" element={<EditTask />} />
        </Route>
      </Routes>
    </>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
