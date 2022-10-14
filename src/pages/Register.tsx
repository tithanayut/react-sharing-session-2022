import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../providers/AuthProvider';
import { ErrorDto } from '../types/dto';
import { API_BASE_URL } from '../env';
import classes from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setSubmitting(true);

    const username = usernameRef.current?.value;
    const name = nameRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current?.value;

    if (!username || !name || !password || !passwordConfirm) {
      toast.error('Please complete the form');
      setSubmitting(false);
      return;
    }

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/user`, {
        username,
        name,
        password,
      });
      toast.success('Account created!');
      navigate('/login');
    } catch (err) {
      if (err instanceof AxiosError) {
        const { response } = err as AxiosError<ErrorDto>;
        const message = response?.data.message;
        toast.error(message || 'Something went wrong');
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

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Register</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" ref={usernameRef} />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameRef} />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            type="password"
            id="password-confirm"
            ref={passwordConfirmRef}
          />
        </div>
        <div className={classes.formGroup}>
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </div>
      </form>
      <h2 className={classes.subtitle}>
        <Link to="/login">Already have an account? Login</Link>
      </h2>
    </div>
  );
};

export default Register;
