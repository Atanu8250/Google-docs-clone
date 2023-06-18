/* eslint-disable react/prop-types */
import styles from '../styles/DocCard.module.css';
import moment from 'moment';
import { Link } from 'react-router-dom';

const getDateAndTime = (date) => {
     return moment(date).format("MMMM Do [at] h:mmA")
}

const getRandomBG = () => {
     return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.4`
}

function DocCard({ data: { author: { avatarURL, username }, createdAt, title, _id: docId } }) {

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
                    </section>
               </article>
          </Link>
     )
}

export default DocCard

/*
author: {
  avatarURL: "https://cdn-icons-png.flaticon.com/512/666/666201.png"
  createdAt: "2023-06-16T18:21:03.647Z"
  email: "souvik@gmail.com"
  updatedAt: "2023-06-16T18:21:03.647Z"
  username: "Souvik"
  _id: "648ca80f472d4d805831d923"
}
createdAt: "2023-06-16T18:41:11.796Z"
doc: ""
isPublic: true
title: "check 1"
updatedAt: "2023-06-16T18:41:11.796Z"
__v: 0
_id: "648cacc7d44b0a762060a938"
*/ 