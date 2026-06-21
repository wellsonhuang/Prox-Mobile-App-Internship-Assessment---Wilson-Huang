import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  className = '',
  disabled = false,
  ...props 
}) => {
  return (
    <button 
      className={`custom-btn custom-btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;