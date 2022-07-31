import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';



const Footer = () => {
    const [Email_err, setEmail_err] = useState('');
    const [Email, setEmail] = useState('');
    const validateEmail = (email) =>
        email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const handle_subscribe_form = (e) =>{
        e.preventDefault();
        if(Email==''){
            setEmail_err("please enter email here.");
        }
        else{
            if(validateEmail(Email)){

            }
            else{
                setEmail_err("please enter valid email.");
            }
        }
    }


    return (
        <div className='footer_fluid footer'>
        <div className='container-fluid'>
            <div className="container footer_container">
                <div className="row">
                
                    <div className="col-md-3 p-0 m-0 d-flex justify-content-center">
                       <img className='footer_mobile_image' src="/assets/icons/mobile_footer_1.png" alt="" srcSet="" />
                       <img className='footer_mobile_image' src="/assets/icons/mobile_footer_2.png" alt="" srcSet="" />
                    </div>
                    <div className="col-md-2 appsplaystore_icon_box">
                        <div className="row downloadstoreiconrows">
                          <div className="col-md-12">   
                        <label className='footer_label'>Our Apps</label>
                        </div>
                            <a  target="blank" className="col-md-12 col-6 store_icons available_on_apple_footer" href="https://apps.apple.com/us/app/ashom-app/id1562818820">
                                <img alt="" srcSet="/assets/icons/appstore_com.webp" />
                            </a>
                            <a  target="blank"  className="col-md-12 col-6 mt-md-2 store_icons available_on_play_store" href="https://play.google.com/store/apps/details?id=com.ashomapp">
                                <img alt="" srcSet="/assets/icons/googleplay_com.webp" />
                            </a>
                        </div>
                    </div>
                    <div className="col-md-5">
                     <form className='subscription_form' onSubmit={handle_subscribe_form}>   
                    <label className='footer_label_subscribe'>Subscribe</label><br/>
                    <span className='subscribe_quate'>Subscribe to receive up to date notifications</span>
                    <input type="text" value={Email} onChange={(e)=>setEmail(e.target.value)} className="subscribe_input_footer" placeholder='Your Address Email'/>
                    
                    <button type="submit" className='btn subscribe_btn'>Subscribe</button>
                    </form>
                    <span style={{"color":"red", "marginLeft": "56px"}} className="err_text">{Email_err}</span>
                    </div>
                    <div className="col-md-2 pr-0 mr-0">
                        <div className="row userful_links_row pr-0 mr-0">
                        <div className="col-md-12 userlinks_div pr-0 mr-0">
                       <label className='footer_label mb-0 pb-0'>Useful Links</label>
                       <ul className='footer_link_list'>
                           <li className='mt-2'><NavLink to="/about_us">About Us</NavLink></li>
                           <li><NavLink to="/termsandconditions">Terms and Conditions</NavLink></li>
                           <li><NavLink to="/privacynpolicy">Privacy & Policy</NavLink></li>
                       </ul>
                             
                       </div>
                        </div>
                    </div>
                    
                    
                </div>
                
            </div>
            
        </div>
        <div className="container-fluid footer_cp_row">
        <div className="container">
            <div className="row">
                <div className="col-md-12 footer_copyright_label">
                © 2021-2022 Ashom.app. All Rights Reserved.
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}

export default Footer;
