import React from 'react';

const Modal = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-headline text-2xl text-primary">{title}</h3>
            <button onClick={onClose} className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="text-on-surface-variant font-body leading-relaxed mb-8">
            {children}
          </div>
          <div className="flex gap-4">
            {actions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
