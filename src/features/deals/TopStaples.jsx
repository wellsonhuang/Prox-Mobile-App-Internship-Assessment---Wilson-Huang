// src/features/deals/TopStaples.jsx
import React from 'react';

// 資料結構：加入兩家店的價格與趨勢 ('up', 'down', 'same')，以及誰是贏家 (winner)
const staplesData = [
  { id: 1, name: "Chicken Breast", wPrice: 4.99, wTrend: 'up', tPrice: 3.59, tTrend: 'down', winner: 'T' },
  { id: 2, name: "Ground Beef", wPrice: 6.44, wTrend: 'same', tPrice: 5.39, tTrend: 'down', winner: 'T' },
  { id: 3, name: "Large Eggs", wPrice: 0.86, wTrend: 'down', tPrice: 0.99, tTrend: 'up', winner: 'W' },
  { id: 4, name: "Whole Milk", wPrice: 2.44, wTrend: 'same', tPrice: 1.99, tTrend: 'down', winner: 'T' },
  { id: 5, name: "Cheddar Cheese", wPrice: 1.97, wTrend: 'down', tPrice: 1.99, tTrend: 'same', winner: 'W' },
];

export default function TopStaples() {
  const renderPrice = (price, trend, isWinner) => {
    let arrow = '';
    let arrowColor = '';
    if (trend === 'down') { arrow = '▼'; arrowColor = '#1A472A'; } // 跌價/便宜 (綠)
    else if (trend === 'up') { arrow = '▲'; arrowColor = '#FF5252'; } // 漲價/變貴 (紅)
    else { arrow = '–'; arrowColor = '#999'; }

    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
        backgroundColor: isWinner ? '#D1E8D5' : 'transparent', // 贏家顯示淺綠底
        padding: '6px 10px', borderRadius: '8px',
        fontWeight: isWinner ? '900' : '500',
        color: isWinner ? '#1A472A' : '#555'
      }}>
        <span style={{ fontSize: '10px', color: arrowColor }}>{arrow}</span>
        <span>${price.toFixed(2)}</span>
        {isWinner && <span style={{ fontSize: '12px', marginLeft: '2px' }}>✓</span>}
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#FFF', borderRadius: '24px', border: '3px solid #111', padding: '20px', boxShadow: '4px 4px 0px #111' }}>
      <h2 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 20px 0', lineHeight: 1.2 }}>
        Top 5 Grocery Staples This Week
      </h2>

      {/* 表格標頭 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', paddingBottom: '10px', borderBottom: '2px solid #111', marginBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontWeight: '900', color: '#666', letterSpacing: '1px' }}>ITEM</span>
        <span style={{ fontSize: '11px', fontWeight: '900', color: '#666', letterSpacing: '1px', textAlign: 'center' }}>WALMART</span>
        <span style={{ fontSize: '11px', fontWeight: '900', color: '#666', letterSpacing: '1px', textAlign: 'center' }}>TARGET</span>
      </div>

      {/* 表格內容 */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {staplesData.map((item, index) => (
          <div key={item.id} style={{ 
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', alignItems: 'center', 
            padding: '8px 0', borderBottom: index !== staplesData.length - 1 ? '1px solid #E8E5DC' : 'none' 
          }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#111' }}>{item.name}</span>
            <div style={{ textAlign: 'center' }}>{renderPrice(item.wPrice, item.wTrend, item.winner === 'W')}</div>
            <div style={{ textAlign: 'center' }}>{renderPrice(item.tPrice, item.tTrend, item.winner === 'T')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}