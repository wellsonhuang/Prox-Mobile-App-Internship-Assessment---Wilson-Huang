// src/features/pantry/PantryScreen.jsx
import React from 'react';
import pantryData from '../../data/pantry.json';

export default function PantryScreen({ cart, onUpdateQuantity }) {
  // Filter items by their stock status
  const lowStockItems = pantryData.filter(item => item.stockStatus === 'Low');
  
  // Combine Good and Medium items for the Current Inventory section
  const inventoryItems = pantryData.filter(item => item.stockStatus === 'Good' || item.stockStatus === 'Medium');

  // Helper function to return different colors based on stock status
  const getStatusStyle = (status) => {
    if (status === 'Good') {
      return { color: '#1A472A', backgroundColor: '#D1E8D5' };
    } else if (status === 'Medium') {
      return { color: '#7A6413', backgroundColor: '#FDF6E3' };
    }
    return { color: '#333', backgroundColor: '#E8E5DC' };
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#F8F7F2', minHeight: '100vh' }}>
      
      {/* Header Section */}
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#111', margin: 0, letterSpacing: '-1px' }}>Pantry</h1>
        <p style={{ color: '#555', fontWeight: 'bold', margin: '4px 0 0 0', fontSize: '13px' }}>Manage inventory & smart restock</p>
      </div>

      {/* Smart Restock Deals Section */}
      <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>⚡️</span> Smart Restock Deals
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
        {lowStockItems.map((item) => {
           const inCart = cart[item.id]?.quantity > 0;
           return (
            <div key={item.id} style={{ backgroundColor: '#FFF', border: '3px solid #111', borderRadius: '20px', padding: '16px', boxShadow: '3px 3px 0px #111', display: 'flex', gap: '15px', alignItems: 'center' }}>
              
              {/* Product Image */}
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', border: '2px solid #111', overflow: 'hidden', flexShrink: 0, backgroundColor: '#F0EFEA' }}>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Product Details */}
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '900', color: '#111' }}>{item.name}</h4>
                <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#FF5252', fontWeight: 'bold' }}>Running low ({item.daysInPantry} days ago)</p>
                <span style={{ backgroundColor: '#1A472A', color: '#FFF', fontSize: '11px', fontWeight: '900', padding: '3px 8px', borderRadius: '10px' }}>{item.deal}</span>
              </div>
              
              {/* Add to Cart Button */}
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

      {/* Current Inventory Section */}
      <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111', marginBottom: '15px' }}>Current Inventory</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {inventoryItems.map((item) => {
          const statusStyle = getStatusStyle(item.stockStatus);
          
          return (
            <div key={item.id} style={{ backgroundColor: '#E8E5DC', border: '2px dashed #999', borderRadius: '16px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                
                {/* Small Product Image */}
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ccc', flexShrink: 0 }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Name and Days */}
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: '#333' }}>{item.name}</h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#666', fontWeight: 'bold' }}>Stocked {item.daysInPantry} days ago</p>
                </div>
              </div>
              
              {/* Status Badge (Good / Medium) */}
              <span style={{ fontSize: '12px', fontWeight: '900', padding: '4px 8px', borderRadius: '8px', color: statusStyle.color, backgroundColor: statusStyle.backgroundColor }}>
                {item.stockStatus}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}