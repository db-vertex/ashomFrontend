import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { Card, TextField, Avatar } from '@mui/material';
import Backbutton from '../components/Backbutton';
import { getUserdata, requestContactUs } from '../API/Userapis';
import { useDispatch } from 'react-redux';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import PhoneInput from 'react-phone-input-2';
import {NavLink, useNavigate} from "react-router-dom";
import { GAEvenet } from '../API/GoogleAnalytics';

const Contactus = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [errorMessage, seterrorMessage] = useState('');
    const [successMessage, setsuccessMessage] = useState('');
    const [Email, setEmail] = useState('');
    const [Email_err, setEmail_err] = useState('');
    const [Full_name, setFull_name] = useState('');
    const [Full_name_err, setFull_name_err] = useState('');
    const [Subject, setSubject] = useState('');
    const [Subject_err, setSubject_err] = useState('');
    const [Message, setMessage] = useState('');
    const [Message_err, setMessage_err] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Mobile_err, setMobile_err] = useState('');
    const [Profile_pic, setProfile_pic] = useState('');
    const [CountryCode, setCountryCode] = useState(0);

    const validateEmail = (email) =>
        email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    useEffect(() => {
        dispatch(setheadermenuData({currentpath:'/contact_us', headerfootershow:false}));
        GAEvenet();
    }, []);
    
    function cleaAlerts(){
        setEmail_err("");
        setFull_name_err("");
        setSubject_err("");
        setMessage_err("");
        setMobile_err("");
        setsuccessMessage("");
        seterrorMessage("");
    }

    const form_handle = (e) => {
        e.preventDefault();
        cleaAlerts();
        let isValidate = true;
        if(Email==""){
            setEmail_err("Please enter email.")
            isValidate=false;
        }
        else{
            if(validateEmail(Email)){
                setEmail_err("");
            }
            else{    
                setEmail_err("Please enter valid email.");
                isValidate=false;
            }
        }
         
        if(Full_name==""){
            setFull_name_err("Please enter your full name.");
            isValidate=false;
        }

        if(Subject==""){
            setSubject_err("Please enter subject.");
            isValidate=false;
        }

        if(Message===""){
            setMessage_err("Please enter message.");
            isValidate=false;
        }

        if(Mobile===""){
            setMobile_err("Please enter mobile no.");
            isValidate=false;
        }
        if(isValidate){
            requestContactUs(Email, Full_name, Subject, Message, ("+"+CountryCode.dialCode+Mobile)).then(meta =>{
                if(meta.status){
                    setsuccessMessage(meta.message);
                    setEmail("");
                    setFull_name("");
                    setMessage("");
                    setMobile("");
                    setSubject("");
                }
                else{
                    seterrorMessage(meta.message);
                }
            })
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
                                <NavLink to="/"><img alt="Ashom Logo" onClick={()=>navigate('/')} style={{"width":"60px"}} srcSet="/assets/icons/launch_Logo.png" /></NavLink>
                            </div>
                        </div>
                        <div className='row'>
                            <Card variant="outlined" className="col-md-4 col-sm-8 offset-md-4 offset-sm-2 section_divider authPage_form_div">
                                <div className="row" style={{"height":"50px"}}>
                                    <div className="col-md-12">
                                        <div className="mainheading_div " style={{ "height": "24px" }}>
                                            <h1 className="auth_welcome_text">Contact Us</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='row' style={{"height":"20px"}}>
                                    <div className='col-md-12'>
                                        <Alert className={(errorMessage != '') ? '' : 'd-none'} severity="error">{errorMessage}</Alert>
                                        <Alert className={(successMessage != '') ? '' : 'd-none'} severity="success">{successMessage}</Alert>
                                    </div>
                                </div>
                                <form onSubmit={form_handle} method='post' noValidate>
                                    <div className='form-group mt-5'>
                                        <div className="col-md-12">
                                            <TextField
                                                id="full_name"
                                                value={Full_name}
                                                onChange={e => setFull_name(e.target.value)}
                                                label="Full Name"
                                                type="text"
                                                autoComplete="off"
                                                autoFocus={true}
                                                variant="standard"
                                                className="w-100 email_input"
                                            />
                                            <span className="input_err">{Full_name_err}</span>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div className="col-md-12">
                                            <TextField
                                                id="last_name"
                                                value={Email}
                                                onChange={e => setEmail(e.target.value)}
                                                label="Email"
                                                type="text"
                                                autoComplete="off"
                                                variant="standard"
                                                className="w-100 email_input"
                                            />
                                            <span className="input_err">{Email_err}</span>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div className="col-md-12">
                                        <label className='form_label_txt'>Mobile</label>
                                            <PhoneInput
                                                className="b-none"
                                                country={'ae'}
                                                value={Mobile}
                                                style={{'width':'100%', 'border': 'none', 'borderBottom': '1px solid grey'}}
                                                countryCodeEditable={false}
                                                onChange={(phone, country) => {setCountryCode(country); setMobile(phone); }}
                                                />
                                            <span className="input_err">{Mobile_err}</span>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div className="col-md-12">
                                            <TextField
                                                id="subject"
                                                value={Subject}
                                                onChange={e => setSubject(e.target.value)}
                                                label="Subject"
                                                type="text"
                                                autoComplete="off"
                                                variant="standard"
                                                className="w-100 email_input"
                                            />
                                            <span className="input_err">{Subject_err}</span>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div className="col-md-12">
                                            <TextField
                                                id="message"
                                                value={Message}
                                                onChange={e => setMessage(e.target.value)}
                                                label="Message"
                                                type="text"
                                                autoComplete="off"
                                                variant="standard"
                                                className="w-100 email_input"
                                            />
                                            <span className="input_err">{Message_err}</span>
                                        </div>
                                    </div>
                                    <div className='form-group loginbtn_div otpscreen_btn'>
                                        <button type='submit' className='loginbtn'>CONTINUE</button>
                                    </div>

                                </form>
                            </Card>
                            {/* </div> */}
                        </div>
                        

                    </div>
                </div>
            </section>
        </div>
    );
}
export default Contactus;
