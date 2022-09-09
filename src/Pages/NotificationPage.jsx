import { Button} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNotficationsAPi} from '../API/Userapis';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import { useNavigate } from 'react-router-dom';
import NewsNotification from '../components/NotificationCards/NewsNotification';
import ForumNotfication from '../components/NotificationCards/ForumNotfication';
import FinancialNotfication from '../components/NotificationCards/FinancialNotfication';
import { GAEvenet } from '../API/GoogleAnalytics';

const Notificationpage = () => {
    const navigate = useNavigate();
    const [Notifications, setNotifications] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setheadermenuData({currentpath:'/notifications', headerfootershow:true}));
        GAEvenet();
        getNotficationsAPi().then(meta=>{
            setNotifications(meta);
        })
    }, []);    

    const handleBack = () =>{
        navigate(-1);
    }

    return (
         <>
           <div style={{"minHeight":"90vh"}}>
                <div className="container-fluid nopaddingcontainer mb-2">
                    <div className="container card section_divider">
                    <div className="row section_divider">
                            <div className="col-md-12">
                                <Button style={{"borderTopLeftRadius":"5px", "borderBottomLeftRadius":"5px", "transform":"translateX(-10px)"}} onClick={handleBack}> <span className="back_btn_txt2"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcSet="/assets/icons/Dropdown.svg" /> Back</span></Button>
                            </div>
                        </div>
                        <div className="row news_label_with_search_row pt-1">
                            <div className="col-md-6">
                                <label className='labelasheading'>Notifications</label><br/>     
                            </div>
                        </div> 
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                {
                                    Notifications.map((notification, index) =>{
                                        console.log(notification);
                                        let notify_type = notification.metadata.type;
                                        if(notify_type=='News'){
                                            return (<NewsNotification key={index} notification={notification} />);
                                        }
                                        else if(notify_type=='Forum'){
                                            return (<ForumNotfication key={index} notification={notification} />);
                                        }
                                        if(notify_type=='Financial Report'){
                                            return (<FinancialNotfication key={index} notification={notification} />);
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>    
                </div>    
            </div> 
        </>   
    );
}

export default Notificationpage;
