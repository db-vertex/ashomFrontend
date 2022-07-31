import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { Card, TextField, Checkbox, Button } from '@mui/material';
import OTPInput, { ResendOTP } from "otp-input-react";
import { verifyOtp, resendOTP } from '../API/Userapis';
import Backbutton from '../components/Backbutton';
import { useNavigate } from 'react-router-dom';
import { saveUserToken } from '../API/LocalStore';
import { GAEvenet } from '../API/GoogleAnalytics';

const Otpscreen = () => {
    
    const navigate = useNavigate();
    const [errorMessage, seterrorMessage] = useState('');
    const Email = sessionStorage.getItem("email_for_otp");
    const mobileForVerify = sessionStorage.getItem("mobile_for_otp");
    const countryCode = sessionStorage.getItem("countrycode_for_otp");
    const [successMessage, setsuccessMessage] = useState('');
    const [OTP, setOTP] = useState();
    const [otp_err, setotp_err] = useState('');

  

    useEffect(() => {
        window.scrollTo(0, 0);
        GAEvenet();
    }, []);

    function clearMessage(){
        setsuccessMessage('');
        seterrorMessage('');
    }

    function otpHandler(event){
        event.preventDefault();
        clearMessage();
        verifyOtp(mobileForVerify, OTP).then((meta) => {
            if(meta.status){
                sessionStorage.removeItem("mobile_for_otp");
                sessionStorage.removeItem("email_for_otp");
                sessionStorage.removeItem("countrycode_for_otp");
                setsuccessMessage("OTP Verified Successfully.");
                window.sessionStorage.setItem('firsttimeuser', true);
                saveUserToken(meta.token);
                window.location.href  = "/home";
            }
            else{
                seterrorMessage(meta.message);
            }
        }); 
    }

    function resendsOTP(){
        clearMessage();
        resendOTP(mobileForVerify).then((meta) => {
            if(meta.status){
                setsuccessMessage("OTP Resended Successfully.");
            }
            else{
                let error = meta.response.data;
                seterrorMessage(error.message);
            }
        });     
    }

    return (
        <div>
           
        <section className='authPage_section native_background'>
        <Backbutton />
        <div className='container-fluid'>
            <div className='container'>
                <div className="row auto_page_row">
                    <div className="col-md-2 col-sm-2 offset-md-5 offset-sm-5 d-flex justify-content-center">
                        <img alt="Ashom Logo" style={{"width":"80px"}} srcSet="/assets/icons/launch_Logo.png" />
                    </div>
                </div>
               <div className='row'>
                    <Card  variant="outlined" className="col-md-4 col-sm-8 offset-md-4 offset-sm-2 section_divider authPage_form_div">
                        <div className="mainheading_div" style={{"height": "40px"}}>
                        <h1 className="auth_welcome_text">OTP Verfication</h1>
                        </div>
                        <div className='otp_page_dis_message'>
                            <span>Enter the OTP sent to your mobile number <span className="otpscreen_highlight_txt">+{countryCode+''+mobileForVerify}</span> and <span className="otpscreen_highlight_txt">{Email}</span></span>
                        </div>
                        <form onSubmit={otpHandler} method='post' noValidate>
                        <div className='form-group mt-5'>
                          <div className="col-md-12">
                            <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} 
                             />
                            <span className="input_err">{otp_err}</span>
                          </div>
                        </div>
                        <div className='form-group loginbtn_div otpscreen_btn'>
                                <button type='submit' className='loginbtn'>VERIFY</button>
                        </div>
                        <div className='form-group dont_recieve_otp_div'>
                             <span className='dont_recieve_otp_text'>Don't receive OTP? <span className="maybe_highlit"><Button style={{"color":"red"}} onClick={()=>resendsOTP()}>Resend OTP</Button></span></span>
                        </div>
                        </form>
                        </Card>
                    {/* </div> */}
                </div>
                <div className='row'>
                    <div className='col-md-4 offset-md-4'>
                    <Alert className={(errorMessage!='')?'':'d-none'} severity="error">{errorMessage}</Alert>
                    <Alert className={(successMessage!='')?'':'d-none'} severity="success">{successMessage}</Alert>
                    </div>
                </div>

            </div>
          </div>
        </section>
    </div>
    );
}

export default Otpscreen;
