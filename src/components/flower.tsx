import React from 'react';
import flower from '../assets/flower.svg';

export default function Flower() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <img src={flower} alt="Flower" style={{ width: '200px' }} />
    </div>
  );
}
