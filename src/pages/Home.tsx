import { useAuth } from '../providers/AuthProvider';
import Banner from '../components/Banner';
import ContentList from '../components/ContentList';
import classes from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Banner />
      {isLoggedIn && (
        <div className={classes.container}>
          <Link to="/new" className={classes.button}>
            Create new content
          </Link>
        </div>
      )}
      <ContentList />
    </>
  );
};

export default Home;
