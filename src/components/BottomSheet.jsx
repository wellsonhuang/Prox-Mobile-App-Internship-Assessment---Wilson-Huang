import React, { useEffect } from 'react';
import './BottomSheet.css';

const BottomSheet = ({ isOpen, onClose, title, children }) => {
  // When the bottom sheet is open, prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Semi-transparent black background overlay */}
      <div className="bottom-sheet-overlay" onClick={onClose}></div>
      
      {/* Bottom-up sliding window container */}
      <div className="bottom-sheet-container">
        <div className="bottom-sheet-header">
          <h3 className="bottom-sheet-title">{title}</h3>
          <button className="bottom-sheet-close" onClick={onClose}>✕</button>
        </div>
        <div className="bottom-sheet-content">
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;