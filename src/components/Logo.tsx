import classes from './Logo.module.css';

const Logo = () => {
  return (
    <div className={classes.logo}>
      <img className={classes.img} src="/logo.svg" alt="LearnHub logo" />
      <span>LearnHub</span>
    </div>
  );
};

export default Logo;
