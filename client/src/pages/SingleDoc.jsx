import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useCallback, useState } from 'react';
import '../styles/SingleDoc.css';
import { useParams, useNavigate } from 'react-router-dom';
import useSocketConnection from '../customHooks/useSocketConnection';

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
     const navigate = useNavigate();
     const [quill, setQuill] = useState();
     const { id: documentId } = useParams();
     const [doc, setDoc] = useState({});

     // Connect to the socket server
     const socket = useSocketConnection(import.meta.env.VITE_APP_SERVER_URL);


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
               console.log('data:', data)
               if (data.message === 'success') {
                    setDoc(data.doc);
                    quill.setContents(data.doc.doc)

                    const userInfo = JSON.parse(sessionStorage.getItem("USER"));
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
          <div className='container' ref={wrapperRef}></div>
     )
}

export default SingleDoc