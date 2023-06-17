import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LazyLoadHandler from '../components/LazyLoadHandler';

const Home = lazy(() => import('../pages/Home'));
const Auth = lazy(() => import('../pages/Auth'));

function AllRoutes() {
     return (
          <LazyLoadHandler>
               <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/auth' element={<Auth />} />
               </Routes>
          </LazyLoadHandler>
     )
}

export default AllRoutes