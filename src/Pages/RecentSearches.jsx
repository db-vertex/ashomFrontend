import { Button, Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchesAPI } from '../API/Userapis';
import Companylistcard from '../components/CompanyListCard';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import { useNavigate } from 'react-router-dom';
import CompanySearch from '../components/CompanySearch';
import { GAEvenet } from '../API/GoogleAnalytics';
import SearchBox from '../components/SearchBox';

const RecentSearches = () => {
    const navigate = useNavigate();
    const [MostViewed, setMostViewed] = useState([]);
    const [ViewAgain, setViewAgain] = useState([]);
    const [isFetched, setisFetched] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        GAEvenet();
        getSearchesAPI().then(meta =>{
            if(meta.length==0)
            return false;
            let searches = [];
            meta.map(function (value, index, array) {
                let search_sample = [];
                search_sample["id"] = value.data.id;
                search_sample["Country"] = value.data.Country;
                search_sample["SymbolTicker"] = value.data.SymbolTicker;
                search_sample["image"] = 'https://ashom.app/'+value.data.image;
                search_sample["Company_Name"] = value.data.Company_Name;
                searches.push(search_sample);
            });    
            setViewAgain(searches);
            setisFetched(true);
        });

        getSearchesAPI(true).then(meta =>{
            if(meta.length==0)
            return false;
            let searches = [];
            meta.map(function (value, index, array) {
                let serach_array = value.searchstr.split('✂');
                if(serach_array[0]=="CompanyName"){
                    let search_sample = [];
                    search_sample["id"] = value.data.id;
                    search_sample["Country"] = value.data.Country;
                    search_sample["SymbolTicker"] = value.data.SymbolTicker;
                    search_sample["image"] = 'https://ashom.app/'+value.data.image;
                    search_sample["Company_Name"] = value.data.Company_Name;
                    searches.push(search_sample);
                }
            });    
            setMostViewed(searches);
        });

        dispatch(setheadermenuData({currentpath:'/searches', headerfootershow:true}));
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
                            <div className="col-md-6 mb-2">
                                <Button style={{"borderTopLeftRadius":"5px", "borderBottomLeftRadius":"5px", "transform":"translateX(-10px)"}} onClick={handleBack}> <span className="back_btn_txt2"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcSet="/assets/icons/Dropdown.svg" /> Back</span></Button>
                            </div>
                            <div className="col-md-6 companysearch_input_recentsearch" style={{"zIndex":"50"}}>
                                <SearchBox/>
                            </div>
                        </div>
                    <div className="row news_label_with_search_row pt-1">
                        <div className="col-md-6">
                        <label className='labelasheading'>View Again</label> 
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col-md-12 pb-3">
                            <Grid container spacing={1}>
                            {(isFetched&&(ViewAgain.length==0))?"<span>No recent searches found.</span>":ViewAgain.map(function (value, index, array) {
                            return (     
                                <Companylistcard  value={value} key={index}  CompanyImage ={value.image} CompanyName={value.Company_Name} CompanyId={value.id} />
                            )})}
                            </Grid>
                        </div>
                    </div>
                   
                    <div className="row news_label_with_search_row pt-1">
                        <div className="col-md-6">
                        <label className='labelasheading'>Most Viewed</label>    
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col-md-12 pb-3">
                        <Grid container spacing={1}>
                        {MostViewed.map(function (value, index, array) {
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

export default RecentSearches;
