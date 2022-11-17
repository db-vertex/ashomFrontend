import React from 'react';
import { getFlag } from '../../API/LocalStore';
import { useNavigate } from 'react-router-dom';
import { timeSince } from '../../API/Userapis';

const Financialnotfication = ({notification}) => {
    const navigate = useNavigate();
    const companyId = notification.metadata.data[0].Company_payload.id;
    const handleNavigate = () =>{
        sessionStorage.setItem('document_set_year', notification.metadata.data[0].year);
        sessionStorage.setItem('document_set_period', notification.metadata.data[0].period);
        navigate('/company/'+companyId, { replace: true, companyId: companyId });
    }
    return (
        <>
           <div className="row mb-1 notificationList_div" onClick={handleNavigate}>
                <div className="col-3 d-flex pl-0 pr-0">
                    <img className='notificationlist_image w-50' src={notification.metadata.data[0].Company_payload.image} alt="" srcSet="" />
                    <img className='notification_image notificationlist_flag_image ' src={getFlag(notification.metadata.data[0].Company_payload.Country)} alt="" srcSet="" />
                </div>
                <div className="col-9 pr-1 pl-3 ml-0">
                <div className="notification_title_time">
                        <span className="notification_title_text">Financial Report</span>
                        <span className="notification_time">{timeSince(new Date(notification.created_at).setTime(new Date(notification.created_at).getTime() - ((new Date().getTimezoneOffset() / 60) * 60 * 60 * 1000)))}</span>
                    </div>
                    <span className="notificationlist_text">{notification.message}</span>
                </div>
            </div>
        </>
    );
}

export default React.memo(Financialnotfication);
