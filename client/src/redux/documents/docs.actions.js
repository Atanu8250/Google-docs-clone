import { AUTH_LOGOUT } from '../auth/auth.types';
import * as docTypes from './docs.types';

/** 
 * * Using 'fetch' instead of 'axios' because when I'm sending error from the backend at
 * * that time axios is not able to catch the response messages with error status codes
 * * like 400 and above codes, but fetch is able get the errors with message and the 
 * * status properly,
 * * But for accessing the status we will get it from the first 'response' and for 
 * * the data we need to do 'response.json()'
 * */


/**
 * - GET ALL DOCUMENTS
 * @param {String} queryString - send the query for searching and filtering
 * */
export const getAllDocsAction = (queryString = "") => async (dispatch) => {
     // start loading
     dispatch({ type: docTypes.DOC_LOADING })

     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/docs?${queryString}`, {
               headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem("TOKEN")
               }
          })

          const data = await res.json();

          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT });
               // Getting undefined in the alert for `window.location.replace` function that's why giving "" using or operator
               alert(`Session Expired! \nPlease Login again.. ${window.location.replace('/auth') || ""}`);
               return;
          }

          // if request success then store the data otherwise set error
          if (res.ok) dispatch({ type: docTypes.DOC_GET_SUCCESS, payload: data.data })
          else dispatch({ type: docTypes.CARS_ERROR });

     } catch (error) {
          console.log('error:', error)
          alert(error.message)
          dispatch({ type: docTypes.DOC_ERROR });
     }
}


/**
 * - CREATE NEW DOCUMENT
 * @param {Object} DOCUMENT - doc object for the creation
 * */
export const createDocAction = (doc) => async (dispatch) => {
     if (Object.keys(doc).length === 0) return;

     // start loading
     dispatch({ type: docTypes.DOC_LOADING })

     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/docs`, {
               method: 'POST',
               body: JSON.stringify(doc),
               headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem("TOKEN")
               }
          })

          const data = await res.json();

          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT });
               // Getting undefined in the alert for `window.location.replace` function that's why giving "" using or operator
               alert(`Session Expired! \nPlease Login again.. ${window.location.replace('/auth') || ""}`);
               return;
          }

          // if request success then store the data otherwise set error
          if (res.ok) dispatch({ type: docTypes.DOC_SUCCESS });
          else dispatch({ type: docTypes.DOC_ERROR });

          alert(data.message)

     } catch (error) {
          console.log('error:', error)
          alert(error.message)
          dispatch({ type: docTypes.DOC_ERROR });
     }
}





/**
 * - UDPATE DOCUMENT DETAILS
 * @param {String} docId - doc id for which you want the changes should apply
 * @param {Object} update - Object with update fields
 * */
export const updateDocAction = ({ docId, update }) => async (dispatch) => {
     if (!docId || Object.keys(update).length === 0) return;
     console.log({ docId, update })
     // start loading
     dispatch({ type: docTypes.DOC_LOADING })

     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/docs/${docId}`, {
               method: 'PATCH',
               body: JSON.stringify(update),
               headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem("TOKEN")
               }
          })

          const data = await res.json();

          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT });
               // Getting undefined in the alert for `window.location.replace` function that's why giving "" using or operator
               alert(`Session Expired! \nPlease Login again.. ${window.location.replace('/auth') || ""}`);
               return;
          }

          // if request success then store the data otherwise set error
          if (res.ok) dispatch({ type: docTypes.DOC_SUCCESS })
          else dispatch({ type: docTypes.DOC_ERROR });

          alert(data.message)

     } catch (error) {
          console.log('error:', error)
          alert(error.message)
          dispatch({ type: docTypes.DOC_ERROR });
     }
}


/**
 * - DELETE DOCUMENT
 * @param {String} docId - doc id for which you want to delete
 * */
export const deleteDocAction = (docId) => async (dispatch) => {
     if (!docId) return;

     // start loading
     dispatch({ type: docTypes.DOC_LOADING })

     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/docs/${docId}`, {
               method: 'DELETE',
               headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem("TOKEN")
               }
          })

          const data = await res.json()

          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT });
               // Getting undefined in the alert for `window.location.replace` function that's why giving "" using or operator
               alert(`Session Expired! \nPlease Login again.. ${window.location.replace('/auth') || ""}`);
               return;
          }

          // if request success then store the data otherwise set error
          if (res.ok) dispatch({type: docTypes.DOC_SUCCESS})
          else dispatch({ type: docTypes.DOC_ERROR });

          alert(data.message)

     } catch (error) {
          console.log('error:', error)
          alert(error.message)
          dispatch({ type: docTypes.DOC_ERROR });
     }
}