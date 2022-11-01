import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import ReactStars from 'react-stars';
import toast from 'react-hot-toast';
import { api } from '../utils/axios';
import withGuard from '../guards/withGuard';
import { ErrorDto } from '../types/dto';
import classes from './Create.module.css';

const Create = () => {
  const navigate = useNavigate();
  const videoUrlRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLInputElement>(null);
  const [rating, setRating] = useState(0);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setSubmitting(true);

    const videoUrl = videoUrlRef.current?.value;
    const comment = commentRef.current?.value;

    if (!videoUrl || !comment) {
      toast.error('Please complete the form');
      setSubmitting(false);
      return;
    }

    try {
      await api.post('/content', {
        videoUrl,
        comment,
        rating,
      });
      toast.success('Content created!');
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
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

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Create new content</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="video-url">Video URL</label>
          <input type="text" id="video-url" ref={videoUrlRef} />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="comment">Comment (280 characters maximum)</label>
          <input type="text" id="comment" ref={commentRef} />
        </div>
        <div className={classes.formGroup}>
          <div className={classes.ratingContainer}>
            <label>Rating</label>
            <ReactStars
              count={5}
              value={rating}
              onChange={(newRating) => setRating(newRating)}
              size={42}
              half={false}
              color2="#ff731d"
            />
          </div>
        </div>
        <div className={classes.formGroup}>
          <button type="submit" disabled={isSubmitting}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default withGuard(Create);
