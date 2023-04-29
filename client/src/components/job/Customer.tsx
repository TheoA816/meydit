import styles from './Job.module.css'
import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { User } from '../../../interfaces';

interface customerProps {
  custId: number
}

const Customer = ({ custId }: customerProps) => {

  const [cust, setCust] = useState<User>(null!);

  useEffect(() => {
    const loadCust = async () => {
      const customer = await axios.get('/getuser', { params: { id: custId }});
      setCust(customer.data);
    }
    loadCust();
  }, [])

  return (
    <div className={styles.customer}>

      {/* IMAGE */}
      <img className={styles.custImg} src={cust?.profpic}/>

      {/* DETAILS */}
      <div className={styles.custDetails}>
        <span className={styles.title}>{cust?.name}</span>
        <span className={styles.info}>{cust?.email}</span>
      </div>
    </div>
  )
}

export default Customer