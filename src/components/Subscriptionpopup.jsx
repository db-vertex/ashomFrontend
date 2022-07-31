import React, {useState, useEffect} from 'react';
import { requestSubscribe, getUserdata, getINR2USD } from '../API/Userapis';
import Alert from '@mui/material/Alert';
import Paymentgateway from '../Pages/PaymentGateway';

function Subscriptionpopup({setmySubscription}) {
 const [Subscription_type, setSubscription_type] = useState(""); 
 const [errorMessage, seterrorMessage] = useState('');
 const [successMessage, setsuccessMessage] = useState('');
 const [checkout, setCheckout] = useState(false);
 const [CheckoutAmount, setCheckoutAmount] = useState(0);


 const pleaseSubscribeMe = (subscription_type, amount, expiry_date) =>{
    clearMessages();
    setSubscription_type(subscription_type);
    requestSubscribe(subscription_type, amount, expiry_date).then(meta =>{
        if(meta.status){      
            if(setmySubscription!==undefined){
                setmySubscription(subscription_type);
            }
            setsuccessMessage(meta.message);
        }
        else{
            seterrorMessage(meta.message);
        }
    })
 }  

 function handelcheckout(amount){
    getINR2USD(amount).then(newamt =>{
        setCheckoutAmount(parseFloat(newamt));
        setCheckout(true);
    });
 }

 function clearMessages(){
    setsuccessMessage('');
    seterrorMessage('')
 }
 
 useEffect(() => {
    getUserdata().then(meta =>{
        setSubscription_type(meta.subscription_type);
        clearMessages();
    })
    
 }, []);

 var curr_date = new Date();
//After +1 Month Date and Time 
let newDate1 = new Date(curr_date.setMonth(curr_date.getMonth()+1));
let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(newDate1);
let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(newDate1);
let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(newDate1);
// const FreePlanEDate = ye +'-'+mo+'-'+da;

curr_date = new Date();
//After +3 Months Date and Time 
var newDate2 = new Date(curr_date.setMonth(curr_date.getMonth()+3));
 ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(newDate2);
 mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(newDate2);
 da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(newDate2);
const ThreeMonthlyPlanEDate = ye +'-'+mo+'-'+da;

 curr_date = new Date(); 
//After +1 Year Date and Time 
var newDate3 = new Date(curr_date.setMonth(curr_date.getMonth()+12));
 ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(newDate3);
 mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(newDate3);
 da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(newDate3);
const YearlyPlanEDate = ye +'-'+mo+'-'+da;


  return <>
      <div className="modal subscription_modal fade" id="subscriptionModal" tabIndex="-1" role="dialog" aria-labelledby="subscriptionModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered subscription_modal_dialog" role="document">
              <div className="modal-content">
                  <div className="modal-header b-none">
                      <h5 className="modal-title subscription_modal_title" id="subscriptionModalLabel">Membership Plans</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body subscription_modal_body">
                     
                  <div className='row subscription_alert_box' >
                        <div className='col-md-4 offset-md-4'>
                        <Alert className={(errorMessage!=='')?'':'d-none'} severity="error">{errorMessage}</Alert>
                        <Alert className={(successMessage!=='')?'':'d-none'} severity="success">{successMessage}</Alert>
                        </div>
                    </div>
                      <div className="row mt-3">
                          <div className="col-md-4 subscription_modal_main_boxs">
                            <div className="subscription_modal_box">
                              <div className="row">
                                  <div className="col">
                                      <span className="subscription_subtitle">Free</span>
                                  </div>
                              </div>
                              <div className="row">
                                  <div className="col">
                                      <h6 className="subscription_pricetitle">INR 0/ Monthly</h6>
                                  </div>
                              </div>
                                  <div className="row subscription_desc_box">
                                  <div className="col">
                                        <div className="row">
                                              <div className="col-2">
                                                  <img alt="" srcSet="/assets/icons/select_sign.svg" />
                                              </div>
                                              <div className="col-10 subscription_desc_row">
                                                  View 3 companies financial
                                                  reports per month.
                                              </div>
                                        </div>
                                          <div className="row">
                                              <div className="col-2">
                                                  <img alt="" srcSet="/assets/icons/select_sign.svg" />
                                              </div>
                                              <div className="col-10 subscription_desc_row">
                                                  Access news on 700+ traded equities in the GCC countries (KSA, UAE, Kuwait, Bahrain, Qatar & Oman).
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-2">
                                                  <img alt="" srcSet="/assets/icons/select_sign.svg" />
                                              </div>
                                              <div className="col-10 subscription_desc_row">
                                                  Share, Discuss, Engage financial knowledge and business thoughts in our fourm.
                                              </div>
                                          </div>
                                          
                                  </div>
                              </div>
                            
                              </div>
                          </div>
                    
                          <div className="col-md-4 subscription_modal_main_boxs">
                              <div className="subscription_modal_box">
                                  <div className="row">
                                      <div className="col">
                                          <span className="subscription_subtitle">Monthly</span>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col">
                                          <h6 className="subscription_pricetitle">INR 349/ Monthly</h6>
                                      </div>
                                  </div>
                                  <div className="row subscription_desc_box">
                                      <div className="col">
                                          <div className="row">
                                              <div className="col-2">
                                                  <img alt="" srcSet="/assets/icons/select_sign.svg" />
                                              </div>
                                              <div className="col-10 subscription_desc_row">
                                                  View 15 companies financial reports per month.
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-2">
                                                  <img alt="" srcSet="/assets/icons/select_sign.svg" />
                                              </div>
                                              <div className="col-10 subscription_desc_row">
                                                  Access news on 700+ traded equities in the GCC countries (KSA, UAE, Kuwait, Bahrain, Qatar & Oman).
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-2">
                                                  <img alt="" srcSet="/assets/icons/select_sign.svg" />
                                              </div>
                                              <div className="col-10 subscription_desc_row">
                                                  Share, Discuss, Engage financial knowledge and business thoughts in our fourm.
                                              </div>
                                          </div>
                                         
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col subscribebtndiv">
                                      {(Subscription_type==="Monthly")?
                                            ""
                                            :((checkout === true) 
                                                ? (<div className="payment-div">
                                                    <Paymentgateway setCheckout={setCheckout} setSubscription_type={setSubscription_type} plansExpiryDate={ThreeMonthlyPlanEDate} pleaseSubscribeMe={pleaseSubscribeMe} CheckoutAmount={CheckoutAmount} />
                                                </div> 
                                                )
                                                :<button onClick={()=>handelcheckout(349)} className="subscribe_btn">Subscribe</button>
                                                )} 
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="col-md-4 subscription_modal_main_boxs">
                              <div className="subscription_modal_box">
                                  <div className="row">
                                      <div className="col">
                                          <span className="subscription_subtitle">Yearly (45% Discount)</span>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col">
                                          <h6 className="subscription_pricetitle">INR 2349/ Yearly</h6>
                                      </div>
                                  </div>
                                  <div className="row subscription_desc_box">
                                      <div className="col">
                                          <div className="row">
                                              <div className="col-2">
                                                  <img alt="" srcSet="/assets/icons/select_sign.svg" />
                                              </div>
                                              <div className="col-10 subscription_desc_row">
                                                  Unlimited browsing of financial reports per month.
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-2">
                                                  <img alt="" srcSet="/assets/icons/select_sign.svg" />
                                              </div>
                                              <div className="col-10 subscription_desc_row">
                                                  Access news on 700+ traded equities in the GCC countries (KSA, UAE, Kuwait, Bahrain, Qatar & Oman).
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-2">
                                                  <img alt="" srcSet="/assets/icons/select_sign.svg" />
                                              </div>
                                              <div className="col-10 subscription_desc_row">
                                                  Share, Discuss, Engage financial knowledge and business thoughts in our fourm.
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-2">
                                                  <img alt="" srcSet="/assets/icons/select_sign.svg" />
                                              </div>
                                              <div className="col-10 subscription_desc_row">
                                                  Annual Subscription(pay In Advance)
                                              </div>
                                          </div>
                                          
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col">
                                      {(Subscription_type==="Yearly")?
                                            ""
                                            :((checkout === true) 
                                                ? (
                                                    <Paymentgateway setCheckout={setCheckout} setSubscription_type={setSubscription_type} plansExpiryDate={YearlyPlanEDate} pleaseSubscribeMe={pleaseSubscribeMe} CheckoutAmount={CheckoutAmount} />
                                               
                                                )
                                                :<button onClick={()=>handelcheckout(2349)} className="subscribe_btn">Subscribe</button>
                                                )} 
                                      </div>
                                  </div>
                              </div>
                          </div>

                      </div>
                     
                  </div>
              </div>
          </div>
      </div>
  </>;
}

export default Subscriptionpopup;
