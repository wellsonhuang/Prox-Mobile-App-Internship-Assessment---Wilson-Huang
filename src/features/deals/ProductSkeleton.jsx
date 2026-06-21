import React from 'react';
import './ProductList.css'; // 引入動畫 CSS

const ProductSkeleton = () => {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            minWidth: '150px', 
            maxWidth: '150px',
            boxSizing: 'border-box', 
            backgroundColor: 'white', 
            borderRadius: '20px', 
            padding: '12px', 
            border: '2px solid #111',
            boxShadow: '3px 3px 0px #111',
        }}>
            {/* 圖片佔位符 */}
            <div className="skeleton-pulse" style={{ 
                width: '100%', 
                paddingTop: '100%', 
                borderRadius: '12px',
                backgroundColor: '#E8E5DC',
                marginBottom: '15px'
            }}></div>
            
            {/* 文字佔位符 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <div className="skeleton-pulse" style={{ width: '90%', height: '14px', borderRadius: '4px', backgroundColor: '#E8E5DC' }}></div>
                <div className="skeleton-pulse" style={{ width: '60%', height: '14px', borderRadius: '4px', backgroundColor: '#E8E5DC' }}></div>
                <div style={{ marginTop: 'auto' }}>
                    <div className="skeleton-pulse" style={{ width: '50%', height: '20px', borderRadius: '4px', backgroundColor: '#E8E5DC' }}></div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;