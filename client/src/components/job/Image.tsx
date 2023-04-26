import styles from './Job.module.css'

interface imageProps {
  url: string
}

const Image = ({ url }: imageProps) => {

  return (
    <img src={url} alt='no picture found' className={styles.img}/>
  )
}

export default Image