import { useLoaderData, useParams } from 'react-router-dom';
import styles from './Home.module.css';
import AddJob from './addjob/AddJob';
import Header from './header/Header';
import JobCard from './jobcard/JobCard';
import Search from './search/Search';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import axios from '../../config/axios';
import Pages from './pages/Pages';
import { Job } from '../../../interfaces';

const Home = () => {

  const fullJobList: Job[] = useLoaderData() as Job[];
  const [jobs, setJobs] = useState(fullJobList.slice(0, 9));
  const { user, setUser } = useAuth();
  const page = parseInt(useParams().page!);

  useEffect(() => {
    const offset = page * 9;
    setJobs(fullJobList.slice(offset, offset + 9));
  }, [fullJobList])

  useEffect(() => {
    const checkLogin = async () => {
      const res = (await axios.get('/isloggedin')).data;
      if (res.err) setUser({ id: -1, email: "Invalid", profpic: "Invalid", name: "Invalid" });
      else setUser({ id: res.id, email: res.email, profpic: res.profpic, name: res.name });
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
          <Search jobs={fullJobList} setJobs={setJobs}/>
          <AddJob/>
        </div>

        {/* Jobs */}
        {jobs.length !== 0 ?
          <div className={styles.jobsboard}>
            {/* map data into job */}
            {jobs.map((job) => (
              <JobCard job={job} key={job.id}/>
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