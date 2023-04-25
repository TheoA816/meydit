import { useLoaderData } from 'react-router-dom';
import styles from './Home.module.css';
import AddJob from './addjob/AddJob';
import Header from './header/Header';
import JobCard from './jobcard/JobCard';
import Search from './search/Search';

interface Job {
  id: number,
  clothing: string,
  material: string,
  budget: number,
  count: number,
  descr: string,
  contact: number,
  addr: {
    id: number,
    city: string,
    country: string,
    state: string,
    zipcode: number
  }
}

const Home = () => {

  const jobs: Job[] = useLoaderData() as Job[];
  console.log(jobs)

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
          {jobs.map((job) => (
            <JobCard city={job.addr.city} clothing={job.clothing} key={job.id}/>
          ))}
        </div>

        {/* Page directory */}
      </div>

    </>
  )
}

export default Home