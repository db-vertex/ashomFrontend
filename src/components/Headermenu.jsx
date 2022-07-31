import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { useNavigate, useLocation } from 'react-router';
import { LogoutUser } from '../API/LocalStore';
import { deleteDeviceToken } from '../API/Userapis';

const Headermenu = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {profileImg, username, anchorEl, open, handleClose, setIsUserLogin} = props;
  console.log(location);
  const logoutLogin = () =>{
    LogoutUser();
    deleteDeviceToken();
    setIsUserLogin(false);
    navigate(location.path, {replace: true});
  }

    return (
        <Menu
        style={{"width": "186px"}}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        width: 186,
        minWidth: 186,
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
          right: 14,
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
    <MenuItem style={{"width": "186px", "height":"40px", "padding":"6px"}} className='menuitemHeader' onClick={() => navigate("/myprofile")}>
      <Avatar alt={username?.charAt(0)} src={profileImg}  /> Profile
     </MenuItem>
    <Divider />
    <MenuItem style={{"width": "186px", "height":"40px", "padding":"6px"}} className='menuitemHeader' onClick={() => navigate("/settings")}>
       <Settings fontSize="small" />
      Settings
    </MenuItem> 
    <MenuItem style={{"width": "186px", "height":"40px", "padding":"6px"}} className='menuitemHeader'
      onClick={()=>logoutLogin()}>
      <Logout fontSize="small" />
      Logout
    </MenuItem>
  </Menu>

    );
}

export default Headermenu;
