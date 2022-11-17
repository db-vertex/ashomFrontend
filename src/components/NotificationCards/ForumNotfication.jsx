import React from 'react';
import { useNavigate } from 'react-router-dom';
import { timeSince } from '../../API/Userapis';

const Forumnotfication = ({notification}) => {
    const navigate = useNavigate();

    return (
        <>
           <div onClick={()=>navigate('/forum')} className="row mb-1 notification_div">
                <div className="col-2 pl-0 pr-0 mr-0">
                    <img className='notification_image' src='/assets/icons/forum_icon_news.svg' alt="" srcSet="" />
                </div>
                <div className="col-10 pr-0 pl-1 ml-0">
                    <div className="notification_title_time">
                        <span className="notification_title_text">Forum</span>
                        <span className="notification_time">{timeSince(new Date(notification.created_at).setTime(new Date(notification.created_at).getTime() - ((new Date().getTimezoneOffset() / 60) * 60 * 60 * 1000)))}</span>
                    </div>
                    <span className="notification_text">{notification.message}</span>
                </div>
            </div>
        </>
    );
}

export default React.memo(Forumnotfication);
