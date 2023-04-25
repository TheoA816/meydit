import { Button } from '@mui/material'
import styles from './Login.module.css'
import { FcGoogle } from 'react-icons/fc'
import axios from '../config/axios'

const Login = () => {

  const loginRedirect = async () => {
    const googleUrl = await axios.get('/login');
    window.location.href = googleUrl.data;
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>Sign In to Meydit</span>
      <Button className={styles.button} variant="outlined" onClick={loginRedirect}>
        <FcGoogle className={styles.svg}/>
        <span>Google</span>
      </Button>
    </div>
  )
}

export default Login