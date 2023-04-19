import styles from './Body.module.css';
import AddJob from './addjob/AddJob';
import JobCard from './jobcard/JobCard';
import Search from './search/Search';

const Body = () => {

  return (
    <div className={styles.container}>

      {/* Search Header */}
      <div className={styles.options}>
        <Search/>
        <AddJob/>
      </div>

      {/* Jobs */}
      <div className={styles.jobsboard}>
        {/* map data into job */}
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
      </div>

    </div>
  )
}

export default Body