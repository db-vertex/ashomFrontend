import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Backbutton(props) {
    
    const navigate = useNavigate();
    const handleBack = () =>{
        if(props.onClick===undefined)
        navigate(-1);
    }

    return <><Button onClick={handleBack} className="backbutton_btn"><span className="back_btn_txt"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcSet="/assets/icons/Dropdown.svg" /> Back</span></Button></>;
}

export default Backbutton;
