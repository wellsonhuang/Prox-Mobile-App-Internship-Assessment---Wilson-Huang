// src/components/SkeletonCard.jsx
import React from 'react';

export default function SkeletonCard() {
  return (
    <div style={{ 
      backgroundColor: '#FFF', border: '3px solid #111', borderRadius: '20px', 
      padding: '15px', boxShadow: '3px 3px 0px #111', display: 'flex', 
      flexDirection: 'column', justifyContent: 'space-between',
      animation: 'pulse 1.5s infinite ease-in-out'
    }}>
      <div>
        <div style={{ height: '110px', backgroundColor: '#E8E5DC', borderRadius: '14px', marginBottom: '10px' }}></div>
        <div style={{ height: '16px', backgroundColor: '#E8E5DC', borderRadius: '8px', marginBottom: '6px', width: '80%' }}></div>
        <div style={{ height: '12px', backgroundColor: '#E8E5DC', borderRadius: '6px', width: '50%' }}></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
        <div style={{ height: '20px', backgroundColor: '#E8E5DC', borderRadius: '10px', width: '40%' }}></div>
        <div style={{ width: '36px', height: '36px', backgroundColor: '#E8E5DC', borderRadius: '50%' }}></div>
      </div>
      
      {/* 可以在 index.css 中加入這個動畫，或者直接寫 inline style 也可以運作 */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}