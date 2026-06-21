import React from 'react';

const ListItem = ({ title, icon, iconBg, iconColor, isLast }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: isLast ? 'none' : '1px solid #F0EFEA', cursor: 'pointer' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor }}>
        {icon}
      </div>
      <span style={{ fontSize: '16px', fontWeight: '800', color: '#111' }}>{title}</span>
    </div>
    <span style={{ color: '#C4C4C4', fontWeight: 'bold', fontSize: '18px' }}>›</span>
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#9A9386', letterSpacing: '1px', marginTop: '30px', marginBottom: '10px', marginLeft: '5px', textTransform: 'uppercase' }}>
    {children}
  </h3>
);

export default function AccountScreen() {
  return (
    <div style={{ backgroundColor: '#F3EFE8', minHeight: '100vh', padding: '20px', paddingBottom: '100px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* title */}
      <h1 style={{ textAlign: 'center', fontSize: '28px', fontWeight: '900', color: '#222', margin: '20px 0 25px 0' }}>Settings</h1>

      {/* personal card */}
      <div style={{ backgroundColor: '#F4C724', borderRadius: '24px', border: '3px solid #111', boxShadow: '4px 4px 0px #111', padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
        
        {/* avatar and edit button */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#FFF', border: '3px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '900', color: '#1A472A' }}>
            WH
          </div>
          <div style={{ position: 'absolute', bottom: '0', right: '-5px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1A472A', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </div>
        </div>

        {/* name and email*/}
        <h2 style={{ margin: '0 0 4px 0', fontSize: '22px', fontWeight: '900', color: '#111' }}>Wilson Huang</h2>
        <p style={{ margin: 0, fontSize: '14px', color: '#7A6413', fontWeight: '500' }}>wellsonhuang888@gmail.com</p>
      </div>

      {/* MY PREFERENCES */}
      <SectionTitle>My Preferences</SectionTitle>
      <div style={{ backgroundColor: '#FFF', borderRadius: '24px', border: '3px solid #111', boxShadow: '4px 4px 0px #111', overflow: 'hidden' }}>
        <ListItem 
          title="Personal Info" 
          iconBg="#FFF0EE" iconColor="#E86653"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path></svg>} 
        />
        <ListItem 
          title="Preferred Retailers" 
          iconBg="#EAF5F0" iconColor="#3B8B66"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>} 
        />
        <ListItem 
          title="Preferred Brands" 
          iconBg="#FDF6E3" iconColor="#C08D38"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>} 
        />
        <ListItem 
          title="Notifications" 
          iconBg="#EBF2FF" iconColor="#4A81E9" isLast={true}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>} 
        />
      </div>

      {/* FEEDBACK  */}
      <SectionTitle>Feedback</SectionTitle>
      <div style={{ backgroundColor: '#FFF', borderRadius: '24px', border: '3px solid #111', boxShadow: '4px 4px 0px #111', padding: '24px 20px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 20px 0', fontSize: '15px', color: '#555', fontWeight: '600', lineHeight: '1.5' }}>
          We'd love to hear what you think about the app!
        </p>
        <button style={{ backgroundColor: '#E86653', color: '#FFF', fontSize: '16px', fontWeight: '900', border: '3px solid #111', borderRadius: '16px', padding: '14px 24px', width: '100%', cursor: 'pointer', boxShadow: '2px 2px 0px #111' }}>
          Give Feedback
        </button>
      </div>

      {/* ACCOUNT & PRIVACY  */}
      <SectionTitle>Account & Privacy</SectionTitle>
      <div style={{ backgroundColor: '#FFF', borderRadius: '24px', border: '3px solid #111', boxShadow: '4px 4px 0px #111', overflow: 'hidden', marginBottom: '40px' }}>
        <ListItem 
          title="Privacy Policy" 
          iconBg="#EBF2FF" iconColor="#4A81E9"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>} 
        />
        <ListItem 
          title="Terms of Service" 
          iconBg="#EAF5F0" iconColor="#3B8B66" isLast={true}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>} 
        />
      </div>

      {/* login and delete account */}
      <button style={{ backgroundColor: '#BA342A', color: '#FFF', fontSize: '18px', fontWeight: '900', border: '3px solid #111', borderRadius: '20px', padding: '16px', width: '100%', cursor: 'pointer', boxShadow: '4px 4px 0px #111', marginBottom: '20px' }}>
        Sign Out
      </button>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <span style={{ color: '#BA342A', fontSize: '15px', fontWeight: '700', textDecoration: 'underline', cursor: 'pointer' }}>
          Delete My Account
        </span>
      </div>

    </div>
  );
}