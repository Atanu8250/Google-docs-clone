/* eslint-disable react/prop-types */
import { VscError } from 'react-icons/vsc';
import styles from '../styles/ErrorFallback.module.css';

export default function ErrorFallback({ error, resetErrorBoundary }) {
     return (
          <div className={styles['error-box']}>
               <VscError className={styles['error-icon']} />
               <h2 className={styles['error-heading']}>
                    Something went wrong!
               </h2>
               <p className={styles['error-text']} >
                    {error.message}
               </p>
               <button
                    className={styles['error-btn']}
                    onClick={resetErrorBoundary}>
                    Try Again
               </button>
          </div>
     );
}