import { Button, Grid } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Newsitem from '../components/NewsItem';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import {getCountries, getFinancialNews, getFinancialNewsPost, userEventAPI} from '../API/Userapis';
import { getFlag, getSearch, setSearch } from '../API/LocalStore';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import ScrollToTop from "react-scroll-to-top";
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
    const shareBtnModalShow = useSelector((state)=>state.sharebtnmodal.modalShow);
    
    function changeCountry(country){
        console.log(country);
        userEventAPI(`view_${country.toLowerCase()}_news`);
        setSearch('newssearchcountry', country);
        setSearch('newssearch', '');
        setcurrentNewsPosition(0)
        setselectedCountry(country);
        setSearchText("");
        getFinancialNewsPost(0, country, "", 0).then(meta => {
            setNews(meta.data)
            setcurrentNewsPosition(1);
        });  
    }

    function fetchNews(searchext=0, cp=(-1)){
        setisSearching(true);
        getFinancialNewsPost(cp!=(-1)?cp:currentNewsPosition, selectedCountry, "", searchext).then(meta => {
            if(((meta.data).length==0))
            setNews([]);
            else
            if(searchext!==0){
                console.log(meta.data);
                setNews(meta.data);
            }
            else{
                setNews([...News, ...meta.data]);
            }
            if(meta.metadata.total_pages==meta.metadata.current_page)
            sethasmorenews(false);
            if(parseInt(meta.metadata.total_pages)<=0)
            sethasmorenews(false);
            setIsFetching(false);
            setcurrentNewsPosition(currentNewsPosition+1);
            
            setisSearching(false);
        });
    }

    const handleSearch = (Searchvalue) =>{
        setSearch('newssearch', Searchvalue);
        setSearchText(Searchvalue);
        setNews([]);
        setcurrentNewsPosition(0);
        fetchNews(Searchvalue, 0);
    }
    
     useEffect(() => {
        window.scrollTo(0, 0);
        userEventAPI(`view_countries_news`);
        dispatch(setheadermenuData({currentpath:'/news', headerfootershow:true}));
        GAEvenet();
        getCountries().then(meta => {
             setCountries(meta);
             if(getSearch('newssearch')){
                 let searchtext = getSearch('newssearch');
                 let selectedCountry = getSearch('newssearchcountry')?getSearch('newssearchcountry'):"";
                 setselectedCountry(selectedCountry);
                 setSearchText(searchtext);
                getFinancialNewsPost(0, selectedCountry, "", searchtext).then(meta => {
                    setNews(meta.data);
                    if(meta.metadata.total_pages==meta.metadata.current_page)
                    sethasmorenews(false);
                    if(parseInt(meta.metadata.total_pages)<=0)
                    sethasmorenews(false);
                    setIsFetching(false);
                    setcurrentNewsPosition(currentNewsPosition+1);
                    setisSearching(false);
                });    
             }
             else{
             getFinancialNews(currentNewsPosition).then(meta => {
                console.log(meta.data);
                setNews(meta.data);
         
                setcurrentNewsPosition(currentNewsPosition+1)
             
            });  
            }        
         });   
         
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
     }, []);

     const [isFetching, setIsFetching] = useState(false);
   
     useEffect(() => {
       if (!isFetching) return;
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
        <div style={{"minHeight":"90vh"}}>
            <ScrollToTop smooth />
            <div className="container-fluid marginbotton nopaddingcontainer">
                <div className="container card section_divider">
                    <div className="row section_divider">
                        <div className="col-md-6">
                            <Button style={{"borderTopLeftRadius":"5px", "borderBottomLeftRadius":"5px", "transform":"translateX(-10px)"}} onClick={handleBack}> <span className="back_btn_txt2"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcSet="/assets/icons/Dropdown.svg" /> Back</span></Button>
                        </div>
                        <div className="col-md-6">
                        <div className="row"  >
                        <div className="col-md-12">
                            <div className='row search_input_box_NewsPage'>
                                <div className="col-2 col-md-1">
                                <img className='search_icon_r' alt="" srcSet="/assets/icons/search_icon_light.svg" />
                                </div>
                                <div className="col-10 col-md-11">
                                <input onChange={(e)=>handleSearch(e.target.value)} value={SearchText} className='search_input_NewsPage ' placeholder='Search' />
                                {(SearchText!=='')?(<div onClick={(e)=>handleSearch('')} className='searchclose'><button className='btn_trans'><svg width="20" style={{"fill": "#555"}} height="20" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.58 12 5 17.58 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></button></div>):""}
                            </div>
                            </div>
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
                    <div className="row">
                    <div className="col-md-12  news_cards_div section_divider">
                    
                   
                    <Grid container spacing={2} >
                        <>
                            {(News.length==0)?(
                              (isSearching)?( Array.from({ length: 8 }, (x, i) => { return (
                                <Grid className='newsItemBox'  item xs={12} md={3}>
                                <Skeleton variant="rectangular" style={{"borderRadius":"10px"}} height={230} />
                                </Grid>
                                )
                               }) ):("")):(News.map(function (value, index, array) {
                            return (
                            <Newsitem size={3} title={value.source}
                                description={value.title}
                                created={value.created}
                               
                                image={value.image_url}
                                
                                url_link={value.link}
                                date={value.created_date}
                                key={index} />)
                            }))
                            }
                        
                            {isFetching && (
                                <>
                                <Grid className='newsItemBox'  item xs={12} md={3}>
                                    <Skeleton variant="rectangular"  height={238} style={{'borderRadius':'5px'}} />
                                </Grid>
                                <Grid className='newsItemBox'  item xs={12}  md={3}>
                                    <Skeleton variant="rectangular" height={238} style={{'borderRadius':'5px'}} />
                                </Grid>
                                </>
                            )}
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
