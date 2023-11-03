import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTask from 'pages/AddTask/AddTask';
import EditTask from 'pages/EditTask/EditTask';
import ShowTasks from 'pages/ShowTasks/ShowTasks';
import NotFound from 'pages/NotFound/NotFound';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ShowTasks />} />
        <Route path="*" element={<NotFound />} />
        <Route path="add_task" element={<AddTask />} />
        <Route path="add_task/:id" element={<EditTask />} />
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
