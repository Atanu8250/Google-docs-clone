import styles from '../styles/Loading.module.css';

function Loading() {
     return (
          <div className={styles.flexbox}>
               <div>
                    <div className={styles['cm-spinner']}></div>
               </div>
          </div>
     )
}

export default Loading