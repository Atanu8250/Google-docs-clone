import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LazyLoadHandler from '../components/LazyLoadHandler';
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('../pages/Home'));
const Auth = lazy(() => import('../pages/Auth'));
const NotFound = lazy(() => import('../pages/NotFound'));
const SingleDoc = lazy(() => import('../pages/SingleDoc'));

function AllRoutes() {
     return (
          <LazyLoadHandler>
               <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/auth' element={<Auth />} />
                    <Route exact path='/docs/:id' element={<PrivateRoute><SingleDoc /></PrivateRoute>} />
                    <Route path='*' element={<NotFound />} />
               </Routes>
          </LazyLoadHandler>
     )
}

export default AllRoutes