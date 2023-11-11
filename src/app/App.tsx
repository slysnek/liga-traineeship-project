import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AddTask from 'pages/AddTask/AddTask';
import EditTask from 'pages/EditTask/EditTask';
import ShowTasks from 'pages/ShowTasks/ShowTasks';
import NotFound from 'pages/NotFound/NotFound';
import Layout from 'components/Layout/Layout';

export function App() {
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
