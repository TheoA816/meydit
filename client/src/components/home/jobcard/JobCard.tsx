import { SyntheticEvent, useEffect, useState } from 'react';
import { Job } from '../../../../interfaces';
import NoImage from '../../../assets/noimage.png'
import styles from './JobCard.module.css';
import { useNavigate } from 'react-router-dom';

interface JobCardProps {
  job: Job
}

const JobCard = ({ job }: JobCardProps) => {

  const [src, setSrc] = useState(NoImage);
  const navigate = useNavigate();

  useEffect(() => {
    if (job.images[0]) setSrc(job.images[0])
  }, [])

  const onClick = () => {
    navigate(`/job/${job.id}`);
  }

  return (
    // on click - navigate to page, look up data with id
    <div className={styles.container}>
      <img src={src} alt={"No Image Found"} className={styles.img} onClick={onClick}/>
      <span className={styles.synopsis}>{job.clothing} at {job.addr.city}</span>
    </div>
  )
}

export default JobCard