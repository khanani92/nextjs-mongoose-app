import styles from './User.module.css';
import UserHeader from './UserHeader';

export const User = ({ user }) => {
  return (
    <div className={styles.root}>
      <UserHeader user={user} />
    </div>
  );
};
