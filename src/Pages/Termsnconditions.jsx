import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import Backbutton from '../components/Backbutton';
import { getTermsncondition } from '../API/Userapis';
import { useDispatch } from 'react-redux';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import {NavLink, useNavigate} from "react-router-dom";
import { GAEvenet } from '../API/GoogleAnalytics';

const Termsncondition = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const [Termsncondition, setTermsncondition] = useState('');
  useEffect(() => {
    window.scrollTo(0, 0);  
    dispatch(setheadermenuData({currentpath:'/termsncondition', headerfootershow:false}));
    GAEvenet();
      getTermsncondition().then(meta => {
          setTermsncondition(meta);
      })
  }, []);
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
                            <Card variant="outlined" className="col-md-12 section_divider authPage_form_div terms_ply_div">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mainheading_div " style={{ "height": "54px" }}>
                                            <h1 className="auth_welcome_text"><u>Terms & Conditions</u></h1>
                                        </div>
                                    </div>
                                </div>

                                <div classsName="row">
                                    <div className="col" style={{ "color": "#707070", "font-size": "14px" }} dangerouslySetInnerHTML={{__html: Termsncondition}}></div>
                                </div>

                            </Card>
                            {/* </div> */}
                        </div>


                    </div>
                </div>
            </section>
        </div>
    );
}
export default Termsncondition;
