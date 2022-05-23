import React from 'react';
import { fetchOrderID, fetchVerification } from '../Api';

const RazorPayButton = ({
  amount,
  keyId,
  setBill,
  secret,
  setIsComplete,
  setIsSuccess,
  setIsPayment,
  ...restProps
}) => {
  const paymentSuccessHandler = (paymentId, orderId, signature, amount) => {
    // we can use this api to store the payment details along with user details is available
    fetchVerification(paymentId, orderId, signature, amount, secret).then(
      (data) => {
        console.log(data);
        if (data.success) {
          setIsSuccess(true);
          setBill({
            orderId: orderId,
            paymentId: paymentId,
            paymentStatus: data.msg,
          });
        } else {
          setIsSuccess(false);
          setBill({
            orderId: orderId,
            paymentId: paymentId,
            paymentStatus: data.msg,
          });
        }
      }
    );
  };

  async function displayRazorpay() {
    // This api call is to get the orderId from the backend along with the amount data.
    const data = await fetchOrderID(amount, keyId, secret);

    console.log(data);

    console.log(keyId);

    const options = {
      key: keyId,
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      name: 'Payment',
      description: 'Payment Description',
      // This handler will be called after a successful payment
      handler: function (response) {
        console.log(response);
        setIsPayment(true);
        setIsComplete(true);
        paymentSuccessHandler(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature,
          amount
        );
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on('payment.failed', function (response) {
      alert(response.error.description);
      setIsPayment(true);
      setIsComplete(false);
    });
    paymentObject.open();
  }

  return (
    <button onClick={displayRazorpay} {...restProps}>
      Pay now
    </button>
  );
};

export default RazorPayButton;
