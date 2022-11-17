import { Button, Grid } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import {getCompaniesByCountry, getCountries, userEventAPI} from '../API/Userapis';
import { getFlag, getSearch, setSearch } from '../API/LocalStore';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import ScrollToTop from "react-scroll-to-top";
import CompanyListCard from '../components/CompanyListCard';
import { format } from 'date-fns';
import { setcompanybycountryval } from '../reducers/CompanyByContry';
import { GAEvenet } from '../API/GoogleAnalytics';

const Newspage = () => {
    const dispatch = useDispatch();
    const [currentNewsPosition, setcurrentNewsPosition] = useState(0);
    const [News, setNews] = useState([]); 
    const [selectedCountry, setselectedCountry] = useState('');  
    const [Countries, setCountries] = useState([]);
    const [hasmorenews, sethasmorenews] = useState(true);
    const [SearchText, setSearchText] = useState('');
    const [isSearching, setisSearching] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [TotalCompanies, setTotalCompanies] = useState(0);
    const [selectdexchnage, setselectdexchnage] = useState("");
    var parseCountry = useSelector((state)=>state.companiesbycountryreducer.value);

    function changeCountry(country){
      console.log(country);
        setcurrentNewsPosition(0)
        setselectedCountry(country);
        setSearchText("");
        setSearch('company', '');
        setSearch('company_country', country);
        getCompaniesByCountry(country, 0, 0).then(meta => {
          //Record user event
          if(country==="DFM"||country==="ADX")
          userEventAPI(`view_uae_company`);
          else
          userEventAPI(`view_${country.toLowerCase()}_company`);

          setTotalCompanies(meta.metadata.total_companies);
          setisSearching(false);
          setIsFetching(false);
          if(meta.data.length===0){
            sethasmorenews(false);
            if(meta.metadata.total_page===0)
               setNews([]);
            return false;
          }
          else{
            sethasmorenews(true);
          }
            setNews(meta.data)
            setcurrentNewsPosition(1);
        });  

        if(country!="DFM"&&country!="ADX"){
          setselectdexchnage("");
        }
    }

    async function fetchNews (searchext=0, rsest=false){
        setisSearching(true);
        // setIsFetching(true);
        getCompaniesByCountry(selectedCountry, rsest?0:currentNewsPosition, SearchText).then(meta => {
         
          setTotalCompanies(meta.metadata.total_companies);
            if(meta.data.length===0){
              sethasmorenews(false);
              if(meta.metadata.total_companies===0)
                setNews([]);
              return false;
            }
            else{
              console.log(searchext);
              sethasmorenews(true);
              if(searchext!==0){
                setNews(meta.data);
              }
              else{
              setNews([...News, ...meta.data]);
              }
          }
            setisSearching(false);
            setIsFetching(false);
            setcurrentNewsPosition(currentNewsPosition+1);
        });
    }

    const handleSearch = (Searchvalue) =>{
      setNews([]);
      setSearch('company', Searchvalue);
      setcurrentNewsPosition(0);
      fetchNews(Searchvalue, true);
    }
    
     useEffect(() => {
        window.scrollTo(0, 0);
        GAEvenet();
        userEventAPI(`company_page_view`);
        dispatch(setheadermenuData({currentpath:'/financials', headerfootershow:true}));
         getCountries().then(meta => {
             setCountries(meta)
         }); 
         
         function startOvercompanies(selectedCountrdy){
          let searchtext ='';
          if(getSearch('company'))
          searchtext = getSearch('company');
          setSearchText(searchtext);
          getCompaniesByCountry(selectedCountrdy, 0, searchtext).then(meta => {
            setNews(meta.data);
            setTotalCompanies(meta.metadata.total_companies);
            setcurrentNewsPosition(currentNewsPosition+1)
          });  
         }
        
         let countryfromsearch = getSearch('company_country');
         if(countryfromsearch && (countryfromsearch!==''))
         parseCountry = countryfromsearch;
        if(parseCountry!=""){
          setselectedCountry(parseCountry);
          startOvercompanies(parseCountry);
          dispatch(setcompanybycountryval(''));
        }
        else{
          startOvercompanies(selectedCountry);
        }
             
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
     }, []);

     
   
     useEffect(() => {
       if (!isFetching) 
         return false;
       fetchNews();
     }, [isFetching]);
   
     function handleScroll() {
       if(hasmorenews){  
       if (window.innerHeight + ((parseInt(document.documentElement.scrollTop)+2000)) < document.documentElement.offsetHeight || isFetching) return;
          setIsFetching(true);
       }
     }
      
    const navigate = useNavigate();
    const handleBack = () =>{
        navigate(-1);
    }
     
    return (
        <div style={{"minHeight":"90vh"}} className="mb-3">
            <ScrollToTop smooth />
            <div className="container-fluid nopaddingcontainer">
                <div className="container card section_divider">
                    <div className="row section_divider">
                        <div className="col-md-6">
                            <Button style={{"borderTopLeftRadius":"5px", "borderBottomLeftRadius":"5px", "padding":"0px", "transform":"translateX(-10px)"}} onClick={handleBack}> <span className="back_btn_txt2"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcSet="/assets/icons/Dropdown.svg" /> Back</span></Button>
                        </div>
                        <div className="col-md-6">
                        <div className='row search_input_box_NewsPage'>
                            <div className="col-2 col-md-1">
                            <img className='search_icon_r' alt="" srcSet="/assets/icons/search_icon_light.svg" />
                            </div>
                            <div className="col-10 col-md-11">
                              <input onKeyUp={(e)=>handleSearch(e.target.value)} onChange={(e)=>setSearchText(e.target.value)} value={SearchText} className='search_input_NewsPage ' placeholder='Search' />
                              {(SearchText!=='')?(<div onClick={(e)=>handleSearch('')} className='searchclose'><button className='btn_trans'><svg width="20" style={{"fill": "#555"}} height="20" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.58 12 5 17.58 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></button></div>):""}
                            </div>
                        </div>
                        </div>
                    </div>
             
                <div className="row section_divider">
                        <div className="col-md-12">
                        <div className='flags_div d-flex'> 
                        <Chip
                            onClick={()=>changeCountry('')}
                            avatar={<Avatar alt='A' src="/assets/icons/globe.png" />}
                            label='All'
                            variant={(selectedCountry=='')?"":"outlined"}
                        />   
                        {(Countries.length==0)?(""):(Countries.map(function (value, index, array) {
                            return (
                            <Chip
                            className='ml-1 countrychips_homepage'
                            key={index}
                            onClick={()=>changeCountry(value.country)}
                            avatar={<Avatar alt={value.country[0]} src={getFlag(value.country)} />}
                            label={value.country}
                            variant={(selectedCountry==value.country)?"":"outlined"}
                            />)
                            }))
                        }
                        </div>
                        </div>
                    </div>
                    {(selectedCountry=="UAE"||selectedCountry=="DFM"||selectedCountry=="ADX")?(   
                    <div className="row mt-2 mb-2 ">
                        <div className="col d-flex">
                        <Chip
                            className='countrychips_homepage'
                            onClick={()=>{(selectdexchnage!="DFM")?changeCountry("DFM"):changeCountry("UAE"); setselectdexchnage((selectdexchnage!="DFM")?"DFM":""); }}
                            avatar={<Avatar alt="UAE" src={getFlag("UAE")} />}
                            label="DFM"
                            variant={(selectdexchnage=="DFM")?"":"outlined"}
                            />
                            <Chip
                            className='ml-1 countrychips_homepage'
                            onClick={()=>{(selectdexchnage!="ADX")?changeCountry("ADX"):changeCountry("UAE"); setselectdexchnage((selectdexchnage!="ADX")?"ADX":""); }}
                            avatar={<Avatar alt="UAE" src={getFlag("UAE")} />}
                            label="ADX"
                            variant={(selectdexchnage=="ADX")?"":"outlined"}
                            />
                        </div>
                    </div>
                 ):""}
                    <div className="row">
                      <div className="col-md-12  news_cards_div">
                        <label className='labelasheading'>Companies <span className='companylistingtxt'>(A total of {TotalCompanies} listed companies {selectedCountry!=""?" in "+selectedCountry:""} as of {format(new Date(), 'MMM d, Y')})</span></label>
                      </div>
                    <div className="col-md-12">
                    <Grid className="company_list_card" container spacing={2} >
                        <>
                            {(News.length==0)?(
                              ""):(News.map(function (value, index, array) {
                                var isSearched = (SearchText!=='');
                                // console.log(isSearched);
                            return (<CompanyListCard 
                                        isSearched={isSearched}
                                        value={value} 
                                        key={index}  
                                        CompanyImage ={value.image} 
                                        CompanyName={value.Company_Name} 
                                        CompanyId={value.id} />)
                                })  )
                            }
                            </>
                         </Grid>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Newspage;
