import { Link } from 'react-router-dom'
import styles from './ImageUpload.module.css'
import { useEffect, useRef, useState } from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { myFile } from '../../../interfaces';

interface imageProps {
  myFile: myFile,
  files: myFile[],
  setFiles: React.Dispatch<React.SetStateAction<myFile[]>>
}

const Image = ({ myFile, files, setFiles }: imageProps) => {

  const [show, setShow] = useState(false);

  const showPreview = () => {
    setShow(true);
  }

  const delUpload = () => {
    setFiles(files.filter((file) => file !== myFile))
  }
  
  return (
    <>
      <div className={styles.imgContainer}>
        <span>
          Uploaded
          <span className={styles.imgName} onClick={showPreview}> {myFile.file.name}</span>
        </span>
        <FaTrash className={styles.delete} onClick={delUpload}/>
      </div>

      {show && <Preview url={myFile.url} setShow={setShow}/>}
    </>
  )
}



interface previewProps {
  url: string,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Preview = ({ url, setShow }: previewProps) => {

  const imgRef = useRef<HTMLImageElement>(null!);

  // close img by clicking outside
  const onClick = () => setShow(false);

  return (
    <div className={styles.previewContainer}>
      <FaTimes className={styles.close} onClick={onClick}/>
      <img src={url} alt="No Image Found" className={styles.previewImg} ref={imgRef}></img>
    </div>
  )
}

export default Image