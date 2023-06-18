import styles from '../styles/Home.module.css';
import DocCard from '../components/DocCard';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDocsAction } from '../redux/documents/docs.actions';
import Loading from '../components/Loading';
import Logo from '../components/Logo';

function Home() {

     const dispatch = useDispatch();
     const { loading, error, data } = useSelector(store => store.docsManager);

     useEffect(() => {
          dispatch(getAllDocsAction())
     }, [])

     return (
          <div className={styles.container}>
               <div className={styles.banner}>
                    <div>
                         <Logo />
                         <h1>
                              Unlock your creativity and express your thoughts with ease. This document app is your canvas, where words come alive and ideas take flight
                         </h1>
                    </div>
                    <div>
                         <img src="/image-4.png" alt="banner-image" />
                    </div>
               </div>
               <div className={styles['articles-container']}>
                    {
                         loading ? <Loading /> :
                              error ? <h1>Error...</h1> :
                                   <div className={styles.articles}>
                                        {
                                             data.map(el => <DocCard key={el._id} data={el} />)
                                        }
                                   </div>
                    }
               </div>
          </div>
     )
}

export default Home