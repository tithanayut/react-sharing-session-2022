import useContentList from '../hooks/useContentList';
import ContentCard from './ContentCard';
import Loading from './Loading';
import Error from './Error';
import classes from './ContentList.module.css';

const ContentList = () => {
  const { loading, error, contents } = useContentList();

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className={classes.container}>
      {contents.map((content) => (
        <ContentCard key={content.id} {...content} />
      ))}
    </div>
  );
};

export default ContentList;
