import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import ReactStars from 'react-stars';
import toast from 'react-hot-toast';
import { useAuth } from '../providers/AuthProvider';
import useContent from '../hooks/useContent';
import { api } from '../utils/axios';
import withGuard from '../guards/withGuard';
import { ErrorDto } from '../types/dto';
import Loading from '../components/Loading';
import Error from '../components/Error';
import classes from './Edit.module.css';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, content } = useContent(id || '');
  const { username } = useAuth();

  const commentRef = useRef<HTMLInputElement>(null);
  const [rating, setRating] = useState(0);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (content?.rating) setRating(content.rating);
  }, [content]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setSubmitting(true);

    const comment = commentRef.current?.value;

    if (!comment) {
      toast.error('Comment cannot be blank');
      setSubmitting(false);
      return;
    }

    try {
      await api.patch(`/content/${id}`, {
        comment,
        rating,
      });
      toast.success('Content edited!');
      navigate('/');
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

  if (loading || !content) return <Loading />;
  if (error) return <Error />;
  if (content.postedBy.username !== username)
    return <Error message="You don't have permission to edit this content" />;

  const { comment } = content;

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Edit content</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="comment">Comment (280 characters maximum)</label>
          <input
            type="text"
            id="comment"
            defaultValue={comment}
            ref={commentRef}
          />
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
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default withGuard(Edit);
