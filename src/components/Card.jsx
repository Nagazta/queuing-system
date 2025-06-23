import React from 'react';

export default function({title, content, children, style}) {
  return (
    <div className="card" style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        minWidth: '200px',
        minHeight: '100px',
        padding: '16px',
        textAlign: 'Center',
        backgroundColor: '#3B060A',
        color : '#FFF287',
        ...style,
    }}>
      <h2 className="card-title">{title}</h2>
      <div className="card-content">{content}</div>
      {children && <div className="card-children">{children}</div>}
    </div>
  );
}