// src/features/pantry/PantryScreen.jsx
import React from 'react';

// 模擬使用者的家庭庫存與智慧判斷資料
const pantryData = [
  { id: 't1', name: 'Charmin Ultra Soft Toilet Paper', img: '🧻', stockStatus: 'Low', daysInPantry: 21, price: 12.99, deal: 'Target 60% OFF' },
  { id: 'o1', name: 'Quaker Old Fashioned Oats', img: '🥣', stockStatus: 'Low', daysInPantry: 18, price: 3.49, deal: 'Walmart Rollback' },
  { id: 'e1', name: 'Large Brown Eggs', img: '🥚', stockStatus: 'Good', daysInPantry: 3, price: 2.99, deal: null },
  { id: 'm1', name: 'Whole Milk (Gallon)', img: '🥛', stockStatus: 'Good', daysInPantry: 1, price: 3.29, deal: null }
];

export default function PantryScreen({ cart, onUpdateQuantity }) {
  const lowStockItems = pantryData.filter(item => item.stockStatus === 'Low');
  const goodStockItems = pantryData.filter(item => item.stockStatus === 'Good');

  return (
    <div style={{ padding: '20px', backgroundColor: '#F8F7F2', minHeight: '100vh' }}>
      
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: '25px' }}>
        <div style={{ backgroundColor: '#1A472A', width: '50px', height: '50px', borderRadius: '50%', border: '3px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: '#FFF', flexShrink: 0 }}>📦</div>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#111', margin: 0, letterSpacing: '-1px' }}>Pantry</h1>
          <p style={{ color: '#555', fontWeight: 'bold', margin: '4px 0 0 0', fontSize: '13px' }}>Manage inventory & smart restock</p>
        </div>
      </div>

      {/* 🚨 智慧囤貨提醒 (Smart Deals Integration) */}
      <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>⚡️</span> Smart Restock Deals
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
        {lowStockItems.map((item) => {
           const inCart = cart[item.id]?.quantity > 0;
           return (
            <div key={item.id} style={{ backgroundColor: '#FFF', border: '3px solid #111', borderRadius: '20px', padding: '16px', boxShadow: '3px 3px 0px #111', display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ fontSize: '35px', backgroundColor: '#F0EFEA', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #111', flexShrink: 0 }}>
                {item.img}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '900', color: '#111' }}>{item.name}</h4>
                <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#FF5252', fontWeight: 'bold' }}>Running low ({item.daysInPantry} days ago)</p>
                <span style={{ backgroundColor: '#1A472A', color: '#FFF', fontSize: '11px', fontWeight: '900', padding: '3px 8px', borderRadius: '10px' }}>{item.deal}</span>
              </div>
              
              <button 
                onClick={() => onUpdateQuantity(item, 1)}
                disabled={inCart}
                style={{ backgroundColor: inCart ? '#E8E5DC' : '#111', color: inCart ? '#999' : '#FFF', border: '2px solid #111', borderRadius: '14px', width: '40px', height: '40px', fontWeight: '900', fontSize: '20px', cursor: inCart ? 'not-allowed' : 'pointer', flexShrink: 0 }}
              >
                {inCart ? '✓' : '+'}
              </button>
            </div>
           );
        })}
      </div>

      {/* 📦 一般庫存追蹤 (Inventory Tracking) */}
      <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111', marginBottom: '15px' }}>Current Inventory</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {goodStockItems.map((item) => (
          <div key={item.id} style={{ backgroundColor: '#E8E5DC', border: '2px dashed #999', borderRadius: '16px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>{item.img}</span>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: '#333' }}>{item.name}</h4>
                <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#666', fontWeight: 'bold' }}>Stocked {item.daysInPantry} days ago</p>
              </div>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '900', color: '#1A472A', backgroundColor: '#D1E8D5', padding: '4px 8px', borderRadius: '8px' }}>Good</span>
          </div>
        ))}
      </div>

    </div>
  );
}