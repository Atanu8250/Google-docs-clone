import * as authTypes from './auth.types';

/** 
 * * Using 'fetch' instead of 'axios' because when I'm sending error from the backend at
 * * that time axios is not able to catch the response messages with error status codes
 * * like 400 and above codes, but fetch is able get the errors with message and the 
 * * status properly,
 * * But for accessing the status we will get it from the first 'response' and for 
 * * the data we need to do 'response.json()'
 * */



/**
 * - SIGNIN FOR USERS
 * @param {Object} cred - credentials for signin `cred: {username, password}`
 * @param {Function} navigate - navigate for navigating the user to the `event` page
 * */
export const signinAction = (cred, navigate) => async (dispatch) => {
     if (!cred.email || !cred.password) return;

     // start loading
     dispatch({ type: authTypes.AUTH_LOADING });

     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/auth/signin`, {
               method: 'POST',
               body: JSON.stringify(cred),
               headers: {
                    'Content-Type': 'application/json'
               }
          })

          const data = await res.json();

          if (res.ok) {
               dispatch({ type: authTypes.AUTH_LOGIN_SUCCESS, payload: data.user });
               navigate('/');
          } else {
               dispatch({ type: authTypes.AUTH_ERROR });
          }

          alert(data.message)

     } catch (error) {
          console.log('error:', error);
          dispatch({ type: authTypes.AUTH_ERROR });
          alert(error.message);
     }
}


/**
 * - SIGNUP FOR USERS
 * @param {Object} cred - credentials for signin `cred: {username, password}`
 * @param {Function} gotoSignin - navigate for send the user to the `sign-in` component
 * */
export const signupAction = (cred, gotoSignin) => async (dispatch) => {
     if (!cred.username || !cred.email || !cred.password) return;

     // ? PASSWORD VERIFIER
     if (cred.password.length <= 5) {
          alert('Password must contain more than 5 char!')
          return;
     }

     // start loading
     dispatch({ type: authTypes.AUTH_LOADING });

     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/auth/signup`, {
               method: "POST",
               body: JSON.stringify(cred),
               headers: {
                    'Content-Type': 'application/json'
               }
          })

          const data = await res.json();

          if (res.ok) gotoSignin(true);
          dispatch({ type: res.ok ? authTypes.AUTH_SUCCESS : authTypes.AUTH_ERROR });

          alert(data.message);
     } catch (error) {
          console.log('error:', error);
          dispatch({ type: authTypes.AUTH_ERROR })
          alert(error.message);
     }
}


/**
 * for log-out only
 * */
export const logoutAction = () => (dispatch) => {
     dispatch({ type: authTypes.AUTH_LOGOUT });
     window.location.replace('/')
}