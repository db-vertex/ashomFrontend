import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import {Card, TextField, Checkbox, Button, Avatar } from '@mui/material';
import {requestChangePassword } from '../API/Userapis';
import Backbutton from '../components/Backbutton';
import { NavLink, useNavigate } from 'react-router-dom';
import { GAEvenet } from '../API/GoogleAnalytics';

const Changepassword = () => {
    const navigate = useNavigate(); 
    const [errorMessage, seterrorMessage] = useState('');
    const [successMessage, setsuccessMessage] = useState('');
    const [OldPassword, setOldPassword] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [OldPasswordErr, setOldPasswordErr] = useState('');
    const [NewPasswordErr, setNewPasswordErr] = useState('');
    const [ConfirmPasswordErr, setConfirmPasswordErr] = useState('');
    
    useEffect(() =>{
        GAEvenet();
        window.scrollTo(0, 0);
    }, []);
    
    function clearMessages(){
        setsuccessMessage('');
        seterrorMessage('')
        setOldPasswordErr('');
        setConfirmPasswordErr('')
        setNewPasswordErr('')
    }

    const changePasswordHandler = (event) =>{
        event.preventDefault();
        clearMessages();
        if(OldPassword!=''){
            if(NewPassword!=''){
                if(ConfirmPassword!=''){
                    if(ConfirmPassword!=NewPassword){
                        setConfirmPasswordErr("Confirm password doesn\'t matched with new password.")
                    }
                    else{
                        requestChangePassword(OldPassword, NewPassword, ConfirmPassword).then(meta => {
                            if (meta.response) {
                                let error = meta.response.data;
                                if (error.token_error)
                                    seterrorMessage(error.token_error)
                            }
                            else{
                                setsuccessMessage(meta.data.message)
                            }
                        });    
                        
                    }
                }
                else{
                    setConfirmPasswordErr('Please Enter Confirm Password.')
                }
            }
            else{
                setNewPasswordErr("Please Enter New Password.")
            }
        }
        else{
            setOldPasswordErr("Please Enter Old Password.")
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
                        <Card  variant="outlined" className="col-md-4 col-sm-8 offset-md-4 offset-sm-2 section_divider authPage_form_div">
                        <div className="row">
                            <div className="col-md-12">
                            <div className="mainheading_div ">
                            <h1 className="auth_welcome_text">Change Password</h1>
                            </div>
                            </div>
                        </div>
                            <form onSubmit={changePasswordHandler} method='post' noValidate>
                            <div className='form-group mt-1'>
                              <div className="col-md-12">
                                    <TextField
                                        id="old_password" 
                                        value={OldPassword} 
                                        onChange={e => setOldPassword(e.target.value)}
                                        label="Old Password"
                                        type="password"
                                        autoComplete="off"
                                        autoFocus="true"
                                        variant="standard"
                                        className="w-100 email_input"
                                    />
                                <span className="input_err">{OldPasswordErr}</span>
                              </div>
                            </div>
                            <div className='form-group'>
                              <div className="col-md-12">
                                    <TextField
                                        id="new_password" 
                                        value={NewPassword} 
                                        onChange={e => setNewPassword(e.target.value)}
                                        label="New Password"
                                        type="password"
                                        autoComplete="off"
                                        variant="standard"
                                        className="w-100 email_input"
                                    />
                                <span className="input_err">{NewPasswordErr}</span>
                              </div>
                            </div>
                            <div className='form-group'>
                              <div className="col-md-12">
                                    <TextField
                                        id="confirm_password" 
                                        value={ConfirmPassword} 
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        label="Confirm Password"
                                        type="password"
                                        autoComplete="off"
                                        variant="standard"
                                        className="w-100 email_input"
                                    />
                                <span className="input_err">{ConfirmPasswordErr}</span>
                              </div>
                            </div>
                            <div className='form-group loginbtn_div otpscreen_btn'>
                                    <button type='submit' className='loginbtn'>CONTINUE</button>
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
export default Changepassword;
