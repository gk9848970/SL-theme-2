import React from 'react';
import Footer from './component/Footer';
import Header from './component/Header';
import PayOnline from './component/PayOnline';

function Pay({ id }) {
  return (
    <div>
      <Header id={id} />
      <PayOnline id={id} />

      <Footer id={id} />
    </div>
  );
}

export default Pay;
