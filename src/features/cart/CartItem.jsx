// src/features/cart/CartItem.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from './CartSlice';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [shareText, setShareText] = useState('🔗 Share Savings Link');

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const price = typeof item.cost === 'string' ? parseFloat(item.cost.replace('$', '')) : item.cost;
      total += price * item.quantity;
    });
    return total;
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e); 
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const currentTotal = calculateTotalAmount();
  const wholeFoodsTotal = currentTotal * 1.42; 
  const targetTotal = currentTotal * 1.23;    
  const totalSaved = wholeFoodsTotal - currentTotal;

  const handleShareLink = () => {
    setShareText('✓ Link Copied!');
    navigator.clipboard?.writeText?.(`I just saved $${totalSaved.toFixed(2)} on my groceries using Prox!`);
    setTimeout(() => setShareText('🔗 Share Savings Link'), 2000);
  };

  return (
    <div className="cart-mobile-container">
      <div className="cart-header">
        <Button 
          variant="secondary" 
          onClick={(e) => handleContinueShopping(e)}
          style={{ padding: '8px 14px', fontSize: '14px' }}
        >
          ← Back
        </Button>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '900' }}>Cart Results</h2>
        <div style={{ width: '60px' }}></div> 
      </div>

      <div className="cart-items-wrapper">
        {cart.length === 0 ? (
          <EmptyState 
            icon="🛒"
            title="Your Build-a-Cart is empty"
            description="Add items to compare prices across stores and find the best deals."
            actionText="Browse Deals"
            onAction={(e) => handleContinueShopping(e)}
          />
        ) : (
          <>
            <div style={{ border: '2px solid #111', borderRadius: '12px', padding: '15px', backgroundColor: '#FFF', marginBottom: '20px', boxShadow: '3px 3px 0px #111' }}>
              <p style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: '900', color: '#555', textTransform: 'uppercase' }}>⚡ Price Comparison</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#D1E8D5', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #111' }}>
                  <span style={{ fontWeight: '900', fontSize: '14px', color: '#111' }}>✨ Prox (Split Basket)</span>
                  <span style={{ fontWeight: '900', fontSize: '15px', color: '#111' }}>${currentTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5px', fontSize: '13px', fontWeight: 'bold', color: '#666' }}>
                  <span>If bought only at Target:</span>
                  <span>${targetTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5px', fontSize: '13px', fontWeight: 'bold', color: '#666' }}>
                  <span>If bought only at Whole Foods:</span>
                  <span>${wholeFoodsTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {cart.map(item => (
              <div className="mobile-cart-item" key={item.name}>
                <img className="mobile-cart-image" src={item.image} alt={item.name} />
                <div className="mobile-cart-details">
                  <div className="mobile-cart-header">
                    <div className="mobile-cart-name">{item.name}</div>
                    <button className="mobile-delete-btn" onClick={() => handleRemove(item)}>✕</button>
                  </div>
                  <div className="mobile-cart-size">{item.description}</div>
                  <div className="mobile-cart-bottom">
                    <div className="mobile-cart-price">
                      ${typeof item.cost === 'string' ? item.cost.replace('$', '') : item.cost}
                    </div>
                    <div className="mobile-quantity-controls">
                      <button className="qty-btn" onClick={() => handleDecrement(item)}>-</button>
                      <span className="qty-value">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => handleIncrement(item)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-checkout-footer">
          <div className="checkout-summary">
            <span>Optimized Total</span>
            <span className="checkout-total-price">${currentTotal.toFixed(2)}</span>
          </div>
          {/* ✨ 使用共用 Button 元件 */}
          <Button 
            variant="primary" 
            style={{ width: '100%', padding: '16px', fontSize: '18px' }} 
            onClick={() => setIsReceiptOpen(true)}
          >
            Proceed to Checkout
          </Button>
        </div>
      )}

      {isReceiptOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, padding: '20px', fontFamily: 'sans-serif' }}>
          <div style={{ backgroundColor: '#FFF', border: '3px solid #111', borderRadius: '20px', width: '100%', maxWidth: '340px', padding: '20px', boxShadow: '6px 6px 0px #111', position: 'relative', boxSizing: 'border-box' }}>
            
            <div style={{ textAlign: 'center', borderBottom: '2px dashed #111', paddingBottom: '12px', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '900', color: '#111' }}>PROX SAVINGS RECEIPT</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#666', fontWeight: 'bold' }}>Thank you for optimizing with Prox!</p>
            </div>

            <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {cart.map(item => {
                const itemPrice = typeof item.cost === 'string' ? parseFloat(item.cost.replace('$', '')) : item.cost;
                return (
                  <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 'bold', color: '#111' }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{item.name} (x{item.quantity})</span>
                    <span>${(itemPrice * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ borderTop: '2px dashed #111', paddingTop: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold', color: '#666', marginBottom: '4px' }}>
                <span>Standard Store Price:</span>
                <span style={{ textDecoration: 'line-through' }}>${wholeFoodsTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '900', color: '#111', marginBottom: '8px' }}>
                <span>Prox Optimized Price:</span>
                <span>${currentTotal.toFixed(2)}</span>
              </div>
              
              <div style={{ backgroundColor: '#D1E8D5', border: '2px solid #111', borderRadius: '10px', padding: '10px', textAlign: 'center', marginTop: '10px' }}>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: '900', color: '#1A472A' }}>TOTAL SAVED TODAY</p>
                <h2 style={{ margin: '2px 0 0 0', fontSize: '32px', fontWeight: '900', color: '#1A472A' }}>${totalSaved.toFixed(2)}</h2>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/*  Button component */}
              <Button 
                variant="secondary" 
                style={{ width: '100%', padding: '12px' }}
                onClick={handleShareLink}
              >
                {shareText}
              </Button>
              <Button 
                variant="primary" 
                style={{ width: '100%', padding: '12px' }}
                onClick={() => { setIsReceiptOpen(false); dispatch(clearCart()); handleContinueShopping({preventDefault: () => {}}); }}
              >
                Done & Clear Basket
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CartItem;