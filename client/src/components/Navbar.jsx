import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../redux/auth/auth.actions';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Navbar() {
     const { user } = useSelector(store => store.authManager);
     const dispatch = useDispatch();
     const [showUserInfo, setShowUserInfo] = useState(false);
     const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("USER")) || "");

     const handleLogout = useCallback(() => {
          dispatch(logoutAction());
     }, [dispatch])

     useEffect(() => {
          if (user.username) setUserInfo(user);
     }, [user])

     return (
          <div className={styles.navbar}>
               <Link to='/'>
                    <Logo />
               </Link>
               <ul>
                    <li>
                         <button className={styles['create-doc']}>Create Doc +</button>
                    </li>
                    <li>
                         {
                              userInfo ?
                                   <section className={styles['profile-main']}>
                                        <div className={styles.profile} onClick={() => { setShowUserInfo(!showUserInfo) }}>
                                             <img src={userInfo.avatarURL} />
                                        </div>

                                        {
                                             showUserInfo && <div className={styles['profile-info']}>
                                                  <figure>
                                                       <div className={styles['profile-img']}>
                                                            <img src={userInfo.avatarURL} />
                                                       </div>
                                                       <figcaption className={styles['user-name']}>{userInfo.username}</figcaption>
                                                  </figure>

                                                  <button>My Documents</button>

                                                  <button onClick={handleLogout}>Log out</button>
                                             </div>
                                        }
                                   </section> :
                                   <Link to='/auth'><button>Login</button></Link>
                         }
                    </li>
               </ul>
          </div>
     )
}

export default Navbar