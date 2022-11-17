import React, {useEffect, useState} from 'react'
import { useRef } from 'react';

const Paymentgateway = ({CheckoutAmount, pleaseSubscribeMe, plansExpiryDate, setSubscription_type, setCheckout}) => {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    // console.log(CheckoutAmount);
  // getINR2USD(CheckoutAmount).then(newamt=>{
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your description",
                amount: {
                  currency_code: "USD",
                  value: parseFloat(CheckoutAmount).toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          setCheckout(false);
          if(CheckoutAmount===4.62){
            pleaseSubscribeMe('Monthly', 4.62, plansExpiryDate);
            setSubscription_type('Monthly');
          }
          else if(CheckoutAmount===31.12){
            pleaseSubscribeMe('Yearly', 31.12, plansExpiryDate);
            setSubscription_type('Yearly');
          }
        },
        onError: (err) => {
        },
      })
      .render(paypalRef.current);
  // })
  }, [CheckoutAmount]);

  if (paid) {
    return <button className="subscribe_btn subscribed">Subscribed</button>;
  }

  // If any error occurs
  if (error) {
    return <div style={{"color":"red"}}>Error Occurred in processing payment.! Please try again.</div>;
  }

  return (
    <div className="payment-div">
    <div>
      <div ref={paypalRef} />
    </div>
    </div>
  );
}

export default Paymentgateway;