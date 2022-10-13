import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import useContent from '../hooks/useContent';
import Loading from './Loading';
import Error from './Error';
import classes from './Content.module.css';

const Content = () => {
  const { id } = useParams();
  const { loading, error, content } = useContent(id || '');

  if (loading || !content) return <Loading />;
  if (error) return <Error />;

  const {
    videoTitle,
    videoUrl,
    comment,
    rating,
    creatorName,
    creatorUrl,
    postedBy,
    createdAt,
    updatedAt,
  } = content;

  const createDate = new Date(createdAt);
  const updateDate = new Date(updatedAt);

  const showUpdateDate = updateDate.getTime() > createDate.getTime();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>
          <h4 className={classes.title}>{videoTitle}</h4>
          <a href={creatorUrl} target="_blank">
            <h5 className={classes.subtitle}>{creatorName}</h5>
          </a>
        </div>

        <div className={classes.video}>
          <ReactPlayer url={videoUrl} />
        </div>

        <div className={classes.comment}>
          <p className={classes.commentText}>{comment}</p>

          <div className={classes.commentFooter}>
            <p>
              {[...Array(rating).keys()].map((star) => (
                <img
                  key={star}
                  className={classes.star}
                  src="/star.svg"
                  alt="Rating Star"
                />
              ))}
            </p>
            <p>
              <span className={classes.emdash}>&mdash;</span> {postedBy.name}
            </p>
            <p>{createDate.toDateString()}</p>
            {showUpdateDate && <p>(Updated on {updateDate.toDateString()})</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
