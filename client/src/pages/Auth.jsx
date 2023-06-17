import { useCallback, useState } from 'react';
import styles from '../styles/Auth.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { signinAction, signupAction } from '../redux/auth/auth.actions';


function Auth() {
     const [showPassword, setShowPassword] = useState(false); // for password hiding and showing
     const [signin, setSignin] = useState(true);
     const navigate = useNavigate();

     const dispatch = useDispatch();
     const { loading } = useSelector(store => store.authManager);

     const handleSubmit = useCallback((e) => {
          e.preventDefault();
          const cred = {
               email: e.target.email.value,
               password: e.target.password.value
          }

          if (!signin) cred.username = e.target.username.value;

          if (signin) {
               dispatch(signinAction(cred, navigate));
          } else {
               dispatch(signupAction(cred, setSignin));
          }
     }, [dispatch, navigate, signin])



     return (
          <div className={styles['auth-box']}>
               <div className={styles.box}>
                    <h2>{signin ? "Sign in" : "Sign up"}</h2>
                    <form onSubmit={handleSubmit}>
                         {/* show for signup only */}
                         {
                              !signin && <div className={styles['input-box']}>
                                   <input id="username" type="text" required />
                                   <label>Username</label>
                              </div>
                         }

                         <div className={styles['input-box']}>
                              <input id="email" type="email" required />
                              <label>Email</label>
                         </div>
                         <div className={styles['input-box']}>
                              <input id="password" type={showPassword ? "text" : "password"} required />
                              <span
                                   role='button'
                                   onClick={() => {
                                        setShowPassword(!showPassword)
                                   }}>
                                   {
                                        showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />
                                   }
                              </span>
                              <label>Password</label>
                         </div>
                         <div>
                              <input type="submit" value={loading ? "Wait..." : signin ? "Sign in" : "Sign up"} disabled={loading} />
                              <span onClick={() => setSignin(!signin)}>{signin ? "Create an acount!" : "Already have an account?"}</span>
                         </div>
                    </form>
               </div>
          </div>
     )
}

export default Auth