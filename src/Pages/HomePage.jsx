import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import {getCountries, getCompaniesByCountry, insertSearchAPI} from '../API/Userapis';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Companylistcard from '../components/CompanyListCard';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { getFlag } from '../API/LocalStore';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap';
import { setForumNewsModalData } from '../reducers/ForumNewsModalReducer';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import { setcompanybycountryval } from '../reducers/CompanyByContry';
import ScrollToTop from "react-scroll-to-top";
import CompanySearch from '../components/CompanySearch';
import { GAEvenet } from '../API/GoogleAnalytics';

const Homepage = () => {
   const dispatch = useDispatch();
   const [Countries, setCountries] = useState([]); 
   const [selectedCountry, setselectedCountry] = useState(0);  
   const [Companies, setCompanies] = useState([]);
   const [SearchText, setSearchText] = useState('');
   const navigate = useNavigate();
   const GoToReports = (companyId) => navigate('/company/'+companyId, { replace: false });
   const GoToNews = (companyId) => navigate('/companynews/'+companyId, { replace: false });
   const [currentCompaniesPosition, setcurrentCompaniesPosition] = useState(0);
   const [hasmoreCompanies, sethasmoreCompanies] = useState(true);
   const [isSearching, setisSearching] = useState(false);
   const [selectdexchnage, setselectdexchnage] = useState("");
   const [TotalCompanies, setTotalCompanies] = useState(0);
   const controller = new AbortController();
   const { signal } = controller;
   const parseCountry = useSelector((state)=>state.companiesbycountryreducer.value);
    useEffect(() => {
        dispatch(setheadermenuData({currentpath:'/financials', headerfootershow:true}));
        if(parseCountry!=""){
            setselectedCountry(parseCountry);
            dispatch(setcompanybycountryval(''));
        }
        setIsFetching(true);
        getCountries().then(meta => {
            setCountries(meta)
        });  
        window.scrollTo(0, 0);
        window.addEventListener('scroll', handleScroll);
        GAEvenet();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function changeCountry(country){
        setCompanies([]);
        setselectedCountry(country);
        setIsFetching(true);
        setcurrentCompaniesPosition(0);
        getCompaniesByCountry(country, 0, SearchText, signal).then(meta => {
            if(meta.data.length===0){
                sethasmoreCompanies(false);
                return false;
            }
            else
            sethasmoreCompanies(true);
            setTotalCompanies(meta.metadata.total_companies);
            setCompanies(meta.data)
            setIsFetching(false);
        });
        if(country!="DFM"&&country!="ADX"){
            setselectdexchnage("");
        }
    }



    function fetchCompanies(){
        setisSearching(true);
        setIsFetching(true);
        getCompaniesByCountry(selectedCountry, currentCompaniesPosition, SearchText, signal).then(meta => {
            if(meta.data.length===0){
                sethasmoreCompanies(false);
                return false;
            }
            else
            sethasmoreCompanies(true);
            setCompanies([...Companies, ...meta.data]);
            setcurrentCompaniesPosition(currentCompaniesPosition+1);
            if(meta.metadata.total_page<=meta.metadata.current_page){
                sethasmoreCompanies(false);
            }
            setTotalCompanies(meta.metadata.total_companies);
            setisSearching(false);
            setIsFetching(false);
        });
    }
    

    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (!isFetching) return;
        fetchCompanies();
    }, [isFetching]);

    function handleScroll() {
        if(hasmoreCompanies&&(!isFetching)){  
            if (window.innerHeight + ((parseInt(document.documentElement.scrollTop)+5000)) < document.documentElement.offsetHeight || isFetching) return;
            setIsFetching(true);
        }
    }

    const handleSearch = (SearchValue) =>{
        setisSearching(true);
        // controller.abort();
        setTimeout(() => {
            controller.abort();
        }, 1000);
        setSearchText(SearchValue);
        setcurrentCompaniesPosition(0);
        getCompaniesByCountry(selectedCountry, currentCompaniesPosition, SearchText, signal).then(meta => {
            if(meta.metadata.total_page<=meta.metadata.current_page){
                sethasmoreCompanies(false); 
            }
            else{
                sethasmoreCompanies(true);
            }
            setTotalCompanies(meta.metadata.total_companies);
            if(SearchText!="")
            setCompanies(meta);
            else
            setCompanies(meta.data);
            setisSearching(false);
        });    
    }

    const addinsearch = (company) =>{
        if(SearchText!==""){
            let searchstr = `CompanyName✂${company.Country}✂${company.SymbolTicker}✂${company.image}✂${company.Company_Name}✂${company.id}`;
            insertSearchAPI(searchstr).then(meta =>{
            })
        }
    }

    const handleBack = () =>{
        navigate(-1);
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const todaydate = mm + ' ' + dd + ', ' + yyyy;

    return (
        <>
            <div style={{"minHeight":"90vh"}} className="container-fluid section_divider">
            <ScrollToTop smooth />
                <div className="container card section_divider">
                    <div className="row section_divider">
                        <div className="col-md-12">
                            <Button style={{"borderTopLeftRadius":"5px", "borderBottomLeftRadius":"5px"}} onClick={handleBack}> <span className="back_btn_txt2"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcSet="/assets/icons/Dropdown.svg" /> Back</span></Button>
                        </div>
                    </div>
                    <div className="row section_divider">
                        <div className="col-md-12">
                        <label className='labelasheading'>Countries</label><br/>  
              <div className='contrieslist_div'> 
                        <Chip
                            onClick={()=>changeCountry(0)}
                            avatar={<Avatar alt='A' src="/assets/icons/globe.png" />}
                            label='All'
                            variant={(selectedCountry=='')?"":"outlined"}
                        />   
                        {(Countries.length==0)?(
                               Array.from({ length: 6 }, (x, i) => { return (
                                <div  key={i}><Skeleton variant="rectangular"  width={70} style={{"borderRadius":"20px"}} height={30} /></div>
                                )
                               }) ):(Countries.map(function (value, index, array) {
                            return (
                            <Chip
                            key={index}
                            onClick={()=>changeCountry(value.country)}
                            avatar={<Avatar alt={value.country[0]} src={getFlag(value.country)} />}
                            label={value.country}
                            variant={(selectedCountry==value.country)?"":"outlined"}
                            />)
                            })
                            
                            )
                        }
                        </div>
                        </div>
                    </div>
                 {(selectedCountry=="UAE"||selectedCountry=="DFM"||selectedCountry=="ADX")?(   
                    <div className="row">
                        <div className="col">
                        <Chip
                            onClick={()=>{(selectdexchnage!="DFM")?changeCountry("DFM"):changeCountry("UAE"); setselectdexchnage((selectdexchnage!="DFM")?"DFM":""); }}
                            avatar={<Avatar alt="UAE" src={getFlag("UAE")} />}
                            label="DFM"
                            variant={(selectdexchnage=="DFM")?"":"outlined"}
                            />
                            <Chip
                            style={{"marginLeft":"10px"}}
                            onClick={()=>{(selectdexchnage!="ADX")?changeCountry("ADX"):changeCountry("UAE"); setselectdexchnage((selectdexchnage!="ADX")?"ADX":""); }}
                            avatar={<Avatar alt="UAE" src={getFlag("UAE")} />}
                            label="ADX"
                            variant={(selectdexchnage=="ADX")?"":"outlined"}
                            />
                        </div>
                    </div>
                 ):""}
                    <div className="row section_divider pb-5">
                        <div className="col-md-12">
                            <div className="row searchboxcompanypage" >
                                <div className="col-md-6">
                                    <label className='labelasheading'>Companies <span className='companylistingtxt'>(Total {TotalCompanies} listed companies {selectedCountry!=""?" in "+selectedCountry:""} as of {format(new Date(), 'MMM d, Y')})</span></label>
                                </div>
                                <div className="col-md-6" style={{"zIndex":"50"}}>
                                    <CompanySearch />
                                </div>
                            </div>
                      
                             <Grid container spacing={1}>
                               { 
                              ((Companies.length==0)&&(!isFetching&&!isSearching))?("" ):(
                                Companies.map(function (value, index, array) {
                                    return (
                               <Grid onClick={()=>{dispatch(setForumNewsModalData({visibility:true, details:value})); addinsearch(value)}}   key={index} item md={2} xs={6} height={260}>        
                                   <Companylistcard  CompanyImage ={value.image} GoToReports={GoToReports} GoToNews={GoToNews} CompanyName={value.Company_Name} CompanyId={value.id} />
                               </Grid>
                               )}
                               
                               )
                               )
                                }
                                </Grid>
                                {
                                (isFetching&&hasmoreCompanies)?(<>
                                <div className="row">
                                    <div className="col-md-3 offset-md-4 d-flex justify-content-center align-items-center">
                                        <CircularProgress /><span style={{"fontSize":"16px", "marginLeft":"10px"}}> Loading...</span>
                                    </div>
                                </div>
                                    </> 
                                ):("")
                                }
                            
                        </div>
                    </div>
                   </div>
            </div>
        </>
    );
}

export default Homepage;
