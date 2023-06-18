import Quill from 'quill';
import '../styles/SingleDoc.css';
import 'quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { MdPublic } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { BsCheckLg } from 'react-icons/bs';
import { useEffect, useCallback, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
import useSocketConnection from '../customHooks/useSocketConnection';
import { updateDocAction } from '../redux/documents/docs.actions';

const TOOLBAR_OPTIONS = [
     [{ header: [1, 2, 3, 4, 5, 6, false] }],
     [{ font: [] }],
     [{ list: "order" }, { list: "bullet" }],
     ['bold', 'italic', 'underline', 'strike'],
     [{ color: [] }, { background: [] }],
     [{ script: 'sub' }, { script: 'super' }],
     [{ align: [] }],
     ["image", 'blockquote', 'code-block'],
     ['clean'],
]

// Debounce function to delay function execution
const debouncer = (cb, delay) => {
     let timerId;
     return (...args) => {
          if (timerId) clearTimeout(timerId);
          timerId = setTimeout(() => {
               cb(...args);
               timerId = null;
          }, delay);
          return timerId;
     }
}

function SingleDoc() {

     const dispatch = useDispatch();
     const navigate = useNavigate();
     const titleRef = useRef(null);
     const [quill, setQuill] = useState();
     const { id: documentId } = useParams();
     const [doc, setDoc] = useState({});
     const [isEditTitle, setIsEditTitle] = useState(false);
     const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("USER")) || "")

     // Connect to the socket server
     const socket = useSocketConnection(import.meta.env.VITE_APP_SERVER_URL);

     // Change view to PUBLIC / PRIVATE
     const handleViewChange = useCallback(() => {
          const updateDocState = (val) => {
               const newDoc = { ...doc, isPublic: val }
               setDoc(newDoc);
          }

          const update = { isPublic: !doc.isPublic }
          dispatch(updateDocAction({ docId: documentId, update, updateDocState }))
     }, [dispatch, doc, documentId])

     // Change Title
     const handleTitleChange = useCallback(() => {
          const newTitle = titleRef.current.value;
          if (!newTitle || (newTitle === doc.title)) {
               setIsEditTitle(false);
               return
          }

          const updateDocState = (val) => {
               const newDoc = { ...doc, title: val }
               setDoc(newDoc);
               setIsEditTitle(false);
          }

          const update = { title: newTitle }
          dispatch(updateDocAction({ docId: documentId, update, updateDocState }))
     }, [dispatch, doc, documentId])


     // Save the data in the database with debounce
     const SaveDocWithDebounce = debouncer(() => {
          socket.emit("save-document", quill.getContents())
     }, 1500)

     /*
     Creating it to store the ref because while using
     `useEffect` sometimes it invoked or called before the
     ref => references are apllied
     */
     const wrapperRef = useCallback(wrapper => {
          if (wrapper === null) return;

          wrapper.innerHTML = null;

          const editor = document.createElement('div');
          wrapper.append(editor);

          const quillInstance = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } });
          setQuill(quillInstance);
     }, [])

     // Load the content of the document
     useEffect(() => {
          if (socket == null || quill == null) return

          socket.once("load-document", data => {
               if (data.message === 'success') {
                    setDoc(data.doc);
                    quill.setContents(data.doc.doc)

                    const userInfoFSS = JSON.parse(sessionStorage.getItem("USER"));
                    setUserInfo(userInfoFSS);
                    // Enable editing if it's your document, otherwise disable
                    if (data.doc.author === userInfo._id) quill.enable()
                    else quill.disable();
               } else {
                    alert(data.message)
                    navigate('/');
               }
          })

          socket.emit("get-document", documentId)
     }, [socket, quill, documentId])


     // Receive changes in real-time
     useEffect(() => {
          if (socket == null || quill == null) return

          const handler = delta => {
               quill.updateContents(delta)
          }
          socket.on("receive-changes", handler)

          return () => {
               socket.off("receive-changes", handler)
          }
     }, [socket, quill])


     // Push changes to show it in real-time
     useEffect(() => {
          if (socket == null || quill == null) return
          let timeoutRef;

          const handler = (delta, oldDelta, source) => {
               if (source !== "user") return
               socket.emit("send-changes", delta)

               timeoutRef = SaveDocWithDebounce();
          }
          quill.on("text-change", handler)

          return () => {
               quill.off("text-change", handler);
               if (timeoutRef) clearTimeout(timeoutRef)
          }
     }, [socket, quill])


     return (
          <main>
               <div className='doc-info'>
                    {
                         isEditTitle ?
                              <div className='flex-box'>
                                   <input
                                        ref={titleRef}
                                        defaultValue={doc?.title}
                                        className='title-edit-input' />
                                   <div className='flex-box'>
                                        <BsCheckLg onClick={handleTitleChange} />
                                        <RxCross2 onClick={() => {
                                             setIsEditTitle(false)
                                        }} />
                                   </div>
                              </div> :
                              <h2
                                   onDoubleClick={() => {
                                        console.log('dobule clicked')
                                        setIsEditTitle(!isEditTitle)
                                   }}
                              >{doc?.title}</h2>
                    }
                    <button
                         disabled={userInfo._id !== doc.author}
                         onClick={handleViewChange}
                    >
                         {doc?.isPublic ? <RiGitRepositoryPrivateFill /> :
                              <MdPublic />}Set as {doc?.isPublic ? 'Private' : 'Public'}
                    </button>
               </div>
               <div className='container' ref={wrapperRef}></div>
          </main >
     )
}

export default SingleDoc