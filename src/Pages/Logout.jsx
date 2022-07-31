import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GAEvenet } from '../API/GoogleAnalytics';
import {LogoutUser } from '../API/LocalStore';
import { deleteDeviceToken } from '../API/Userapis';

const Logout = () => {

    const navigate = useNavigate();
    // if (getUserToken() !== null) {
    //     LogoutUser();
    //     navigate('/');
    //     // window.location.href = "/login";
    // }

    useEffect(() =>{
        GAEvenet();
        LogoutUser();
        deleteDeviceToken();
        // setIsUserLogin(false);
    }, []);

    return true;
}

export default Logout;
