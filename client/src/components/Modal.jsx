/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React from 'react';
import style from '../styles/Modal.module.css';
import { RxCrossCircled } from "react-icons/rx"

function Modal({ isOpen, onClose, title, children }) {

     if (!isOpen) return null;
     return (
          <div className={style.modal} onClick={onClose}>
               <div className={style["modal-content"]} onClick={(e) => e.stopPropagation()}>
                    <div className={style["modal-header"]}>
                         <h2>{title}</h2>
                         <RxCrossCircled style={{ cursor: 'pointer' }} onClick={onClose} />
                    </div>
                    <div className={style["modal-body"]}>
                         {children}
                    </div>
               </div>
          </div>
     );
}

export default React.memo(Modal);