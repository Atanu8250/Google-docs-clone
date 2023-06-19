import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../redux/auth/auth.actions';
import { BsCameraFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from './Logo';
import Modal from './Modal';
import { createDocAction } from '../redux/documents/docs.actions';


const updateProfile = async (imgLink) => {
     if (!imgLink) return;

     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/profile`, {
               method: 'PATCH',
               body: JSON.stringify({ avatarURL: imgLink }),
               headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem("TOKEN")
               }
          })

          const data = await res.json();

          // * IF TOKEN EXPIRED
          if (res.status === 401) {

               // remove user data from the session
               sessionStorage.clear();

               // Getting undefined in the alert for `window.location.replace` function that's why giving "" using or operator
               alert(`Session Expired! \nPlease Login again.. ${window.location.replace('/auth') || ""}`);
               return;
          }

          if (res.ok) {
               // Update user data in session-storage
               const userInfo = JSON.parse(sessionStorage.getItem("USER"));
               const newUserInfo = { ...userInfo, avatarURL: imgLink };
               sessionStorage.setItem("USER", JSON.stringify(newUserInfo));
          }

          alert(data.message)

     } catch (error) {
          console.log('error:', error)
          alert(error.message)
     }
}


function Navbar() {
     const { user } = useSelector(store => store.authManager);
     const { loading: createDocLoading } = useSelector(store => store.docsManager);
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const [loading, setLoading] = useState(false);
     const [showUserInfo, setShowUserInfo] = useState(false);
     const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("USER")) || "");
     const [avatarUrl, setAvatarUrl] = useState('');
     const [isOpenModal, setIsOpenModal] = useState(false);


     // to open the modal
     const openModal = useCallback(() => {
          setIsOpenModal(true);
     }, []);

     // to close the modal
     const closeModal = useCallback(() => {
          setIsOpenModal(false);
     }, []);

     const handleCreateDoc = useCallback((e) => {
          e.preventDefault();
          const doc = {
               title: e.target.title.value,
          }
          const isPbulicVal = e.target.isPublic.checked;
          if (isPbulicVal) doc.isPublic = isPbulicVal;

          const callback = (docId) => {
               closeModal();
               if (docId) navigate(`/docs/${docId}`);
          }

          dispatch(createDocAction({ doc, cb: callback }))
     }, []);


     // Log-out
     const handleLogout = useCallback(() => {
          dispatch(logoutAction());
     }, [dispatch])


     // IMAGE upload in cloudinary
     const imageUpload = useCallback(async (e) => {
          const imgFile = e.target.files[0];
          if (!imgFile) return;
          if (imgFile.size > 2097152) return alert("Please upload image with less-then 2MB size")

          setLoading(true);

          try {
               // !IMAGE UPLOAD IN CLOUDINARY
               const data = new FormData();
               data.append("file", imgFile)

               data.append("upload_preset", import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET)

               data.append("cloud_name", import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME);

               const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, data)

               setAvatarUrl(res.data.secure_url)

               updateProfile(res.data.secure_url)

               setLoading(false)
          } catch (error) {
               console.log('error:', error)
               setLoading(false)
          }
     }, [])


     useEffect(() => {
          if (user.username) setUserInfo(user);
     }, [user])

     return (
          <div className={styles.navbar}>
               <Link to='/'>
                    <Logo />
               </Link>
               <ul>
                    <li>
                         <button
                              onClick={openModal}
                              className={styles['create-doc']}
                         >Create Doc +</button>
                    </li>
                    <li>
                         {
                              userInfo ?
                                   <section className={styles['profile-main']}>
                                        <div className={styles.profile} onClick={() => { setShowUserInfo(!showUserInfo) }}>
                                             <img src={avatarUrl || userInfo?.avatarURL} />
                                        </div>

                                        {
                                             showUserInfo && <div className={styles['profile-info']}>
                                                  <figure>
                                                       <div className={styles['profile-img']}>
                                                            <img src={avatarUrl || userInfo?.avatarURL} />
                                                            {loading && <div className={styles['profile-loading']}>
                                                                 <p>Wait...</p>
                                                            </div>}
                                                            <div className={styles['profile-upload']}>
                                                                 <input type="file" name="profile-upload" id="profile-upload" onChange={imageUpload} />
                                                                 <label htmlFor="profile-upload">
                                                                      <BsCameraFill />
                                                                 </label>
                                                            </div>
                                                       </div>
                                                       <figcaption className={styles['user-name']}>{userInfo.username}</figcaption>
                                                  </figure>

                                                  <button onClick={() => navigate('/my-docs')}>My Documents</button>

                                                  <button onClick={handleLogout}>Log out</button>
                                             </div>
                                        }
                                   </section> :
                                   <Link to='/auth'><button>Login</button></Link>
                         }
                    </li>
               </ul>


               {/* MODAL */}
               <Modal isOpen={isOpenModal} onClose={closeModal} title='Create Document'>
                    <form className={styles['create-doc-form']} onSubmit={handleCreateDoc}>
                         <div className={styles['modal-input-box']}>
                              <input id="title" type="text" required />
                              <label htmlFor='title'>Title</label>
                         </div>
                         <div className={styles['modal-input-checkbox']}>
                              <input id="isPublic" type="checkbox" />
                              <label htmlFor='isPublic'>Make it 🌎 Public</label>
                         </div>

                         <button type="submit" disabled={createDocLoading}>Create Document</button>
                    </form>
               </Modal>
          </div>
     )
}

export default Navbar