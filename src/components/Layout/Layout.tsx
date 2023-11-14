import { Outlet, useSearchParams, useNavigate, NavLink } from 'react-router-dom';
import styles from 'components/Layout/Layout.module.css';
import { useAppDispatch } from 'src/hooks/hooks';
import { changeFilters } from 'src/store/tasksSlice';
const Layout = () => {
  const navigate = useNavigate();

  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleGoHome = () => {
    setSearchParams({});
    navigate('/');
    dispatch(changeFilters({}));
  };

  return (
    <>
      <header className={styles.header}>
        <NavLink onClick={handleGoHome} to="/">
          <h1 className={styles.logo}>TODO APP</h1>
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
