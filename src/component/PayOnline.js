
import React, { useState, useEffect } from 'react';
import * as api from '../Api';
import RazorPayButton from './RazorPayButton';
function PayOnline({ id }) {
  const [amount, setAmount] = useState(0);
  const [keyId, setKeyId] = useState('');
  const [secret, setSecret] = useState('');
  const [ qrcode, setQrcode] = useState('')
  const [bill, setBill] = useState({
    orderId: '',
    paymentId: '',
    paymentStatus: '',
  });
  const [isSuccess, setIsSuccess] = useState();
  const [isComplete, setIsComplete] = useState();
  const [isPayment, setIsPayment] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  useEffect(() => {
    getPaymentDetail();
  }, []);

  const getPaymentDetail = async () => {
    const res = await api.fetchPayment(id);
    if (res.status === 'success') {
      setKeyId(res.response.payment_gateway_access_key);
      setSecret(res.response.payment_gateway_access_code);
    }
    //comment out this hardcoded credentials
    // setKeyId('rzp_test_TbHhelw0PIhB8U');
    // setSecret('Zr7SxsJrB197ERMDSMkrxima');
  };

  useEffect(() => {
    api.fetchQrcode(id)
    .then((data) => {
        console.log("data is", data);
        
            console.log(data);
            setQrcode(data[0].qr_code_url);
        console.log("Qr is ", qrcode);
        
    })
    .catch((err) => {
        console.log(err);
    })
})

  return (
    <div style={{marginTop:'150px'}}>

      <h1 className="text-center">Pay Online</h1>
      <div className="razorpay_style">
          {keyId ? (<div>
                {isPayment ? (
              isComplete ? (
                <div className='login-boxx' >
                  <div className='login-title'>
                    {isSuccess ? (
                      <>
                        <div style={{padding:'20px',display:"flex ",margin:'0 auto',marginBottom:'10px'}}>
                          <div style={{boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.1)',width:'40%'}}>
                            <div className="pay_header" style={{height: '90px', backgroundColor:'#4CAF50',width:'100% '}}>
                                  <h3 style={{ color: 'white',padding:'10px' }}>Payment Successful!</h3>
                            </div>
                            <div style={{padding:'10px',width:'100% '}}>
                              <p><strong>Order id :</strong> {bill.orderId}</p>
                              <p><strong>Payment Id:</strong> {bill.paymentId}</p>
                              <p><strong>Payment Status:</strong> {bill.paymentStatus}</p>
                              <p><strong>Amount:</strong> ₹{amount}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div style={{height: '541px', width:'524px' ,boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
                        <div className="pay_header" style={{height: '90px', backgroundColor:'#4CAF50',width:'30% '}}>
                            <h3 style={{ color: 'white' }}>Payment Successful!</h3>
                        </div>
                        <p>Order id : {bill.orderId}</p>
                        <p>Payment Id: {bill.paymentId}</p>
                        <p>Payment Status : {bill.paymentStatus}</p>
                        <p>Amount: ₹{amount}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className='login-box' style={{height: '541px', width:'524px'}}>
                  <div className='login-title text-center'>
                    <h3 style={{ color: 'red' }}>Payment Failed!</h3>
                  </div>
                </div>
              )
            ) : null}
            {!isPayment && (
              <div className='online_pay' style={{width:'100%',margin:'0 auto'}}>
                  <div style={{width:'40%',margin:'0 auto'}}>

                  <div className="pay_header" style={{height: '90px', backgroundColor:'#4CAF50',width:'100% '}}>
                        <h3 style={{ color: 'white',padding:'10px' }}>Fill the Payment form  </h3>
                  </div>
                  <br/>
                  <div style={{padding:'10px'}}>
                      <p><strong>Payment Mode</strong> </p>
                      <input
                        type='text'
                        placeholder='Razor Pay'
                        style={{
                          border: '1px solid',
                          borderRadius: '10px',
                          width: '97%',
                          padding: '5px',
                        }}
                      />
                      <br/>
                      <p style={{marginTop:'10px'}}><strong>Enter Amount</strong></p>
                      <input
                        type='text'
                        placeholder='Please enter the amount min(₹ 1/-)'
                        onChange={(e) => setAmount(e.target.value)}
                        style={{
                          border: '1px solid',
                          borderRadius: '10px',
                          width: '97%',
                          padding: '5px',
                        }}
                      />
                      
                      <RazorPayButton
                        amount={amount}
                        keyId={keyId}
                        setBill={setBill}
                        secret={secret}
                        setIsSuccess={setIsSuccess}
                        setIsComplete={setIsComplete}
                        setIsPayment={setIsPayment}
                        className=' text-center'
                        style={{
                          borderRadius: '5px',
                          width: '97%',
                          border: 'none',
                          fontSize: '18px',
                          marginTop:'10px',
                          height:'50px',
                          backgroundColor:'#4CAF50',
                          color:'#fffff'
                        }}
                      >
                        Pay
                      </RazorPayButton>



                  </div>




                  </div>
                            
              </div>
            )}


          </div>):null}
      </div>
                        
        {qrcode ? (<div style={{width:'350px',height:'450px',padding:'50px',boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.1)',margin:'20px auto'}}>
                  <img style={{width:'250px',height:'auto'}} src={qrcode} alt=""/>
                  <h5 style={{marginTop:'20px'}}>
                      For Making the payment scan the QR Code
                  </h5>
              </div>):(null)}
      
    </div>
  );
}

export default PayOnline;
