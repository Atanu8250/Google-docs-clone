import styles from '../styles/Logo.module.css';

function Logo() {
     return (
          <div className={styles.logo}>
               <div><img src="/logo.png" alt='logo' /></div>
               <h2>Doc depot</h2>
          </div>
     )
}

export default Logo