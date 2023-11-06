import { Link, Outlet, useSearchParams, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  const [, setSearchParams] = useSearchParams();

  const handleGoHome = () => {
    setSearchParams({});
    navigate('/');
  };

  return (
    <>
      <header>
        <Link onClick={handleGoHome} to="/">
          go home
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
