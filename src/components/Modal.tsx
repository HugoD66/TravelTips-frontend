import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/modal.css';

import { ReactNode } from 'react';

const Modal = ({ children, onClose }: { children: ReactNode, onClose: () => void }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>×</button>
            {children}
        </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default Modal;