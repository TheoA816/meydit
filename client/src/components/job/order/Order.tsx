import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { Job } from '../../../../interfaces'
import styles from './Order.module.css'
import axios from '../../../config/axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useAuth } from '../../../context/AuthProvider'

interface orderProps {
  job: Job
}

const Order = ({ job }: orderProps) => {

  const navigate = useNavigate();
  const { user } = useAuth();
  const [curJob, setCurjob] = useState(job);
  const [addr, setAddr] = useState(job.addr);
  const [edit, setEdit] = useState(false);

  const handleOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setCurjob((values) => ({ ...values, [name]: value.toLowerCase() }));
  };

  const handleAddr = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddr((values) => ({ ...values, [name]: value.toLowerCase() }));
  };

  const delJob = async () => {
    await axios.delete('/user/deljob', { params: { id: job.id }});
    navigate('/');
    window.location.reload();
  }

  const saveJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = { ...curJob, addr: addr };
    await axios.post('user/editjob', params);
    window.location.reload();
  }

  return (
    <form className={styles.order} onSubmit={saveJob}>

      {/* order deets */}
      <div className={styles.titleContainer}>
        <span className={styles.ordTitle}>{job.clothing}</span>
        { job?.contact === user?.id &&
          <div className={styles.modify}>
            <FaPencilAlt onClick={() => setEdit(!edit)} className={styles.icon}/>
            <FaTrash onClick={delJob} className={styles.icon}/>
          </div>
        }
      </div>

      <div className={styles.orderDetail}>
        <span className={styles.property}>Material</span>
        { edit ?
          <TextField className={styles.textField} label="Material" variant="outlined" required size="small"
          name="material" value={curJob.material} onChange={handleOrder}/>
        :
          <span className={styles.data} contentEditable={edit} suppressContentEditableWarning={edit}>
            {job.material}
          </span>
        }
      </div>

      <div className={styles.orderDetail}>
        <span className={styles.property}>Budget</span>
        { edit ?
          <TextField className={styles.textField} label="Budget" variant="outlined" required size="small"
          name="budget" value={curJob.budget} onChange={handleOrder}/>
        :
          <span className={styles.data} contentEditable={edit} suppressContentEditableWarning={edit}>
            {job.budget}
          </span>
        }
      </div>

      <div className={styles.orderDetail}>
        <span className={styles.property}>Address</span>
        { edit ? 
        <>
          <TextField className={styles.textField} label="City" variant="outlined" required size="small"
          name="city" value={addr.city} onChange={handleAddr}/>
          <TextField className={styles.textField} label="Country" variant="outlined" required size="small"
          name="country" value={addr.country} onChange={handleAddr}/>
          <TextField className={styles.textField} label="State" variant="outlined" required size="small"
          name="state" value={addr.state} onChange={handleAddr}/>
          <TextField className={styles.textField} label="Zipcode" variant="outlined" required size="small"
          name="zipcode" value={addr.zipcode} onChange={handleAddr}/>
        </>
        :
          <span>
            {job.addr.city} - {job.addr.country} - {job.addr.state} - {job.addr.zipcode}
          </span>
        }
      </div>

      {/* description */}
      <div className={styles.orderDetail}>
        <span className={styles.descProperty}> Additional Information </span>
        { edit ?
          <TextField className={styles.textField} label="Description" multiline rows={4} variant="outlined"
          required size="small" name="descr" value={curJob.descr} onChange={handleOrder}/>
        :
          <div className={styles.desc}>
            {job.descr}
          </div>
        }
      </div>

      { edit && <Button type="submit" variant="outlined">Save</Button> }
    </form>
  )
}

export default Order
