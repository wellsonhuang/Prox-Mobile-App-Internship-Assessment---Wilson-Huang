// src/features/cart/CartDrawer.jsx
import React from 'react';
import EmptyState from '../../components/EmptyState'; 

export default function CartDrawer({ isOpen, onClose, cartItems, totalPrice, onUpdateQuantity, onOptimize }) {
  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1000, backdropFilter: 'blur(2px)' }} />

      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, maxHeight: '85vh',
        backgroundColor: '#F8F7F2', borderTop: '4px solid #111', borderLeft: '4px solid #111', borderRight: '4px solid #111',
        borderTopLeftRadius: '32px', borderTopRightRadius: '32px', padding: '24px',
        zIndex: 1001, display: 'flex', flexDirection: 'column',
        boxShadow: '0px -4px 20px rgba(0,0,0,0.15)',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

        <div onClick={onClose} style={{ width: '50px', height: '6px', backgroundColor: '#111', borderRadius: '3px', margin: '-10px auto 20px auto', cursor: 'pointer', opacity: 0.3 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#111', margin: 0 }}>Grocery List</h2>
            <p style={{ color: '#666', fontSize: '13px', fontWeight: 'bold', margin: '2px 0 0 0' }}>Find the cheapest store price for your entire cart.</p>
          </div>
          <button onClick={onClose} style={{ background: '#FFF', border: '2px solid #111', borderRadius: '50%', width: '36px', height: '36px', fontWeight: '900', cursor: 'pointer', boxShadow: '2px 2px 0px #111' }}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
            <EmptyState icon="🛒" title="Your Cart is Empty" description="Add some deals to optimize your basket and start saving!" actionText="Browse Deals" onAction={onClose} />
          </div>
        ) : (
          <>
            <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', paddingRight: '4px' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', padding: '12px 16px', borderRadius: '16px', border: '2px solid #111', boxShadow: '2px 2px 0px #111' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    
              
                    <div style={{ width: '55px', height: '55px', borderRadius: '10px', border: '2px solid #111', overflow: 'hidden', flexShrink: 0, backgroundColor: '#F0EFEA' }}>
                      <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '900', color: '#111' }}>{item.name}</h4>
                      <span style={{ fontSize: '14px', fontWeight: '900', color: '#1A472A' }}>${item.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#E8E5DC', border: '2px solid #111', borderRadius: '20px', padding: '2px 6px', gap: '8px' }}>
                    <button onClick={() => onUpdateQuantity(item, -1)} style={{ background: 'none', border: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '16px' }}>-</button>
                    <span style={{ fontWeight: '900', fontSize: '14px' }}>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item, 1)} style={{ background: 'none', border: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '16px' }}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '2px dashed #ccc', paddingTop: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#555' }}>Est. Subtotal:</span>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#111' }}>${totalPrice.toFixed(2)}</span>
              </div>
              <button onClick={onOptimize} style={{ width: '100%', padding: '18px', fontSize: '18px', fontWeight: '900', backgroundColor: '#1A472A', color: '#FFF', border: '3px solid #111', borderRadius: '16px', cursor: 'pointer', boxShadow: '4px 4px 0px #111', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'translate(2px, 2px)'} onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0, 0)'}>
                ✨ Find Best Store
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}