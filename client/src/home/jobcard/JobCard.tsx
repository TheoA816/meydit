import styles from './JobCard.module.css';

interface JobCardProps {
  city: string,
  clothing: string
}

const JobCard = ({ city, clothing }: JobCardProps) => {

  return (
    // on click - navigate to page, look up data with id
    <div className={styles.container}>
      {city} {clothing}
    </div>
  )
}

export default JobCard