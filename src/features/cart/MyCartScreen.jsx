// src/features/cart/MyCartScreen.jsx
import React from 'react';
import Button from '../../components/Button';

// 模擬購物車資料 (未來從 Redux 抓取)
const mockCartItems = [
  { id: 1, name: 'Chicken Breast' },
  { id: 2, name: 'Bread' },
  { id: 3, name: 'Milk' },
  { id: 4, name: 'Eggs' },
  { id: 5, name: 'Avocado' },
];

export default function MyCartScreen({ onOptimize }) {
  return (
    <div style={{ padding: '20px', backgroundColor: '#F8F7F2', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#111', margin: 0 }}>My Cart</h1>
        <div style={{ backgroundColor: '#1A472A', color: '#FFF', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', border: '2px solid #111' }}>
          {mockCartItems.length}
        </div>
      </div>

      <p style={{ color: '#666', fontWeight: 'bold', marginBottom: '20px' }}>
        Review your list before finding the best deals.
      </p>

      {/* 購物車商品列表 (仿照 IMG_1343) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
        {mockCartItems.map((item) => (
          <div key={item.id} style={{ 
            backgroundColor: '#FFF', border: '3px solid #111', borderRadius: '16px', 
            padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: '2px 2px 0px #111'
          }}>
            <span style={{ fontSize: '18px', fontWeight: '900', color: '#111' }}>{item.name}</span>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
               <button style={{ backgroundColor: '#E8E5DC', border: '2px solid #111', borderRadius: '50%', width: '32px', height: '32px', fontWeight: 'bold', cursor: 'pointer' }}>+</button>
               <span style={{ color: '#999', cursor: 'pointer', fontWeight: 'bold' }}>✕</span>
            </div>
          </div>
        ))}
      </div>

      {/* ✨ 關鍵的行動呼籲按鈕 */}
      <Button 
        onClick={onOptimize}
        style={{ width: '100%', padding: '20px', fontSize: '20px', backgroundColor: '#1A472A', color: '#FFF', boxShadow: '4px 4px 0px #111' }}
      >
        ✨ Find Best Store
      </Button>
    </div>
  );
}