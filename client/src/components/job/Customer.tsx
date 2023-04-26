import styles from './Job.module.css'
import { useAuth } from '../../context/AuthProvider';

const Customer = () => {

  const { user } = useAuth();
  console.log(user)

  return (
    <div className={styles.customer}>

      {/* IMAGE */}
      <img className={styles.custImg} src={user?.profpic}/>

      {/* DETAILS */}
      <div className={styles.custDetails}>
        <span className={styles.title}>{user?.name}</span>
        <span className={styles.info}>{user?.email}</span>
      </div>
    </div>
  )
}

export default Customer