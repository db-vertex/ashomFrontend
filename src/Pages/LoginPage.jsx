import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { Card, TextField, Checkbox } from '@mui/material';
import {base_url, getLinkedinAccessToken, getUserdataByToken, resendOTP, signupAPI} from '../API/Userapis';
import { useNavigate } from 'react-router-dom';
import { getUserToken, saveUserToken } from '../API/LocalStore';
import LinkedIn from "linkedin-login-for-react";
import { useDispatch } from 'react-redux';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import { GAEvenet } from '../API/GoogleAnalytics';

const Loginpage = (props) => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [email_err, setemail_err] = useState('');
    const [password_err, setpassword_err] = useState('');
    const [errorMessage, seterrorMessage] = useState('');
    const [successMessage, setsuccessMessage] = useState('');
    const [RememberMe, setRememberMe] = useState(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }  

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(setheadermenuData({currentpath:'/signup', headerfootershow:false}));
        GAEvenet();
        let rememberMe_email = localStorage.getItem('rememberme_email');
        let rememberMe_password = localStorage.getItem('rememberme_password');
        if(rememberMe_email)
            setemail(rememberMe_email);
        if(rememberMe_password)
            setpassword(rememberMe_password);
        if(rememberMe_email)    
            setRememberMe(true);
    }, []);
    
    const validateEmail = (email) =>
        email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
        
    function remberChange(){
        setRememberMe(RememberMe?false:true);
    }

    function loginformhandler(e){
        e.preventDefault();
        seterrorMessage('');
        setsuccessMessage('');
        let validate=true;

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

        if((password=="")||(typeof password == 'undefined')){
            validate=false;
            setpassword_err('Please enter password.')
        }
        else{
            setpassword_err('')
        }

        var bodyFormData = new FormData();
            bodyFormData.append('email', email);
            bodyFormData.append('password', password);

    if(validate){    
        axios({
            method: "post",
            url: base_url+"api/webservice/login",
            data: bodyFormData,
            headers: { "Content-Type": "application/json" },
          })
            .then(function (response) {
              seterrorMessage('');
              setsuccessMessage(response.data.message);
              if(RememberMe){
              localStorage.setItem('rememberme_email', email);
              localStorage.setItem('rememberme_password', password);
              }
              else{
                localStorage.removeItem('rememberme_email');
                localStorage.removeItem('rememberme_password');
              }
              saveUserToken(response.data.token, RememberMe);
              props.setIsUserLogin(true);
            //   window.location.reload();
              navigate('/home');
            })
            .catch(function (error) {
                seterrorMessage('');
                setsuccessMessage('');  
              error = error.response.data;
              if(error.login_error  != null){
                setemail_err(error.email_error);
                setpassword_err(error.password_error);
                seterrorMessage(error.login_error);
              }
              else if(error.message != null){
                if(error.otp_verfied === undefined){
                    seterrorMessage(error.message);
                }    
              }
              else
              seterrorMessage("Log-in request failed. Please check all entries.");

              if(error.otp_verfied != null){
                 resendOTP(error.mobile).then(()=>{
                     sessionStorage.setItem("mobile_for_otp", error.mobile);  
                     sessionStorage.setItem("email_for_otp", email);
                     sessionStorage.setItem("countrycode_for_otp", error.country_code);
                     navigate('/otp');
                 })   
              }
            });
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
                    saveUserToken( response.googleId, RememberMe);
                    props.setIsUserLogin(true);
                    navigate('/home');
                    
                }
                else{
                    let profile = response.profileObj;
                    signupAPI(profile.givenName, profile.familyName, "", profile.email, "", "google", "", response.googleId, profile.imageUrl).then(meta=>{
                        if(meta.status){
                            window.sessionStorage.setItem('firsttimeuser', true);
                            saveUserToken(response.googleId);
                            navigate('/home');
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


    const callbackLinkedIn = (error, code, redirectUri) => {
        setsuccessMessage("Logging Linkeding...");
        if (error) {
        } else {
            getLinkedinAccessToken(code, redirectUri).then(meta=>{
                var linkedindata = meta;
                if(meta.email!==undefined){
                    getUserdataByToken(linkedindata.userdata.id).then(meta => {
                        if(!meta.status){
                            let profile = linkedindata.userdata;
                            signupAPI(profile.localizedFirstName, profile.localizedLastName, "", linkedindata.email, "", "linkedin", "", profile.id, "").then(meta=>{
                                seterrorMessage('');
                                setsuccessMessage('');  
                                if(meta.status){
                                     saveUserToken(profile.id);
                                     navigate('/home');
                                }
                                else{
                                    if(meta.first_name_error  != null){
                                       seterrorMessage(meta.mobile_error);
                                       seterrorMessage((meta.email_error)?"This email is registered with other login type.":"");
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
           
            <section className='authPage_section native_background'>
            {/* <Backbutton /> */}
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
                            <h1 className="auth_welcome_text">Welcome</h1>
                            <h3 className="auth_to_ashom_text">to Ashom.app</h3>
                            <h1 className="loginTitle">Financial reports | GCC stock Exchanges | Analysis | financial News</h1>
                            </div>
                            <form onSubmit={loginformhandler} method='post' noValidate>
                            <div className={'form-group'}>
                                    <TextField
                                        id="Email" 
                                        value={email} 
                                        onChange={e => setemail(e.target.value)}
                                        label="Email"
                                        type="Email"
                                        autoComplete="off"
                                        autoFocus={true}
                                        variant="standard"
                                        className="w-100 email_input"
                                    />
                                <span className="input_err">{email_err}</span>
                            </div>
                            <div className={'form-group'}>
                                    <TextField
                                        id="login_password_input" 
                                        type="password"
                                        label="Password"
                                        onChange={e => setpassword(e.target.value)} 
                                        value={password}
                                        autoComplete="off"
                                        variant="standard"
                                        className="w-100 password_input"
                                    />
                                <span className="input_err">{password_err}</span>
                            </div>
                            <div className={'form-group'}>
                            <Checkbox {...label} checked={RememberMe} id="remember_me_text" onChange={()=>remberChange()} /><label htmlFor="remember_me_text"> Remember Me</label>
                            </div>
                        
                            <div className='form-group loginbtn_div'>
                                <button type='submit' className='loginbtn'>Log In</button>
                            </div>
                            <div className="form-group">
                            <Link to='/forgot_password' className='form_label_rember_txt label-link float-left'>Forgot Password?</Link>
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
                        <div className='row dont_have_account_row'>
                        <div className='col-md-12 dont_have_account_txt_div'>
                            <div className='form-group dont_have_account_txt'>
                                Don't have account? <Link to="/signup">SIGN UP</Link>
                            </div>
                        </div>
                   
                        <div className="col-md-6 offset-md-3 d-flex justify-content-center">
                        <GoogleLogin
                            clientId="781793150436-dknhpd8ettnm41haenc36inc7fv6prr2.apps.googleusercontent.com"
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

export default Loginpage;
