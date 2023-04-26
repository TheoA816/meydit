import { useState } from 'react';
import styles from './ImageUpload.module.css'
import { FaTimes } from 'react-icons/fa';

const ImageUpload = () => {
  const [file, setFile] = useState<File>(null!);
  const [url, setUrl] = useState<string | null>(null);


  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFile(file!);
    setUrl(URL.createObjectURL(file!));
  };

  const clearFile = () => {
    setUrl(null);
  }

  return (
    <>

    {url ? 
      <div>
        <FaTimes className={styles.close} onClick={clearFile}/>
        <img className={styles.img} src={url} alt="No Image Found" />
      </div>
    :
      <div className={styles.imageUpload}>
        <span>Choose an Image:</span>
        <input id="file-input" type="file" accept="image/*" onChange={handleFileSelect} />
      </div>
    }
    </>
  );
}

export default ImageUpload