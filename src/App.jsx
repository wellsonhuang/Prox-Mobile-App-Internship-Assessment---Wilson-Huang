// src/App.jsx
import React, { useState } from 'react';
import ProductList from './features/deals/ProductList';
import CartDrawer from './features/cart/CartDrawer';
import CartResultsScreen from './features/cart/CartResultsScreen';
import PantryScreen from './features/pantry/PantryScreen';
import AccountScreen from './features/account/AccountScreen'; // Import the new AccountScreen
import Button from './components/Button';
import './App.css';

function App() {
  // App state management
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTab, setCurrentTab] = useState('deals'); 
  const [cart, setCart] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleStartSaving = () => setHasStarted(true);

  // Handle adding, updating, or removing items from the cart
  const updateQuantity = (item, change) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      const currentQty = newCart[item.id]?.quantity || 0;
      const targetQty = currentQty + change;

      if (targetQty <= 0) {
        delete newCart[item.id];
      } else {
        newCart[item.id] = { ...item, quantity: targetQty };
      }
      return newCart;
    });
  };

  const clearCart = () => setCart({});

  // Calculate cart totals
  const cartItemsArray = Object.values(cart);
  const totalItems = cartItemsArray.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItemsArray.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Render the correct screen based on the current tab
  const renderCurrentScreen = () => {
    switch (currentTab) {
      case 'deals':
        return <ProductList cart={cart} onUpdateQuantity={updateQuantity} />;
      case 'cart': 
        return (
          <CartResultsScreen 
            cartItems={cartItemsArray} 
            totalPrice={totalPrice} 
            onBrowseDeals={() => setCurrentTab('deals')} 
            clearCart={clearCart} 
          />
        );
      case 'pantry': 
        return <PantryScreen cart={cart} onUpdateQuantity={updateQuantity} />;
      case 'account':
        return <AccountScreen />; // Render the new AccountScreen component here
      default:
        return <ProductList cart={cart} onUpdateQuantity={updateQuantity} />;
    }
  };

  return (
    <div className="app-container" style={{ backgroundColor: '#F8F7F2', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {!hasStarted ? (
        // Welcome Screen
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '0 25px', boxSizing: 'border-box', textAlign: 'center' }}>
          
          {/* App Logo Image */}
          <div style={{ marginBottom: '25px', width: '130px', height: '130px', borderRadius: '30px', overflow: 'hidden', border: '4px solid #111', boxShadow: '6px 6px 0px #111' }}>
             <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80" alt="prox app" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          
          {/* App Title */}
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#111', margin: '0 0 10px 0', letterSpacing: '-2px' }}>prox</h1>
          <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#555', maxWidth: '280px', margin: '0 0 40px 0' }}>Compare grocery prices, discover active deals, and optimize your basket.</p>
          <Button variant="primary" onClick={handleStartSaving} style={{ width: '100%', maxWidth: '300px', padding: '18px', fontSize: '18px' }}>Start Saving Now →</Button>
        </div>
      ) : (
        // Main App Interface
        <>
          <div style={{ paddingBottom: '110px' }}>
            {renderCurrentScreen()}
          </div>

          {/* Floating Cart Button */}
          {totalItems > 0 && currentTab !== 'cart' && (
            <div 
              onClick={() => setIsDrawerOpen(true)}
              style={{
                position: 'fixed', bottom: '105px', right: '20px', zIndex: 999,
                backgroundColor: '#1A472A', color: '#FFF', padding: '15px 22px',
                borderRadius: '30px', border: '3px solid #111', boxShadow: '4px 4px 0px #111',
                display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '20px' }}>🛒</span>
              <span style={{ fontWeight: '900', fontSize: '16px' }}>{totalItems} Items</span>
              <span style={{ width: '2px', height: '18px', backgroundColor: 'rgba(255,255,255,0.4)' }}></span>
              <span style={{ fontWeight: '900', fontSize: '16px' }}>${totalPrice.toFixed(2)}</span>
            </div>
          )}

          {/* Cart Drawer Component */}
          <CartDrawer 
            isOpen={isDrawerOpen} 
            onClose={() => setIsDrawerOpen(false)} 
            cartItems={cartItemsArray}
            totalPrice={totalPrice}
            onUpdateQuantity={updateQuantity}
            onOptimize={() => {
              setIsDrawerOpen(false);
              setCurrentTab('cart'); 
            }}
          />

          {/* Bottom Navigation Bar */}
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', borderTop: '3px solid #111', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', display: 'flex', justifyContent: 'space-around', padding: '12px 10px 22px 10px', zIndex: 990 }}>
            <NavIcon icon="🔥" label="Deals" isActive={currentTab === 'deals'} onClick={() => setCurrentTab('deals')} />
            <NavIcon icon="🛒" label="Cart" isActive={currentTab === 'cart'} onClick={() => setCurrentTab('cart')} />
            <NavIcon icon="📦" label="Pantry" isActive={currentTab === 'pantry'} onClick={() => setCurrentTab('pantry')} />
            <NavIcon icon="👤" label="Account" isActive={currentTab === 'account'} onClick={() => setCurrentTab('account')} />
          </div>
        </>
      )}
    </div>
  );
}

// Navigation Icon Component
function NavIcon({ icon, label, isActive, onClick, style }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', opacity: isActive ? 1 : 0.6, transition: '0.2s', ...style }}>
      <span style={{ fontSize: '22px', marginBottom: '2px', backgroundColor: isActive ? '#E8E5DC' : 'transparent', padding: '4px 12px', borderRadius: '20px' }}>{icon}</span>
      <span style={{ fontSize: '11px', fontWeight: '900', color: '#111' }}>{label}</span>
    </div>
  );
}

export default App;