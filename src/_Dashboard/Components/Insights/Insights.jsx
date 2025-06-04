'use client'; 

import React, { useEffect } from 'react';

const Insights = () => {
  useEffect(() => {
    fetch('/api/insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pathname: window?.location?.pathname }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to send analytics');
        return res.json();
      })
      .then((data) => {
        console.log('✅ Analytics sent:', data);
      })
      .catch((err) => {
        console.error('❌ Analytics error:', err.message);
      });
  }, []);

  return <div>Insights</div>;
};

export default Insights;
