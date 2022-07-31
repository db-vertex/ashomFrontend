import React, { useState, useEffect } from 'react';
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2';
import {Link, matchPath} from "react-router-dom";
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { Card, TextField } from '@mui/material';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import Backbutton from '../components/Backbutton';
import { useNavigate } from 'react-router-dom';
import { getLikedUserEmail, getLikedUserName, getLinkedinAccessToken, getUserdataByToken, signupAPI } from '../API/Userapis';
import { getUserToken, saveUserToken } from '../API/LocalStore';
import LinkedIn from "linkedin-login-for-react";
import { useDispatch } from 'react-redux';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import { GAEvenet } from '../API/GoogleAnalytics';

const SignUpPage = (props) => {

    const navigate = useNavigate();
    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
    const [countryCode, setcountryCode] = useState('');

    const [firstname_err, setfirstname_err] = useState('');
    const [lastname_err, setlastname_err] = useState('');
    const [email_err, setemail_err] = useState('');
    const [phone_err, setphone_err] = useState('');
    const [mobile, setmobile] = useState('');//With Country Code
    const [password_err, setpassword_err] = useState('');
    const [login_type, setlogin_type] = useState('normal');
    const [social_id, setsocial_id] = useState('');

    const [errorMessage, seterrorMessage] = useState('');
    const [successMessage, setsuccessMessage] = useState('');
    const [isGoogleSignUp, setisGoogleSignUp] = useState(false);

    const dispatch = useDispatch();
    
    useEffect(() => {
        GAEvenet();
        dispatch(setheadermenuData({currentpath:'/signup', headerfootershow:false}));
    }, []);

    const validateEmail = (email) =>
         email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    const clearAlerts = () =>{
        seterrorMessage("");
        setsuccessMessage("");
    }    
    const submitHandler = (e) =>{
        e.preventDefault();
        clearAlerts();
        let validate=true;
        if((first_name=="")||(typeof first_name == 'undefined')){
            validate=false;
            setfirstname_err('Please enter first name.');
        }
        else{
            setfirstname_err("");
        }

        if((last_name=="")||(typeof last_name == 'undefined')){
            validate=false;
            setlastname_err('Please enter last name.');
        }
        else{
            setlastname_err('');
        }

        if((phone=="")||(typeof phone == 'undefined')){
            validate=false;
            setphone_err('Please enter phone number.')
        }
        else{
            setphone_err('')
        }

        if((email=="")||(typeof email == 'undefined')){
            validate=false;
            setemail_err('Please enter email.')
        }
        else{
            if(validateEmail(email)){
            setemail_err('')
            
            }
            else{
            setemail_err('Please enter valid email.');
            validate=false;
            }
        }

        if(login_type=='normal')
        if((password=="")||(typeof password == 'undefined')){
            validate=false;
            setpassword_err('Please enter password.')
        }
        else{
            setpassword_err('')
        }
        if(validate){
            signupAPI(first_name, last_name, countryCode, email, password, login_type, phone, social_id).then(meta=>{
                if(meta.status){
                    sessionStorage.setItem("mobile_for_otp", phone);  
                    sessionStorage.setItem("email_for_otp", email);
                    sessionStorage.setItem("countrycode_for_otp", countryCode);
                    navigate('/otp');
                }
                else{
                    if(meta.first_name_error  != null){
                        setfirstname_err(meta.first_name_error);
                        setlastname_err(meta.last_name_error);
                        setpassword_err(meta.password_error);
                        setphone_err(meta.mobile_error);
                        setemail_err((meta.email_error)?"This email is already registered.":"");
                    }
                    seterrorMessage("Sign-up request failed. Please check all entries.");
                }
            })
        }
    }

    const googleLogin = (response) => {
        if(response.error){
            setsuccessMessage('');
            if(response.error=='popup_closed_by_user')
            seterrorMessage("Google login failed, popup closed by yours.");
            return false;
        }
        setsuccessMessage('');
        if(response.Ba === null)
        seterrorMessage('Google Login Failed : '+JSON.stringify(response));
        else{
            getUserdataByToken(response.googleId).then(meta => {
                if(meta.status){
                    seterrorMessage('');
                    setsuccessMessage('Yeh ! Google Login Succeess');
                    saveUserToken( response.googleId, true);
                    props.setIsUserLogin(true);
                    navigate('/home');
                    
                }
                else{
                    let profile = response.profileObj;
                    signupAPI(profile.givenName, profile.familyName, "", profile.email, "", "google", "", response.googleId, profile.imageUrl).then(meta=>{
                        if(meta.status){
                             window.sessionStorage.setItem('firsttimeuser', true);
                             saveUserToken(response.googleId);
                             //navigate('/home');navigate('/home');
                        }
                        else{
                            if(meta.first_name_error  != null){
                                seterrorMessage(meta.mobile_error);
                                seterrorMessage((meta.email_error)?"This email is already registered with other login type.":"");
                            }
                            if(meta.first_name_error  == null){
                                seterrorMessage(meta.message);
                            }
                        }
                    });
                }
            })
            
        }
      }
 


    const googleLoginFailure = (response) => {
        clearAlerts();
        if(response.googleId!==undefined){
            getUserdataByToken(response.googleId).then(meta => {
                if(!meta.status){
                    let profile = response.profileObj;
                    signupAPI(profile.givenName, profile.familyName, "", profile.email, "", "google", "", response.googleId, profile.imageUrl).then(meta=>{
                        if(meta.status){
                             saveUserToken(response.googleId);
                             navigate('/home');
                        }
                        else{
                            if(meta.first_name_error  != null){
                                seterrorMessage(meta.first_name_error);
                                seterrorMessage(meta.last_name_error);
                                seterrorMessage(meta.password_error);
                                seterrorMessage(meta.mobile_error);
                                seterrorMessage((meta.email_error)?"This email is already registered.":"");
                            }
                        }
                    }); 
                }
                else{
                    seterrorMessage("This email is already present in our database. Please Login In.")
                }
            });
           
        } 
 
    }

    const googleLoginSuccess = (response) => {
        clearAlerts();
        let profile = response.profileObj;
        signupAPI(profile.givenName, profile.familyName, "", profile.email, "", "google", "", response.googleId, profile.imageUrl).then(meta=>{
            if(meta.status){
                 saveUserToken(response.googleId);
                 navigate('/home');
            }
            else{
                if(meta.first_name_error  != null){
                    seterrorMessage(meta.mobile_error);
                    seterrorMessage((meta.email_error)?"This email is already registered with other login type.":"");
                }
            }
        });
    } 
    
    const callbackLinkedIn = (error, code, redirectUri) => {
        setsuccessMessage("Processing Linkedin...");
        if (error) {
        } else {
            getLinkedinAccessToken(code, redirectUri).then(meta=>{
                clearAlerts();
                var linkedindata = meta;
                if(meta.email!==undefined){
                    getUserdataByToken(linkedindata.userdata.id).then(meta => {
                        if(!meta.status){
                            let profile = linkedindata.userdata;
                            signupAPI(profile.localizedFirstName, profile.localizedLastName, "", linkedindata.email, "", "linkedin", "", profile.id, "").then(meta=>{
                                if(meta.status){
                                     saveUserToken(profile.id);
                                     navigate('/home');
                                }
                                else{
                                    if(meta.first_name_error  != null){
                                       seterrorMessage(meta.mobile_error);
                                       seterrorMessage((meta.email_error)?"This email is already registered with other login type.":"");
                                    }
                                }
                            }); 
                        }
                        else{
                            saveUserToken(linkedindata.userdata.id);
                            navigate('/home');
                        }
                    });
                } 
            })
        }
      };
    const user = getUserToken(); 
    return (
        <div>
           
            <section className='authPage_section section_divider'>
            <Backbutton />
            <div className='container-fluid'>
                <div className='container'>
                <div className="row auto_page_row">
                        <div className="col-md-2 col-sm-2 offset-md-5 offset-sm-5 d-flex justify-content-center">
                            <img alt="Ashom Logo" style={{"width":"60px"}} srcSet="/assets/icons/launch_Logo.png" />
                        </div>
                    </div>
                    <div className='row'>
                    <Card variant="outlined" className="col-md-4 offset-md-4 section_divider authPage_form_div">
                        <div className="mainheading_div ">
                            <h1 className="auth_welcome_text">Welcome</h1>
                            <h3 className="auth_to_ashom_text">to Ashom.app</h3>
                        </div>
                        <form onSubmit={submitHandler} noValidate>
                            <div className='form-group'>
                                <TextField
                                        id="login_firstname_input"
                                        autoFocus="true"
                                        className='full_input w-100 email_input' 
                                        value={first_name} 
                                        name='first_name'
                                        onChange={e =>setfirst_name(e.target.value)}
                                        label="First Name"
                                        disabled={(isGoogleSignUp)?true:false}
                                        type="text"
                                        autoComplete="current-password"
                                        variant="standard"
                                        />
                                <span id="first_name_err" className="input_err">{firstname_err}</span>
                            </div>
                            <div className={'form-group'}>
                                    <TextField
                                        id="login_firstname_input"
                                        className='lastname_input w-100 email_input' 
                                        value={last_name} 
                                        name='last_name'
                                        onChange={e => setlast_name(e.target.value)}
                                        label="Last Name"
                                        type="text"
                                        disabled={(isGoogleSignUp)?true:false}
                                        autoComplete="current-password"
                                        variant="standard"
                                    />
                                <span id="last_name_err" className="input_err">{lastname_err}</span>
                            </div> 
                            <div className={'form-group'}>
                                <label className='form_label_txt'>Mobile</label>
                                <PhoneInput
                                    className="b-none"
                                    country={'ae'}
                                    value={mobile}
                                    style={{'width':'100%', 'border': 'none', 'borderBottom': '1px solid grey'}}
                                    countryCodeEditable={false}
                                    onChange={(phone, country) => {setcountryCode(country.dialCode); setmobile(phone); setphone(phone.slice((country.dialCode).length));}}
                                    />
                                    <span id="phone_err" className="input_err">{phone_err}</span>
                            </div>
                            <div className={'form-group'}>
                                <TextField
                                        id="login_email_input"
                                        className='email_input w-100 email_input' 
                                        value={email} 
                                        name='email'
                                        onChange={e => setemail(e.target.value)} 
                                        noValidate
                                        label="Email"
                                        type="text"
                                        disabled={(isGoogleSignUp)?true:false}
                                        autoComplete="current-password"
                                        variant="standard"
                                    />
                                <span id="email_err" className="input_err">{email_err}</span>
                            </div>
                            <div className={((!isGoogleSignUp))?'form-group':'form-group d-none'}>
                                <TextField
                                        id="login_password_input"
                                        className='password_input w-100 email_input' 
                                        value={password} 
                                        name='password'
                                        onChange={e => setpassword(e.target.value)} 
                                        label="Password"
                                        type="Password"
                                        disabled={(isGoogleSignUp)?true:false}
                                        autoComplete="current-password"
                                        variant="standard"
                                    />
                                <span id="password_err" className="input_err">{password_err}</span>
                            </div>
                      
                            <div className='form-group loginbtn_div'>
                                <button type='submit' className='loginbtn'>SIGN UP</button>
                            </div>
                            </form>
                        </Card>
                    </div>
                    <div className='row'>
                        <div className='col-md-4 offset-md-4'>
                        <Alert className={(errorMessage!='')?'':'d-none'} severity="error">{errorMessage}</Alert>
                        <Alert className={(successMessage!='')?'':'d-none'} severity="success">{successMessage}</Alert>
                        </div>
                    </div>
                    <div className='row dont_have_account_row'>
                        <div className='col-md-12 dont_have_account_txt_div'>
                            <div className='form-group dont_have_account_txt'>
                                 Have an account? <Link to="/login">LOGIN</Link>
                            </div>
                            </div>
                            <div className="col-md-6 offset-md-3 d-flex justify-content-center">
                        <GoogleLogin
                        clientId="781793150436-o5eib4cgrh8m7lv19ldq86nbkkk89nvd.apps.googleusercontent.com"
                        buttonText="Login to Ashom with Google"
                        onSuccess={googleLogin}
                        render={renderProps => <img className='google_round_logo'  onClick={renderProps.onClick} disabled={renderProps.disabled} alt="" srcSet="/assets/icons/google_round_logo.png" />}
                        onFailure={googleLogin}
                        cookiePolicy={'single_host_origin'}
                        />
                        <LinkedIn
                                clientId="78ofvholrg325a"
                                callback={callbackLinkedIn}
                                className='google_round_logo linked_round_logo ml-3'
                                scope={["r_liteprofile","r_emailaddress"]}
                                text=""
                            />
                        </div>
                    </div>
                </div>
              </div>
            </section>
        </div>
    );
}

export default SignUpPage;
