import { useLoaderData, useParams } from 'react-router-dom';
import styles from './Home.module.css';
import AddJob from './addjob/AddJob';
import Header from './header/Header';
import JobCard from './jobcard/JobCard';
import Search from './search/Search';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import axios from '../../config/axios';
import Pages from './pages/Pages';

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
  const { user, setUser } = useAuth();
  console.log(user)

  useEffect(() => {
    const checkLogin = async () => {
      const res = (await axios.get('/isloggedin')).data;
      if (res.err) setUser({ id: -1, email: "Invalid", profpic: "Invalid" });
      else setUser({ id: res.id, email: res.email, profpic: res.profpic });
    }
    checkLogin();
  }, [])

  return (
    <>

      {/* Header */}
      <Header/>

      {/* Body */}
      <div className={styles.container}>

        {/* Search Header */}
        <div className={styles.search}>
          <Search/>
          <AddJob/>
        </div>

        {/* Jobs */}
        {jobs.length !== 0 ?
          <div className={styles.jobsboard}>
            {/* map data into job */}
            {jobs.map((job) => (
              <JobCard city={job.addr.city} clothing={job.clothing} key={job.id}/>
            ))}
          </div>
        :
          <div className={styles.err}>No Jobs Found</div>
        }

        {/* Page directory */}
        <Pages page={ parseInt(useParams().page!) } jobCount={jobs.length}/>
      </div>

    </>
  )
}

export default Home