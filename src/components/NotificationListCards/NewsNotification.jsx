import { CardMedia } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { timeSince } from '../../API/Userapis';

const Newsnotification = ({notification}) => {
    const navigate = useNavigate();

    return (
        <>
           <div onClick={()=>window.open((notification.metadata.data[0].link), '_blank')} className="row mb-1 notificationList_div">
                <div className="col-2 pl-0 pr-0 mr-0">
                <CardMedia className='notification_image'  
                    component="img"
                    onError={e => { e.target.src = "/assets/icons/placeholder.png"; }}
                    image={encodeURI(notification.metadata?.data[0]?.image_url)}
                 />
                </div>
                <div className="col-10 pr-1 pl-1 ml-0">
                    <div className="notification_title_time">
                        <span className="notification_title_text">News</span>
                        <span className="notification_time">{timeSince(new Date(notification.created_at).setTime(new Date(notification.created_at).getTime() - ((new Date().getTimezoneOffset() / 60) * 60 * 60 * 1000)))}</span>
                    </div>
                    <span className="notificationlist_text">{notification.message}</span>     
                </div>
            </div>
        </>
    );
}

export default React.memo(Newsnotification);
