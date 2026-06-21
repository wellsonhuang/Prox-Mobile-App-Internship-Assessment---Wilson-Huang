// src/features/cart/CartResultsScreen.jsx
import React, { useState } from 'react';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState'; 

export default function CartResultsScreen({ cartItems, totalPrice, onBrowseDeals, clearCart }) {
  const [selectedStoreId, setSelectedStoreId] = useState('aldi');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCheckoutComplete = () => {
    setShowSuccessModal(false);
    clearCart(); 
    onBrowseDeals(); 
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#F8F7F2', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <EmptyState icon="🛒" title="Your Cart is Empty" description="Add some deals to compare prices across stores." actionText="Browse Deals" onAction={onBrowseDeals} />
      </div>
    );
  }

  const dynamicStores = [
    { id: 'aldi', name: 'ALDI', rank: 1, multiplier: 0.95, isBest: true },
    { id: 'walmart', name: 'Walmart', rank: 2, multiplier: 1.05, isBest: false },
    { id: 'target', name: 'Target', rank: 3, multiplier: 1.25, isBest: false },
  ].map(store => ({ ...store, total: totalPrice * store.multiplier }));

  const selectedStore = dynamicStores.find(s => s.id === selectedStoreId) || dynamicStores[0];

  return (
    <div style={{ padding: '20px', backgroundColor: '#F8F7F2', minHeight: '100vh', paddingBottom: '120px' }}>
      
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '38px', fontWeight: '900', color: '#111', margin: 0, letterSpacing: '-1px' }}>Cart</h1>
        <p style={{ color: '#666', fontWeight: 'bold', margin: '4px 0 0 0', fontSize: '13px' }}>Review and choose the best basket</p>
      </div>

      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '15px', marginBottom: '10px' }}>
        {dynamicStores.map((store) => {
          const isSelected = selectedStoreId === store.id;
          return (
            <div 
              key={store.id} onClick={() => setSelectedStoreId(store.id)}
              style={{
                display: 'flex', flexDirection: 'column', backgroundColor: isSelected ? '#1A472A' : '#FFF', color: isSelected ? '#FFF' : '#111',
                border: '3px solid #111', borderRadius: '20px', padding: '16px', minWidth: '130px', cursor: 'pointer', flexShrink: 0,
                boxShadow: isSelected ? '0px 0px 0px #111' : '4px 4px 0px #111', transform: isSelected ? 'translate(4px, 4px)' : 'none', transition: 'all 0.1s ease-in-out'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '16px', fontWeight: '900' }}>{store.name}</span>
                {store.isBest && <span style={{ fontSize: '14px' }}>🌟</span>}
              </div>
              <span style={{ fontSize: '22px', fontWeight: '900' }}>${store.total.toFixed(2)}</span>
            </div>
          );
        })}
      </div>

      <div style={{ backgroundColor: '#FFF', border: '3px solid #111', borderRadius: '24px', padding: '20px', boxShadow: '4px 4px 0px #111' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px dashed #E8E5DC' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '900', margin: 0, color: '#111' }}>{selectedStore.name} Cart</h2>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>{cartItems.length} items included</span>
          </div>
          <span style={{ fontSize: '24px', fontWeight: '900', color: '#1A472A' }}>${selectedStore.total.toFixed(2)}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {cartItems.map((item, idx) => {
            const storeSpecificPrice = item.price * selectedStore.multiplier;

            return (
              <div key={idx} style={{ backgroundColor: '#F8F7F2', borderRadius: '16px', padding: '12px', border: '2px solid #111' }}>
                
                {/* 🌟 4. 修改：將 {item.img} 換成真正的圖片標籤 */}
                <div style={{ height: '75px', backgroundColor: '#FFF', borderRadius: '10px', marginBottom: '8px', border: '2px solid #111', overflow: 'hidden' }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <p style={{ fontWeight: '900', fontSize: '13px', margin: '0 0 3px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name.split(',')[0]}</p>
                <p style={{ color: '#777', fontSize: '11px', margin: '0 0 8px 0' }}>Qty: {item.quantity}</p>
                <p style={{ color: '#1A472A', fontWeight: '900', margin: 0, fontSize: '15px' }}>${storeSpecificPrice.toFixed(2)}</p>
              </div>
            );
          })}
        </div>

        <Button onClick={() => setShowSuccessModal(true)} style={{ width: '100%', marginTop: '20px', padding: '18px', fontSize: '16px', backgroundColor: '#1A472A', color: '#FFF', boxShadow: '4px 4px 0px #111' }}>
          Checkout at {selectedStore.name} →
        </Button>
      </div>

      {showSuccessModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#FFF', border: '3px solid #111', borderRadius: '24px', padding: '30px 20px', width: '100%', maxWidth: '320px', boxShadow: '8px 8px 0px #111', textAlign: 'center' }}>
            <div style={{ fontSize: '60px', marginBottom: '10px' }}>🎉</div>
            <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#111', margin: '0 0 10px 0' }}>Success!</h2>
            <p style={{ color: '#555', fontWeight: 'bold', fontSize: '15px', marginBottom: '25px', lineHeight: '1.4' }}>
              Your grocery list has been sent to <strong>{selectedStore.name}</strong>.<br/> You're ready to pick it up!
            </p>
            <Button onClick={handleCheckoutComplete} style={{ width: '100%', padding: '16px', fontSize: '16px', backgroundColor: '#111', color: '#FFF' }}>
              Done & Start New Cart
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}