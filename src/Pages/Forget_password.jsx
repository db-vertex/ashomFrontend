import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import {Card, TextField} from '@mui/material';
import Backbutton from '../components/Backbutton';
import {requestForgotPassword } from '../API/Userapis';
import { useDispatch } from 'react-redux';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import { GAEvenet } from '../API/GoogleAnalytics';

const Forgetpassword = () => {

    const [errorMessage, seterrorMessage] = useState('');
    const [successMessage, setsuccessMessage] = useState('');
    const [Email, setEmail] = useState('');
    const [Email_err, setEmail_err] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(setheadermenuData({currentpath:'/signup', headerfootershow:false}));
        GAEvenet();
    }, []);
    
    const clearAlerts = () =>{
        seterrorMessage("");
        setsuccessMessage("");
    }

    const validateEmail = (email) =>
        email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    const form_handle = (e) => {
    e.preventDefault();
    clearAlerts();
    if((Email=="")||(typeof Email == 'undefined')){
        setEmail_err('Please enter email.')
    }
    else{
        if(validateEmail(Email)){
        setEmail_err('')
        requestForgotPassword(Email).then(meta =>{
            if(meta.email_error!==undefined){
                seterrorMessage(meta.email_error)
            }

            if(meta.status){
                setEmail("");
                setsuccessMessage(meta.message)
            }
        })
        }
        else{
        setEmail_err('Please enter valid email.');
        }
    }

  }
    return (
        <div>
        <section className='authPage_section native_background'>
        <Backbutton />  
        <div className='container-fluid'>
            <div className='container'>
                <div className="row auto_page_row">
                    <div className="col-md-2 col-sm-2 offset-md-5 offset-sm-5 d-flex justify-content-center">
                       <img alt="Ashom Logo" style={{"width":"60px"}} srcSet="/assets/icons/launch_Logo.png" />
                    </div>
                </div>
               <div className='row'>
                    <Card  variant="outlined" className="col-md-4 col-sm-8 offset-md-4 offset-sm-2 section_divider authPage_form_div">
                    <div className="mainheading_div">
                            <h1 className="" style={{"textAlign": "center", "fontSize": "28px"}}>Forgot Password </h1>
                            <h3 className="" style={{"textAlign": "center", "color": "#BABABA", "fontSize": "16px", "marginTop": "22px"}}>Please enter your registered email</h3>
                    </div>
                       <form onSubmit={form_handle} method='post' noValidate>
                        <div className='form-group mt-5'>
                          <div className="col-md-12">
                                <TextField
                                    id="email" 
                                    value={Email} 
                                    onChange={e => setEmail(e.target.value)}
                                    label="Email"
                                    type="text"
                                    autoComplete="off"
                                    autoFocus={true}
                                    variant="standard"
                                    className="w-100 email_input"
                                />
                            <span className="input_err">{Email_err}</span>
                          </div>
                        </div>
                       
                        <div className='form-group loginbtn_div otpscreen_btn'>
                                <button type='submit' className='loginbtn'>FORGOT PASSWORD</button>
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
export default Forgetpassword;
