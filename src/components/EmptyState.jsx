// src/components/EmptyState.jsx
import React from 'react';

export default function EmptyState({ icon, title, description, actionText, onAction, isError = false }) {
  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', textAlign: 'center', padding: '40px 20px',
      gridColumn: '1 / -1' // 如果在 Grid 中，確保它佔滿整列
    }}>
      <div style={{ 
        fontSize: '48px', marginBottom: '15px',
        backgroundColor: isError ? '#FFD1D1' : '#E8E5DC', 
        width: '80px', height: '80px', borderRadius: '24px', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '3px solid #111', boxShadow: '4px 4px 0px #111'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#111', margin: '0 0 10px 0' }}>
        {title}
      </h3>
      <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#666', maxWidth: '250px', margin: '0 0 24px 0', lineHeight: '1.5' }}>
        {description}
      </p>
      
      {actionText && onAction && (
        <button 
          onClick={onAction}
          style={{ 
            backgroundColor: isError ? '#111' : '#1A472A', color: '#FFF', 
            border: '3px solid #111', borderRadius: '16px', padding: '12px 24px', 
            fontWeight: '900', fontSize: '16px', cursor: 'pointer', 
            boxShadow: '3px 3px 0px #111', transition: 'transform 0.1s'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'translate(2px, 2px)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0, 0)'}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}