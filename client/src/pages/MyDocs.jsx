import { useEffect } from "react";
import DocCard from "../components/DocCard";
import Loading from "../components/Loading";
import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from "react-redux";
import { getAllPrivateDocsAction } from "../redux/documents/docs.actions";

function MyDocs() {
     const dispatch = useDispatch();
     const { loading, error, publicDocs } = useSelector(store => store.docsManager);

     useEffect(() => {
          dispatch(getAllPrivateDocsAction())
     }, [])

     return (
          <main>
               <div className={styles['articles-container']}>
                    {
                         loading ? <Loading /> :
                              error ? <h1>Error...</h1> :
                                   <div className={styles.articles}>
                                        {
                                             publicDocs.map(el => <DocCard key={el._id} data={el} />)
                                        }
                                   </div>
                    }
               </div>
          </main>
     )
}

export default MyDocs