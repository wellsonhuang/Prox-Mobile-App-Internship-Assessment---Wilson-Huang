import React, { useEffect } from 'react';
import './BottomSheet.css';

const BottomSheet = ({ isOpen, onClose, title, children }) => {
  // 當抽屜打開時，防止背景畫面滾動
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
      {/* 半透明黑色背景遮罩 */}
      <div className="bottom-sheet-overlay" onClick={onClose}></div>
      
      {/* 由下往上彈出的視窗容器 */}
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