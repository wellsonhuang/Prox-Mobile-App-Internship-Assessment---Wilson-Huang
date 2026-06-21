import React from 'react';
import './Tag.css';

const Tag = ({ 
  children, 
  variant = 'primary', // 'primary' | 'ghost' 
  icon,
  className = '' 
}) => {
  return (
    <span className={`custom-tag custom-tag-${variant} ${className}`}>
      {icon && <span className="custom-tag-icon">{icon}</span>}
      {children}
    </span>
  );
};

export default Tag;