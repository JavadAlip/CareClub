// import React, { useState } from 'react';
// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import axios from 'axios';

// const PaymentForm = ({ amount }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [paymentStatus, setPaymentStatus] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) {
//       alert('Failed to find card element.');
//       return;
//     }

//     try {
//       const { data } = await axios.post('http://localhost:5000/api/create-payment-intent', {
//         amount,
//       });

//       const { clientSecret } = data;

//       const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: cardElement,
//       });

//       if (methodError) {
//         console.error(methodError);
//         alert('Failed to create payment method. Please try again later.');
//         return;
//       }

//       const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: paymentMethod.id,
//       });

//       if (confirmError) {
//         console.error(confirmError);
//         alert('Payment failed. Please try again later.');
//       } else {
//         if (paymentIntent.status === 'succeeded') {
//           setPaymentStatus('succeeded');
//           setTimeout(() => {
//             window.location.href = '/success'; // Programmatic redirect to success page
//           }, 2000); // Redirect after 2 seconds
//         }
//       }
//     } catch (error) {
//       console.error('Error creating payment intent or confirming payment:', error);
//       alert('Failed to create payment intent or confirm payment. Please try again later.');
//     }
//   };

//   if (paymentStatus === 'succeeded') {
//     return (
//       <div className="text-center pt-[180px]">
//         <h2>Payment Successful!</h2>
//         <p>Thank you for your Donation.</p>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" className="btn rounded mt-4" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;


import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/create-payment-intent', {
        amount,
        postal_code: postalCode, // Include postal code in the request
      });

      const { clientSecret } = data;

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: {
          // Include additional details here as needed
        },
      });

      if (paymentMethodReq.error) {
        console.error(paymentMethodReq.error);
        alert('Failed to create payment method. Please try again later.');
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: 'Test User', // Replace with actual user's details
            email: 'test@example.com', // Replace with actual user's email
            address: {
              postal_code: postalCode, // Include postal code in the payment method
            },
          },
        },
      });

      if (error) {
        console.error(error);
        alert('Payment failed. Please try again later.');
      } else {
        if (paymentIntent.status === 'succeeded') {
          setPaymentStatus('succeeded');
          setTimeout(() => {
            window.location.href = '/success'; 
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process payment. Please try again later.');
    }
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Card Number</label>
        <CardNumberElement
          className="input-field"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
        <CardExpiryElement
          className="input-field"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">CVC</label>
        <CardCvcElement
          className="input-field"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Postal Code</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
          className="input-field"
        />
      </div>
      <button type="submit" className="btn rounded mt-4" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
