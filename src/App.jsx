import './App.css';
import Header from './components/Header';
import Loginpage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import React, { useState, useEffect } from 'react';
import {Route, Routes, useNavigate } from "react-router-dom";
import ForgetPassword from './Pages/Forget_password';
import Companiespage from './Pages/CompaniesPage';
import Forumpage from './Pages/ForumPage';
import Newspage from './Pages/NewsPage';

import Logout from './Pages/Logout';
import Companydetails from './Pages/CompanyDetails';
import Footer from './components/Footer';
import OtpScreen from './Pages/OtpScreen';
import Autoprofile from './Pages/Autoprofile';
import Changepassword from './Pages/ChangePassword';
import Settingspage from './Pages/SettingsPage'; 
import Privacypolicy from './Pages/Privacypolicy';
import Termsncondition from './Pages/Termsnconditions'; 
import Aboutus from './Pages/Aboutus';
import Contactus from './Pages/Contact_us';
import { getUserToken } from './API/LocalStore';
import PaymentGateway from './Pages/PaymentGateway';
import { useSelector} from 'react-redux';
import Popupmodals from './popup/PopupModals';
import Companynews from './Pages/CompanyNews';
import SelectedCompanies from './Pages/SelectedCompanies';
import RecentSearches from './Pages/RecentSearches';
import CompanyListPage from './Pages/CompanyListPage';
import Notificationpage from './Pages/NotificationPage';
import Notification from './firebase/Notification';
import PdfViewPage from './Pages/PdfView';
import Setselectdoc from './Pages/Setselectdoc';
import NotFoundPageAuth from './Pages/NotFoundPageAuth';
import PrivateRoute from './routers/PrivateRoute';

const App = () => {
    const navigate = useNavigate();
    useEffect(() => { 
    // dispatch(login({name:"Aayush Solanki", age:40, email:"ayush@gmail.com"}))
    }, []);
    
    const headerData = useSelector((state)=>state.headermenureducer.value);

    let var_token = null;
    if ((getUserToken() !== null) &&(getUserToken() !==  undefined) ) {
        var_token = getUserToken();
    }   
    
    const url_location = window.location.pathname;
    const EmailOfOtp = sessionStorage.getItem('email_for_otp');
    const mobileOfOtp = sessionStorage.getItem('mobile_for_otp');
    if((url_location=='/otp'))
    if(!EmailOfOtp&&!mobileOfOtp)
    navigate('/login');
    
    const [token, settoken] = useState(((var_token===null)&&(var_token !==  undefined))?'':var_token);
    const [IsUserLogin, setIsUserLogin] = useState(((var_token===null)&&(var_token !==  undefined))?false:true);
    

    var m_r = '/company/'+((url_location.split("/").length>1)?url_location.split("/")[2]:'');

    return ( < div >
    <Notification/>
    <Popupmodals/>
        {(headerData.headerfootershow)?(<Header IsUserLogin={IsUserLogin} headerData={headerData} setIsUserLogin={setIsUserLogin} />):""}
        <div style={{"minHeight":"90vh", "background":"#F3F2EF"}}>
                    <Routes>
                    <Route exact path = "/login"
                          element = {<Loginpage token={token} setIsUserLogin={setIsUserLogin} /> } />  
                        
                    <Route path = "/signup" 
                           element = { < SignUpPage token={token} setIsUserLogin={setIsUserLogin} /> }/>
                    <Route path="/forgot_password"  token={token} setIsUserLogin={setIsUserLogin}
                           element = { < ForgetPassword/> }/>     
                    <Route exact path="/linkedin" element={<h1>Helo</h1>} />
                    <Route path="/otp" element={<OtpScreen/>} />
                    <Route path="/" element={< Companiespage />} />
                    <Route path="/financials" element = { <CompanyListPage  setIsUserLogin={setIsUserLogin}/> }/> 
                    <Route path="/news" element = { < Newspage/> }/> 
                    <Route path="/forum" token={token}  element = { < Forumpage/> }/> 
                    <Route path="/home" element = { < Companiespage/> }/>   
                    <Route exact path="/privacynpolicy" element={<Privacypolicy />} />
                    <Route exact path="/termsandconditions" element={<Termsncondition />} />
                    <Route exact path="/about_us" element={<Aboutus />} />
                    <Route exact path="/contact_us" element={<Contactus />} />
                    <Route exact path="/notifications" element={<Notificationpage/>}/>
                    <Route exact path="/pdfview" element={<PdfViewPage/>} />
                    <Route path="/setselectdoc" element={<Setselectdoc/>} />
                    <Route path='*' exact={true} element={<NotFoundPageAuth/>} />
                    <Route exact path="/companynews/:companyid" element={<Companynews/>}/> 
                    <Route exact path="/company/:id" element = { <Companydetails/> }/> 
                    <Route exact path="/searches" element={<RecentSearches/>}/>
                     <Route element={<PrivateRoute/>}>
                        <Route path = "/payment" element={<PaymentGateway/>} /> 
                        <Route exact path="/selectedcompanies" element={<SelectedCompanies/>}/>  
                        <Route path="/forum/replies/:page" element = { < Forumpage/> }/>
                        <Route path="/forum/:any" element = { < Forumpage/> }/> 
                        <Route path="/settings" element={<Settingspage setIsUserLogin={"setIsUserLogin"}/>}/>
                        <Route path = "/myprofile" element={<Autoprofile/>} />
                        <Route path="/changepass" element={<Changepassword/>}></Route>
                    </Route>
                    </Routes>
                 </div>
                {(headerData.headerfootershow)?(<Footer/>):""}
            
        </div>
    );
}

export default App;
