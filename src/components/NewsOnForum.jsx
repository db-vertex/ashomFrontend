import { Grid, Button } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Newsitem from '../components/NewsItem';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import {getCountries, getFinancialNews2, getFinancialNewsPost} from '../API/Userapis';
import PublicIcon from '@mui/icons-material/Public';
import ForumNewsItem from './ForumNewsItem';
import { getFlag } from '../API/LocalStore';
import { useNavigate } from 'react-router-dom';

const Newsonforum = () => {

    const navigate = useNavigate();
    function changeCountry(country){
        setcurrentNewsPosition(0)
        setselectedCountry(country);
        setSearchText('');
        getFinancialNews2(0, 10, country).then(meta => {
            setNews(meta.data)
            setcurrentNewsPosition(1);
        });  
    }

    const [currentNewsPosition, setcurrentNewsPosition] = useState(0);
    const [News, setNews] = useState([]); 
    const [selectedCountry, setselectedCountry] = useState('');  
    const [Countries, setCountries] = useState([]);
    const [hasmorenews, sethasmorenews] = useState(true);
    const [SearchText, setSearchText] = useState('');
    
    function fetchNews(){
    getFinancialNews2(currentNewsPosition, 10, selectedCountry).then(meta => {
            setNews([...News, ...meta.data]);
            if(meta.metadata.total_pages==meta.metadata.current_page)
            sethasmorenews(false);
            setIsFetching(false);
            setcurrentNewsPosition(currentNewsPosition+1);
        });
    }

    function fetchNewss(searchext=0){
        getFinancialNewsPost(currentNewsPosition, selectedCountry, "", searchext).then(meta => {
            const data = meta.data.slice(0, 10);
            setIsFetching(false);
            if(((meta.data).length==0))
            setNews([]);
            else
            setNews([...News, ...data]);
            if(meta.metadata.total_pages==meta.metadata.current_page)
            sethasmorenews(false);
            if(parseInt(meta.metadata.total_pages)<=0)
            sethasmorenews(false);
            setIsFetching(false);
            setcurrentNewsPosition(currentNewsPosition+1);
        });
    }
    
     useEffect(() => {
         getCountries().then(meta => {
             setCountries(meta)
         });   
         getFinancialNews2(currentNewsPosition, 10).then(meta => {
            const data = meta.data.slice(0, 20);
            setNews(data);
            setcurrentNewsPosition(currentNewsPosition+1)
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
            //if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
            // setIsFetching(true);
       }
     }

     const handleSearch = (Searchvalue) =>{
        setSearchText(Searchvalue);
        setNews([]);
        setcurrentNewsPosition(0);
        fetchNewss(Searchvalue);
    }

    return (
        <>
            <div className="container-fluid pb-3 section_divider">
                <div className="container   p-1">
                <div className="row p-1">
                        <div className="col-md-12">
                        <label className='labelasheading mb-1'>News</label>
                        <div className='row search_input_box_ForumNewsPage mt-1'>
                            <div className="col-1">
                            <img className='search_icon_r' alt="" srcSet="/assets/icons/search_icon_light.svg" />
                            </div>
                            <div className="col-11">
                            <input className='search_input_ForumNewsPage' onChange={(e)=>handleSearch(e.target.value)} value={SearchText} placeholder='Search' />
                                {(SearchText!=='')?(<div onClick={(e)=>handleSearch('')} className='searchclose' style={{"top":"0px"}}><button className='btn_trans'><svg width="20" style={{"fill": "#555"}} height="20" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.58 12 5 17.58 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></button></div>):""}
                            </div>
                        </div>
                        <div className='flags_div' style={{"paddingTop":"10px", "paddingBottom":"10px"}}>     
                        <Grid container spacing={0}>
                        <Grid item xs={12}>
                        <Grid item className="newsforumchip" xs={4}>
                            <Chip
                            className={(selectedCountry=='')?"chipborder_only active":"chipborder_only"}
                            onClick={()=>changeCountry('')}
                            avatar={<Avatar alt='A' src="/assets/icons/globe.png" />}
                            label='All'
                            variant={(selectedCountry=='')?"":"outlined"}
                            /> 
                        </Grid>
                            </Grid>
                        {(Countries.length==0)?(""):(Countries.map(function (value, index, array) {
                            return (
                            <Grid className="newsforumchip" key={index} item xs={4}>
                            <Chip
                            className={(selectedCountry==value.country)?"chipborder active":"chipborder"}
                            onClick={()=>changeCountry(value.country)}
                            avatar={<Avatar alt={value.country[0]} src={getFlag(value.country)} />}
                            label={value.country}
                            variant={(selectedCountry==value.country)?"":"outlined"}
                                /></Grid>)
                            }))
                        }
                         
                         </Grid>
                        </div>
                        </div>
                    </div>
                    <div className="row ">
                    <div className="col-md-12  news_cards_div section_divider">
                    <Grid container spacing={2}>
                        <>
                            {(News.length==0 && hasmorenews)?(
                               Array.from({ length: 3 }, (x, i) => { return (
                                <Grid className='newsItemBox d-flex'  key={i} item xs={12}>
                                    <Skeleton variant="rectangular"  width={150} height={100} />    
                                    <Skeleton variant="rectangular ml-3"  width={300} height={100} />
                                </Grid>
                                )
                               }) ):(News.map(function (value, index, array) {
                            return (
                            <ForumNewsItem size={12} title={value.source}
                                              description={value.title}
                                              image={value.image_url}
                                              created_at={value.created}
                                              url_link={value.link}
                                              key={index} />)
                            }))
                            }

                          
                            
                            {isFetching && (
                                <>
                                <Grid className='newsItemBox d-flex'  item xs={12}>
                                <Skeleton variant="rectangular"  width={150} height={100} />    
                                <Skeleton variant="rectangular ml-3"  width={300} height={100} />
                                </Grid>
                                <Grid className='newsItemBox d-flex'  item xs={12}>
                                <Skeleton variant="rectangular"  width={150} height={100} />    
                                <Skeleton variant="rectangular ml-3"  width={300} height={100} />
                                </Grid>
                                </>
                            )}

                            {(hasmorenews && (SearchText==='')) && ( 
                                 <div className='d-flex justify-content-center w-100'>
                                 {/* <Button onClick={()=>setIsFetching(true)} variant="text"><span style={{"textDecoration": "underline","marginBottom": "10px"}}>See More</span></Button> */}
                                 <Button onClick={()=>navigate('/news')} variant="text"><span style={{"textDecoration": "underline","marginBottom": "10px"}}>See More</span></Button>
                                 </div>   
                               )}
                        
                            
                            </>
                         </Grid>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Newsonforum;
