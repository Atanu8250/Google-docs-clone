/* eslint-disable react/prop-types */
import moment from 'moment';
import { Link } from 'react-router-dom';
import styles from '../styles/DocCard.module.css';
import { MdPublic } from 'react-icons/md';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';

// Get date and time in proper format
const getDateAndTime = (date) => {
     return moment(date).format("MMMM Do [at] h:mmA")
}

// Get random background colors for profiles
const getRandomBG = () => {
     return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.4`
}

function DocCard({ data: { author: { avatarURL, username }, createdAt, title, isPublic, _id: docId } }) {

     return (
          <Link to={`/docs/${docId}`}>
               <article className={styles['doc-card']}>
                    <section className={styles['doc-profile']}>
                         <div
                              className={styles['doc-profile-img']}
                              style={{ backgroundColor: getRandomBG() }}
                         >
                              <img src={avatarURL} alt="doc-image" />
                         </div>
                         <div>
                              <p className={styles['doc-title']}>{title}</p>
                              <p className={styles['doc-user-info']}>
                                   {`${username} | ${getDateAndTime(createdAt)}`}
                              </p>
                         </div>
                    </section>
                    <section className={styles.icon}>
                         <img src='/doc.svg' alt='doc-icon' />
                         <div className={styles['doc-view-status']}>
                              {isPublic ? <MdPublic /> : <RiGitRepositoryPrivateFill />}
                         </div>
                    </section>
               </article>
          </Link>
     )
}

export default DocCard;