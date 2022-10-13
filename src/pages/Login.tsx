import { FormEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import classes from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setSubmitting(true);

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      toast.error('Please enter username and password');
      return;
    }

    try {
      await login(username, password);
      toast.success('Log in successfully!');
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        return;
      }
      toast.error('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn]);

  if (isLoggedIn) return null;
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Login</h1>

      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" ref={usernameRef} />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} />
        </div>
        <div className={classes.formGroup}>
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </div>
      </form>

      <h2 className={classes.subtitle}>
        <Link to="/register">Don't have an account? Register</Link>
      </h2>
    </div>
  );
};

export default Login;
