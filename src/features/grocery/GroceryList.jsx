import React, { useState } from 'react';
import Button from '../../components/Button';

const mockStoreResults = [
  { id: 'aldi', name: 'aldi', rank: 1, total: 9.46, itemsCount: 10, isBest: true },
  { id: 'walmart', name: 'Walmart', rank: 2, total: 9.74, itemsCount: 10, isBest: false },
];

export default function GroceryList({ cartItems }) {
  const [expandedStore, setExpandedStore] = useState('aldi');

  // Requirement: Empty State 
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="empty-cart-state">
         <h2>Your List is Empty</h2>
         <Button onClick={/* back to Deals */}>Browse Deals</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#F8F7F2', paddingBottom: '100px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '900' }}>Grocery List</h1>
      <p style={{ color: '#666', fontWeight: 'bold' }}>Find the cheapest single-store price...</p>

      {/* map */}
      <div style={{ height: '250px', backgroundImage: 'url(MAP_IMAGE_URL)', borderRadius: '20px', border: '2px solid #111', position: 'relative', margin: '20px 0' }}>
         {/* price Tag */}
      </div>

      <h2 style={{ fontSize: '22px', borderLeft: '4px solid #1A472A', paddingLeft: '10px' }}>Best Single-Store Carts</h2>

      {/* Accordions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
        {mockStoreResults.map((store) => {
          const isExpanded = expandedStore === store.id;
          
          return (
            <div 
              key={store.id} 
              onClick={() => setExpandedStore(store.id)}
              style={{
                backgroundColor: isExpanded ? '#1A472A' : '#FFF',
                color: isExpanded ? '#FFF' : '#111',
                border: '3px solid #111',
                borderRadius: '20px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ backgroundColor: '#E8E5DC', color: '#111', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '12px' }}>{store.rank}</span>
                  <h3 style={{ margin: 0 }}>{store.name}</h3>
                  {store.isBest && <span style={{ backgroundColor: '#FFD700', color: '#111', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: '900' }}>BEST DEAL</span>}
                </div>
                <h3 style={{ margin: 0 }}>${store.total} {isExpanded ? '▲' : '▼'}</h3>
              </div>

              {isExpanded && (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '15px', 
                  marginTop: '20px' 
                }}>
                  {cartItems.map(item => (
                    <div key={item.id} style={{ backgroundColor: '#FFF', color: '#111', borderRadius: '16px', padding: '10px', border: '2px solid #111' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', borderRadius: '8px' }} />
                      <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '5px 0' }}>{item.name}</p>
                      <p style={{ color: '#1A472A', fontWeight: '900', margin: 0 }}>${item.dealPrice}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Save Cart button */}
              {isExpanded && (
                 <Button style={{ width: '100%', marginTop: '20px', backgroundColor: '#FFF', color: '#1A472A' }}>
                    🛒 Save Cart
                 </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}