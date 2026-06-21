// src/features/deals/ProductList.jsx
import React, { useState, useEffect } from 'react';
import TopStaples from './TopStaples';
import SkeletonCard from '../../components/SkeletonCard';
import EmptyState from '../../components/EmptyState';
import mockProducts from '../../data/products.json';

export default function ProductList({ cart, onUpdateQuantity }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSavingsModal, setShowSavingsModal] = useState(false); 
  
  const [zipCode, setZipCode] = useState('77'); 
  const [radius, setRadius] = useState(12); 

  const [tempZipCode, setTempZipCode] = useState(zipCode);
  const [tempRadius, setTempRadius] = useState(radius);

  const [selectedStores, setSelectedStores] = useState(['Walmart', 'Target', 'ALDI', 'HEB']); 
  const [selectedDietary, setSelectedDietary] = useState([]); 

  const fetchProducts = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      if (searchQuery.toLowerCase() === 'error') setHasError(true);
      setIsLoading(false);
    }, 800); 
  };

  useEffect(() => { fetchProducts(); }, [activeCategory, selectedStores, selectedDietary]); 

  // 🌟 過濾邏輯升級：加入 p.dietary?.includes 保護機制
  const filteredProducts = mockProducts.filter(p => {
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStore = p.stores.some(store => selectedStores.includes(store));
    const matchDietary = selectedDietary.length === 0 || selectedDietary.every(diet => p.dietary?.includes(diet));
    
    return matchCategory && matchSearch && matchStore && matchDietary;
  });

  const toggleStore = (store) => setSelectedStores(prev => prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]);
  const toggleDietary = (diet) => setSelectedDietary(prev => prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]);

  const handleOpenLocation = () => {
    setTempZipCode(zipCode);
    setTempRadius(radius);
    setShowLocationModal(true);
  };

  const handleApplyLocation = () => {
    setZipCode(tempZipCode);
    setRadius(tempRadius);
    setShowLocationModal(false);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#F8F7F2', position: 'relative' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#111', margin: 0, letterSpacing: '-1px', flexShrink: 0 }}>Deals</h1>
        <div onClick={() => setShowSavingsModal(true)} style={{ flex: 1, backgroundColor: '#1A472A', color: '#FFF', border: '3px solid #111', borderRadius: '18px', padding: '10px 14px', boxShadow: '3px 3px 0px #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#E8E5DC' }}>Weekly Savings</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '22px', fontWeight: '900', lineHeight: '1' }}>$16.69</span>
            <span style={{ backgroundColor: '#FFF', color: '#1A472A', fontSize: '11px', fontWeight: '900', padding: '2px 6px', borderRadius: '8px' }}>67%</span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}><TopStaples /></div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input type="text" placeholder="Search items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter') fetchProducts() }} style={{ flex: 1, padding: '12px 16px', borderRadius: '16px', border: '2px solid #111', fontSize: '15px', fontWeight: 'bold', outline: 'none' }} />
        <button onClick={() => setShowFilterModal(true)} style={{ backgroundColor: (selectedStores.length < 4 || selectedDietary.length > 0) ? '#1A472A' : '#FFF', color: (selectedStores.length < 4 || selectedDietary.length > 0) ? '#FFF' : '#111', border: '2px solid #111', borderRadius: '16px', padding: '0 16px', fontWeight: '900', cursor: 'pointer', boxShadow: '2px 2px 0px #111' }}>
          Filters {(selectedStores.length < 4 || selectedDietary.length > 0) ? '●' : ''}
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', width: '100%' }}>
        <p onClick={handleOpenLocation} style={{ color: '#555', fontWeight: 'bold', margin: 0, fontSize: '13px', cursor: 'pointer', display: 'inline-block', backgroundColor: '#E8E5DC', padding: '8px 12px', borderRadius: '16px', border: '2px solid transparent', flexShrink: 0, whiteSpace: 'nowrap' }}>
          📍 Zip {zipCode} • {radius} mi ✎
        </p>

        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', flex: 1, paddingBottom: '4px' }}>
          {['All', 'Dairy', 'Produce', 'Meat', 'Pantry'].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <span key={cat} onClick={() => { setActiveCategory(cat); setSearchQuery(''); }} style={{ backgroundColor: isActive ? '#1A472A' : '#E8E5DC', color: isActive ? '#FFF' : '#555', fontWeight: '900', padding: '8px 14px', borderRadius: '16px', border: isActive ? '2px solid #111' : '2px solid transparent', whiteSpace: 'nowrap', fontSize: '13px', cursor: 'pointer' }}>
                {cat}
              </span>
            );
          })}
        </div>
      </div>

      <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#111', margin: '0 0 15px 0' }}>Featured Deals</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
        {isLoading && (<><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></>)}
        {!isLoading && hasError && (<EmptyState icon="⚠️" title="Network Error" description="We couldn't fetch the latest deals." actionText="Try Again" onAction={fetchProducts} isError={true} />)}
        {!isLoading && !hasError && filteredProducts.length === 0 && (<EmptyState icon="🔍" title="No Deals Found" description={`No products match your current filters or search.`} actionText="Clear Filters" onAction={() => { setSearchQuery(''); setActiveCategory('All'); setSelectedStores(['Walmart', 'Target', 'ALDI', 'HEB']); setSelectedDietary([]); fetchProducts(); }} />)}
        {!isLoading && !hasError && filteredProducts.length > 0 && (
          filteredProducts.map((prod) => {
            const cartItem = cart[prod.id];
            const qty = cartItem ? cartItem.quantity : 0;
            return (
              <div key={prod.id} style={{ backgroundColor: '#FFF', border: '3px solid #111', borderRadius: '20px', padding: '15px', boxShadow: '3px 3px 0px #111', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ height: '110px', backgroundColor: '#F0EFEA', borderRadius: '14px', marginBottom: '10px', border: '2px solid #111', overflow: 'hidden' }}>
                    <img src={prod.img} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: '900', margin: '0 0 4px 0', color: '#111', lineHeight: '1.3' }}>{prod.name}</h4>
                  <span style={{ fontSize: '11px', color: '#777', fontWeight: 'bold' }}>{prod.subtext}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '900', color: '#1A472A' }}>${prod.price.toFixed(2)}</span>
                  {qty === 0 ? (
                    <button onClick={() => onUpdateQuantity(prod, 1)} style={{ backgroundColor: '#1A472A', color: '#FFF', border: '2px solid #111', width: '36px', height: '36px', borderRadius: '50%', fontWeight: '900', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#E8E5DC', border: '2px solid #111', borderRadius: '20px', padding: '2px 6px', gap: '8px' }}>
                      <button onClick={() => onUpdateQuantity(prod, -1)} style={{ background: 'none', border: 'none', fontWeight: '900', cursor: 'pointer' }}>-</button>
                      <span style={{ fontWeight: '900', fontSize: '14px' }}>{qty}</span>
                      <button onClick={() => onUpdateQuantity(prod, 1)} style={{ background: 'none', border: 'none', fontWeight: '900', cursor: 'pointer' }}>+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {showSavingsModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#FFF', border: '3px solid #111', borderRadius: '24px', padding: '30px 24px', width: '100%', maxWidth: '320px', boxShadow: '8px 8px 0px #111', textAlign: 'center' }}>
            <div style={{ fontSize: '50px', marginBottom: '10px' }}>💰</div>
            <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#111', margin: '0 0 5px 0' }}>Great Job!</h2>
            <p style={{ color: '#555', fontWeight: 'bold', fontSize: '15px', marginBottom: '20px', lineHeight: '1.4' }}>You've saved <strong>$16.69</strong> this week!</p>
            <div style={{ textAlign: 'left', backgroundColor: '#F0EFEA', border: '2px dashed #ccc', borderRadius: '16px', padding: '15px', marginBottom: '20px' }}>
              <p style={{ fontSize: '13px', color: '#111', fontWeight: '900', margin: '0 0 10px 0' }}>Breakdown:</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}><span>ALDI Deals</span> <span style={{color: '#1A472A'}}>$10.20</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '15px', fontWeight: 'bold', color: '#555' }}><span>Target Price Match</span> <span style={{color: '#1A472A'}}>$6.49</span></div>
              <div style={{ paddingTop: '15px', borderTop: '2px dashed #ccc' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>Monthly Goal ($50)</span>
                    <span style={{ fontSize: '12px', fontWeight: '900', color: '#111' }}>33%</span>
                 </div>
                 <div style={{ width: '100%', height: '10px', backgroundColor: '#FFF', borderRadius: '5px', border: '1px solid #ccc', overflow: 'hidden' }}>
                   <div style={{ width: '33%', height: '100%', backgroundColor: '#1A472A', borderRadius: '5px' }}></div>
                 </div>
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '12px', color: '#666', fontWeight: 'bold' }}>Yearly Projection</p>
              <p style={{ margin: 0, fontSize: '22px', fontWeight: '900', color: '#1A472A' }}>~$867.00 / year</p>
            </div>
            <button onClick={() => setShowSavingsModal(false)} style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: '900', backgroundColor: '#111', color: '#FFF', border: 'none', borderRadius: '16px', cursor: 'pointer' }}>Keep Saving</button>
          </div>
        </div>
      )}

      {showFilterModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#FFF', borderTop: '3px solid #111', borderLeft: '3px solid #111', borderRight: '3px solid #111', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '24px', width: '100%', height: '60vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '900' }}>Filters</h3>
              <button onClick={() => setShowFilterModal(false)} style={{ background: 'none', border: 'none', fontSize: '24px', fontWeight: '900', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '900' }}>Stores Preference</h4>
                {['Walmart', 'Target', 'ALDI', 'HEB'].map(store => (
                  <label key={store} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    <input type="checkbox" checked={selectedStores.includes(store)} onChange={() => toggleStore(store)} style={{ width: '20px', height: '20px', accentColor: '#1A472A' }} /> {store}
                  </label>
                ))}
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '900' }}>Dietary & Organic</h4>
                {['Organic Only', 'Gluten Free', 'Vegan'].map(diet => (
                  <label key={diet} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    <input type="checkbox" checked={selectedDietary.includes(diet)} onChange={() => toggleDietary(diet)} style={{ width: '20px', height: '20px', accentColor: '#1A472A' }} /> {diet}
                  </label>
                ))}
              </div>
            </div>
            <button onClick={() => setShowFilterModal(false)} style={{ width: '100%', backgroundColor: '#111', color: '#FFF', border: 'none', borderRadius: '16px', padding: '16px', fontWeight: '900', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>
              Show Results ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}

      {showLocationModal && (
         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
         <div style={{ backgroundColor: '#FFF', border: '3px solid #111', borderRadius: '24px', padding: '24px', width: '100%', maxWidth: '340px', boxShadow: '8px 8px 0px #111' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
             <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '900' }}>Search Area</h3>
             <button onClick={() => setShowLocationModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', fontWeight: '900', cursor: 'pointer' }}>✕</button>
           </div>
           
           <div style={{ width: '100%', height: '160px', backgroundColor: '#E1EFE6', borderRadius: '16px', border: '2px solid #111', position: 'relative', overflow: 'hidden', marginBottom: '20px' }}>
             <div style={{ position: 'absolute', top: '30%', left: 0, right: 0, height: '6px', backgroundColor: '#FFF' }}></div>
             <div style={{ position: 'absolute', top: 0, bottom: 0, left: '40%', width: '6px', backgroundColor: '#FFF' }}></div>
             <div style={{ position: 'absolute', top: '70%', left: '-10%', right: '-10%', height: '8px', backgroundColor: '#FAD02C', transform: 'rotate(-10deg)' }}></div>
             <div style={{
               position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
               width: `${Math.max(40, tempRadius * 8)}px`, height: `${Math.max(40, tempRadius * 8)}px`,
               backgroundColor: 'rgba(26, 71, 42, 0.2)', border: '2px dashed #1A472A', borderRadius: '50%',
               transition: 'width 0.2s ease-out, height 0.2s ease-out'
             }}></div>
             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', fontSize: '28px', zIndex: 10 }}>📍</div>
           </div>

           <label style={{ display: 'block', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>Zip Code</label>
           <input type="text" value={tempZipCode} onChange={(e) => setTempZipCode(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #111', marginBottom: '20px', fontSize: '16px', fontWeight: 'bold', boxSizing: 'border-box' }} />
           
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
             <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Radius</label>
             <span style={{ fontWeight: '900', color: '#1A472A' }}>{tempRadius} miles</span>
           </div>
           <input type="range" min="1" max="30" step="1" value={tempRadius} onChange={(e) => setTempRadius(Number(e.target.value))} style={{ width: '100%', accentColor: '#1A472A', marginBottom: '24px', cursor: 'pointer' }} />

           <button onClick={handleApplyLocation} style={{ width: '100%', backgroundColor: '#1A472A', color: '#FFF', border: '3px solid #111', borderRadius: '16px', padding: '14px', fontWeight: '900', fontSize: '16px', cursor: 'pointer' }}>Apply</button>
         </div>
       </div>
      )}

    </div>
  );
}