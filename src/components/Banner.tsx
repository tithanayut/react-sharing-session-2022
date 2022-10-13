import classes from './Banner.module.css';

const Banner = () => {
  return (
    <section className={classes.banner}>
      <h1 className={classes.title}>LearnHub</h1>
      <h2 className={classes.subtitle}>Hub for Educational Videos</h2>
    </section>
  );
};

export default Banner;
