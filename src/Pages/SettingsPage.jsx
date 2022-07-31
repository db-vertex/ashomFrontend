import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import {Card, Avatar } from '@mui/material';
import { Link, NavLink, useNavigate } from "react-router-dom";
import Backbutton from '../components/Backbutton';
import { deleteDeviceToken, getUserdata } from '../API/Userapis';
import Subscriptionpopup from '../components/Subscriptionpopup';
import { useDispatch } from 'react-redux';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import { format } from 'date-fns';
import { showsubscriptionmodal } from '../reducers/SubscriptionModalReducer';
import { GAEvenet } from '../API/GoogleAnalytics';
import { getUserToken, LogoutUser } from '../API/LocalStore';

const Settingspage = (props) => {
    const {setIsUserLogin} = props.setIsUserLogin;
    const [Email, setEmail] = useState('');
    const [First_name, setFirst_name] = useState('');
    const [Last_name, setLast_name] = useState('');
    const [mySubscription, setmySubscription] = useState('');
    const [SubscriptionExpiry, setSubscriptionExpiry] = useState('');
    const [ProfilePic, setProfilePic] = useState('');
    const [Userdata, setUserdata] = useState({});
    const [Login_type, setLogin_type] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = getUserToken();
    if(!token) navigate('/', {replace: true});

    useEffect(() => {
        dispatch(setheadermenuData({currentpath:'/setting', headerfootershow:false}));
        GAEvenet();
        getUserdata().then(meta => {
            if (meta.response) {
                setUserdata(meta.response);
                let error = meta.response.data;
                if (error.status == false) {
                    logoutLogin();
                    // window.location.href = "/login"
                }
            }
            else {
                let { first_name, last_name, mobile, email, profile_pic, subscription_type, login_type, subscription_expiry_date } = meta;
                setProfilePic(profile_pic);
                setmySubscription(subscription_type);
                setFirst_name(first_name)
                setLast_name(last_name);
                setEmail(email);
                setLogin_type(login_type);
                setSubscriptionExpiry(subscription_expiry_date);
            }

        })
    }, []);

    const logoutLogin = () =>{
        LogoutUser();
        deleteDeviceToken();
        setIsUserLogin(false);
      }
    

    const menuItems_other = [{ "name": "Terms and Conditions", "icon": "accept.png", "link":"/termsandconditions"},
        { "name": "Privacy Policy", "icon": "insurance.png", "link": "/privacynpolicy"},
        { "name": "About the App", "icon": "info.png", "link": "/about_us"},
        { "name": "Contact Us", "icon": "contact.png", "link": "/contact_us" }];

    const menuItems_account = [{ "name": "Change Password", "icon": "padlock.png", "link":"/changepass"},
        { "name": "Subscription Level", "icon": "subscribe.png", "link":""},
        { "name": "Selected Companies", "icon": "tick.png", "link":"/selectedcompanies"},
        { "name": "Logout", "icon": "logout.png", "link":""}];

    return (
        <div>
        <section className='authPage_section native_background'>
        <Subscriptionpopup  Userdata={Userdata} setmySubscription={setmySubscription} />    
        <Backbutton />
        <div className='container-fluid'>
            <div className='container'>
                <div className="row auto_page_row">
                    <div className="col-md-2 col-sm-2 offset-md-5 offset-sm-5 d-flex justify-content-center">
                       <NavLink to="/"><img alt="Ashom Logo" onClick={()=>navigate('/')} style={{"width":"60px"}} srcSet="/assets/icons/launch_Logo.png" /></NavLink>
                    </div>
                </div>
               <div className='row'>
                    <Card  variant="outlined" style={{"padding": "18px"}} className="col-md-4 col-sm-8 offset-md-4  offset-sm-2 myprofile_section_card section_divider authPage_form_div">
                      <div className="row">
                          <div className="col-md-12 d-flex justify-content-center">
                                <div className="myprofile_page_div card">
                                    <div className="row">
                                        <div className="col-2">
                                        <Avatar
                                            alt={First_name?.charAt(0)}
                                            src={ProfilePic}
                                            sx={{ width: 40, height: 40 }}
                                        />
                                        </div>
                                        <div className="col-6 myProfile_name_div">
                                            <span className='myProfile_myname'>{First_name + ' ' + Last_name}</span>
                                            <span className='myProfile_myemail'>{Email}</span>
                                        </div>
                                        <div className="col-4 myprofile_view_all_div d-flex flex-column justify-content-center">
                                        <button onClick={()=>navigate('/myprofile')} className='myprofile_view_all_btn'>View</button>
                                        {mySubscription!==''?(<img className="profilecrown" src={process.env.PUBLIC_URL + '/assets/icons/crowns/'+(((mySubscription==='Free')?'silver_ashom.png':((mySubscription==='Monthly')?'bronz_ashom.png':((mySubscription==="Yearly")?"gold_ashom.png":""))))}  />):""}
                                        </div>
                                    </div>
                                    
                                </div>
                          </div>
                      </div>
                        
                      <div className="row">
                          <div className="col-md-12">
                              <label className='myprofile_menu_main_title' htmlFor="">Account</label>
                          </div>
                      </div>
                    <div className="row">  
                    <div className="col">
                     <Card>   
                    {menuItems_other.map(function (value, index, array) {
                         return (
                        <div className="row" key={index}>
                            <div className="col-md-12">
                                    <div className="row myprofile_menu">
                                        <div className="col-2 myprofile_menu_img_div">
                                              <img className="myprofile_menu_img" alt="Terms and Conditions" srcSet={"/assets/icons/myprofile/"+value.icon} />
                                        </div>
                                        <div className="col-10 myprofile_menu_title_div">
                                             <Link to={value.link}><span className="myprofile_menu_title">
                                            {value.name}
                                            </span></Link>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        )
                    })}  
                    </Card>
                    </div>
                        </div>
                    <div className="row">
                          <div className="col-md-12">
                              <label className='myprofile_menu_main_title' htmlFor="">Other</label>
                          </div>
                      </div>
                      <div className="row">  
                    <div className="col">
                     <Card>   
                    {menuItems_account.map(function (value, index, array) {
                        // value.name)!='Change Password')&&(Login_type!="normal"
                        if(value.name=='Change Password'&&Login_type!="normal")
                        return false;
                         return (
                        <div className="row"  key={index}>
                            <div className="col-md-12">
                                    <div className="row myprofile_menu">
                                        <div className="col-2 myprofile_menu_img_div">
                                              <img className="myprofile_menu_img" alt="Terms and Conditions" srcSet={"/assets/icons/myprofile/"+value.icon} />
                                        </div>
                                       
                                            {((value.name)=='Subscription Level')?(
                                              <>
                                                <div className="col-5 myprofile_menu_title_div myprofile_menu_subscription_div">
                                                <Link to={value.link}><span className="myprofile_menu_title">
                                                {value.name}
                                                {(mySubscription==="Yearly")?(<><br/><span className="expireontitle">EXPIRES ON {SubscriptionExpiry!==''?format(new Date(SubscriptionExpiry), 'dd MMM yy').toUpperCase():''}</span></>):""}
                                                </span></Link>
                                                </div>
                                                <div className="col-5 myprofile_upgrade_subscript">
                                                    {mySubscription}
                                                    {(mySubscription==="Monthly"||mySubscription==="Free"||mySubscription==="")?(<button onClick={()=>dispatch(showsubscriptionmodal({value:true}))}>Upgrade</button> ):""}
                                                </div>
                                              
                                              </>      
                                            ):(
                                           
                                            <div className="col-10 myprofile_menu_title_div" >
                                                <Link to={value.link} onClick={()=>{ if(value.name==='Logout') logoutLogin();}}><span className="myprofile_menu_title">
                                                {value.name}</span></Link>
                                            </div>
                                           )
                                        }
                                    </div> 
                            </div>
                        </div>
                        )
                    })}  
                      </Card>
                    </div>
                   </div>
                  </Card>
                </div>
            </div>
          </div>
        </section>
        
    </div>
    );
}
export default Settingspage;
