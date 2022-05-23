import React, { useState, useEffect } from 'react';
import * as api from '../Api';
import Footer from '../component/Footer';
import Header from '../component/Header';

function Payonline({ id }) {
  const [payment, setPayment] = useState('');
  const [status, setStatus] = useState(false);

  useEffect(() => {
    api
      .fetchPayment(id)
      .then((data) => {
        if (data.status === 'success') {
          setPayment(data.response);
          setStatus(true);
          console.log('Prateek  pay', data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Header id={id} />
      <h1 style={{ padding: '150px' }}>Pay Online</h1>
      <Footer id={id} />
    </>
  );
}

export default Payonline;
