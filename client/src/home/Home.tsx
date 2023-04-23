import styles from './Home.module.css';
import AddJob from './addjob/AddJob';
import Header from './header/Header';
import JobCard from './jobcard/JobCard';
import Search from './search/Search';

const Home = () => {

  return (
    <>

      {/* Header */}
      <Header/>

      {/* Body */}
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

    </>
  )
}

export default Home