import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSelectedCompanies } from '../API/Userapis';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Companylistcard from '../components/CompanyListCard';
import { GAEvenet } from '../API/GoogleAnalytics';

const Selectedcompanies = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [Companies, setCompanies] = useState([]);
    useEffect(() => {
        GAEvenet();
        window.scrollTo(0, 0);
        getSelectedCompanies().then(meta =>{
            setCompanies(meta);
        })
        dispatch(setheadermenuData({currentpath:'/financials', headerfootershow:true}));
    }, []);    
    return (
         <>
           <div style={{"minHeight":"90vh"}}>
                <div className="container-fluid">
                    <div className="container card section_divider">
                    <div className="row news_label_with_search_row"  >
                        <div className="col-md-6">
                        <label className='labelasheading' style={{"marginTop": "13px"}}>Selected Companies</label><br/>     
                        </div>
                    </div> 
                    <div className="row bottompadding">
                        <div className="col-md-12">
                        <Grid container spacing={1}>
                        {Companies.map(function (value, index, array) {
                        return (
                        <Companylistcard  value={value} key={index}  CompanyImage ={value.image} CompanyName={value.Company_Name} CompanyId={value.id} />
                        )})}
                         </Grid>
                        </div>
                    </div>
                </div>    
            </div>    
        </div> 
        </>   
    );
}

export default Selectedcompanies;
