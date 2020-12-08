import React from 'react';
import './Modal.css';

export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  return (
    <>
      <div className='overlay' />
      <div className={'modal'}>
        <button onClick={onClose}>X</button>
        {children}
      </div>
    </>
  );
}
