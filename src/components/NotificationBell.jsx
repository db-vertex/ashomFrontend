import * as React from 'react';
import { useEffect, useState } from 'react';
import { notificationCounterAPi } from '../API/Userapis';
import Menu from '@mui/material/Menu';
import { getNotficationsAPi} from '../API/Userapis';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import NewsNotification from '../components/NotificationListCards/NewsNotification';
import ForumNotfication from '../components/NotificationListCards/ForumNotfication';
import FinancialNotfication from '../components/NotificationListCards/FinancialNotfication';

export default function AccountMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Notifications, setNotifications] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    getNotficationsAPi().then(meta=>{
        meta = meta.slice(0, 5);
        setNotifications(meta);
    })
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const [Notification_counter, setNotification_counter] = useState(0);
    useEffect(() => {
        setInterval(() => {
            notificationCounterAPi().then(count=>setNotification_counter(count));
          }, 3000);
    }, []);
    
  return (
    <React.Fragment>
     
        <Tooltip title="Notifications">
            <div 
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menux' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                className="notification_bell_div">
                <img className='notification_bell_image' src='/assets/icons/bell.png'/>
                {(Notification_counter!==0)?(<div className='notification_bell_counter'>{Notification_counter}</div>):""}
            </div>
        </Tooltip>
      <Menu
        anchorEl={anchorEl}
        className="notification_menu"
        id="account-menux"
        style={{"padding":"0 !important"}}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 170,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
      <div className="container">    
        <div className="row">
            <div className="col-md-12">
            <div className="row notifications_popup_heding" style={{"width":"350px"}}>
                    <span>Notifications</span>
                </div>
                {
                    Notifications.map((notification, index) =>{
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
                <div className="row see_more_news_notification_div" style={{"width":"350px"}}>
                    <span onClick={()=>navigate('/notifications')} className="see_more_news_notification">
                        See More Notifications
                    </span>
                </div>
                </div>
            </div>
        </div>
        </Menu>
    </React.Fragment>
  );
}
