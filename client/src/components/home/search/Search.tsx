import { FaSearch } from "react-icons/fa"
import styles from './Search.module.css';
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Job } from "../../../../interfaces";
import axios from "../../../config/axios";
import { useParams } from "react-router-dom";

interface searchProps {
  jobs: Job[]
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>
}

enum TAG {
  CLOTHING,
  CITY,
  COUNTRY
}

const Search = ({ jobs, setJobs }: searchProps) => {

  const [search, setSearch] = useState(false);
  const [tag, setTag] = useState(TAG.CLOTHING);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLocaleLowerCase();
    filter(query)
  }

  const filter = (query: string) => {
    if (tag == TAG.CLOTHING) {
      setJobs(jobs.filter((job) => job.clothing.includes(query)).slice(0, 9))
    }

    else if (tag == TAG.CITY) {
      setJobs(jobs.filter((job) => job.addr.city.includes(query)).slice(0, 9))
    }

    else if (tag == TAG.COUNTRY) {
      setJobs(jobs.filter((job) => job.addr.country.includes(query)).slice(0, 9))
    }

    else if (query.length === 0) {
      setJobs(jobs.slice(0, 9));
    }
  }

  const toggleSearch = () => {
    if (search) setJobs(jobs.slice(0, 9));
    setSearch(!search)
  }

  const changeTag = (e: React.MouseEvent<HTMLSpanElement>) => {
    const tags = Array.from(document.querySelectorAll(`.${styles.tag}`));
    tags.forEach((tag) => tag.classList.remove(`${styles.tagOn}`))
    e.currentTarget.classList.add(`${styles.tagOn}`);

    const curTag = e.currentTarget.innerText.toLocaleLowerCase();
    if (curTag == 'clothing') setTag(TAG.CLOTHING);
    if (curTag == 'city') setTag(TAG.CITY);
    if (curTag == 'country') setTag(TAG.COUNTRY);
  }

  useEffect(() => {
    filter((document.getElementById('search') as HTMLInputElement)?.value.toLocaleLowerCase()!);
  }, [tag])

  return (
    <div className={styles.container}>
      <FaSearch className={styles.search} onClick={toggleSearch}/>
      { search && 
        <TextField id="search" className={styles.textField} label="search" variant="outlined" required size="small" onChange={onChange}/>
      }
      <span className={`${styles.tag} ${styles.tagOn}`} onClick={changeTag}>Clothing</span>
      <span className={styles.tag} onClick={changeTag}>City</span>
      <span className={styles.tag} onClick={changeTag}>Country</span>
    </div>
  )
}

export default Search