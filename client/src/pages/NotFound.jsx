import { Link } from 'react-router-dom';
import styles from '../styles/NotFound.module.css';

function NotFound() {
     return (
          <div className={styles.section}>
               <h1 className={styles.error}>404</h1>
               <div className={styles.page}>Ooops!!! The page you are looking for is not found</div>
               <Link className={styles['back-home']} to="/">Back to home</Link>
          </div>
     )
}

export default NotFound