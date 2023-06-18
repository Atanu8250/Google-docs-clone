/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
     // get the token from the session storage, if it's available then allow 
     // the user to go for the desired page otherwise redirect him to the login page
     const token = sessionStorage.getItem("TOKEN");

     if (token) return children;
     else return <Navigate to='/auth' />;
}

export default PrivateRoute;