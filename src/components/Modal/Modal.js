import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className='overlay' />
      <div className={'modal'}>
        <button onClick={onClose}>X</button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  );
}
