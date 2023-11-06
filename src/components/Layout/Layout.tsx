import { Link, Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
const Layout = () => {
  const navigate = useNavigate();

  const [, setSearchParams] = useSearchParams();

  const handleGoHome = () => {
    setSearchParams({});
    navigate('/');
  };

  return (
    <>
      <header className={styles.header}>
        <Link onClick={handleGoHome} to="/">
          <h1 className={styles.logo}>TODO APP</h1>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
