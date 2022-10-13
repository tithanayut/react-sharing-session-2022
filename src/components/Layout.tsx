import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import classes from './Layout.module.css';
import { useAuth } from '../providers/AuthProvider';

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  const { isLoggedIn, logout } = useAuth();

  return (
    <>
      <header className={classes.header}>
        <Link to="/">
          <Logo />
        </Link>
        {!isLoggedIn ? (
          <nav className={classes.nav}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
        ) : (
          <nav className={classes.nav}>
            <a className={classes.link} onClick={logout}>
              Logout
            </a>
          </nav>
        )}
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
