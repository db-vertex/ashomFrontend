import React, {useEffect, useState} from 'react';
import Forumpost from '../components/Forumpost';
import Newsonforum from '../components/NewsOnForum';
import {timeSince, getForums} from '../API/Userapis';
import Forumdescription from '../components/ForumDescription';
import Pollpost from '../components/PollPost';
import { CardActionArea } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Addforumlayout from '../components/AddForumLayout';
import { Button } from '@mui/material';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import { useDispatch } from 'react-redux';
import ScrollToTop from "react-scroll-to-top";
import { getSearch, setSearch } from '../API/LocalStore';
import { GAEvenet } from '../API/GoogleAnalytics';

const Forumpage = () => {
    const dispatch = useDispatch();
    const [ForumDetailId, setForumDetailId] = useState('');
    const [IsAddIconDisplay, setIsAddIconDisplay] = useState(true);
    const [ForumSearchText, setForumSearchText] = useState('');
    const [Forums, setForums] = useState([]);
    const [ForumAvailable, setForumAvailable] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(setheadermenuData({currentpath:'/forum', headerfootershow:true}));
        getForums().then((data)=>{
                setForums(data);
                setForumAvailable(data);
                if(getSearch('forumsearch')){
                    let searchvalue = getSearch('forumsearch');
                    setForumSearchText(searchvalue);
                    setSearch('forumsearch', searchvalue);
                    if(searchvalue===''){
                        setForums(data);
                    }
                    else{
                        let Filters = data.filter((meta)=>{
                            return ((((meta.content.toLowerCase()).includes(searchvalue.toLowerCase())))||((((meta.first_name+" "+meta.last_name).toLowerCase()).includes(searchvalue.toLowerCase()))))?meta:false;
                        });
                        setForums(Filters);
                    }
                }
        })    

        GAEvenet();
    }, []);
    
    const Navigate = useNavigate();
    const url_path = window.location.pathname;
    const url_bud = url_path.split('/')[2];

    const addforumhandlebtn = () =>{
        window.scrollTo(0, 0);
        Navigate('/forum/addforum');
    }

    window.addEventListener('scroll', handleScroll);
    
    const handleForumSearch = (searchvalue) =>{
        setForumSearchText(searchvalue);
        setSearch('forumsearch', searchvalue);
        if(searchvalue===''){
            setForums(ForumAvailable);
        }
        else{
            let Filters = ForumAvailable.filter((meta)=>{
                return ((((meta.content.toLowerCase()).includes(searchvalue.toLowerCase())))||((((meta.first_name+" "+meta.last_name).toLowerCase()).includes(searchvalue.toLowerCase()))))?meta:false;
            });
            setForums(Filters);
        }

    }

    function handleScroll() { 
        if (window.innerHeight + ((parseInt(document.documentElement.scrollTop))+200) < document.documentElement.offsetHeight){
            if(IsAddIconDisplay!==true) setIsAddIconDisplay(true);
        }
        else{
            if(IsAddIconDisplay===true) setIsAddIconDisplay(false);
        }
    }

    const navigate = useNavigate();
    const handleBack = () =>{
        navigate(-1);
    }

    const handlerefreshfourms = () =>{
        getForums().then((data)=>{
            setForums(data);
            console.log(data);
            setForumAvailable(data);
        })    
    }

    return (
        <>
        
          <div style={{"minHeight":"90vh"}} className="container-fluid forum_container_fluid nopaddingcontainer">
              <div className="container">
              <ScrollToTop smooth />
                  <div className="row">
                      <div className="col-md-7 card section_divider" style={{"paddingBottom": "10px"}}>
                      {(url_bud!=='addforum')?(<div className="row">
                            <CardActionArea onClick={addforumhandlebtn} className="addforumbtn">
                                <img style={{"height":"inherit", "filter": "drop-shadow(1px 1px 3px #999)"}} srcSet="/assets/icons/addforumiconcircle.png"/>
                            </CardActionArea>
                       </div>):("")}    
                        {
                        (url_bud=='addforum')?(<Addforumlayout handlerefreshfourms={handlerefreshfourms}/>):    
                        ((ForumDetailId=='')?
                        (<> 
                        <div className="row section_divider">
                            <div className="col-md-2">
                                <Button style={{"borderTopLeftRadius":"5px", "borderBottomLeftRadius":"5px", "transform":"translateX(-10px)"}} onClick={handleBack}> <span className="back_btn_txt2"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcSet="/assets/icons/Dropdown.svg" /> Back</span></Button>
                            </div>
                            <div className="col-md-8">
                            <div className='row search_input_box_ForumPage'>
                            <div className="col-2 col-md-1">
                                <img className='search_icon_r' alt="" srcSet="/assets/icons/search_icon_light.svg" />
                            </div>
                            <div className="col-10 col-md-11">
                                <input onChange={(e)=>handleForumSearch(e.target.value)} value={ForumSearchText} className='search_input_ForumPage ' placeholder='Search' />
                                {(ForumSearchText!=='')?(<div onClick={(e)=>handleForumSearch('')} className='searchclose' style={{"top":"0px"}}><button className='btn_trans'><svg width="20" style={{"fill": "#555"}} height="20" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.58 12 5 17.58 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></button></div>):""}
                            </div>
                            </div>
                          </div>
                        </div>
                        <div className="forumlist_div">
                        {Forums.map(function (value, index, array) {
                            return (
                                (value.forum_type==="forum")?(<Forumpost key={index} setForumDetailId={setForumDetailId} forumalldata={value} form_id={value.id} username={value.first_name+' '+value.last_name} profile_img={value.posted_by_profile} 
                                    time={timeSince(new Date(value.created).setTime(new Date(value.created).getTime() - ((new Date().getTimezoneOffset() / 60) * 60 * 60 * 1000)))} content={value.content} content_image={value.content_image}
                                    url_link={"url"} total_messages={value.total_comments} 
                                    total_likes={value.total_liked} total_dislikes={value.total_disliked} 
                                    total_shares={value.share_count} 
                                    handlerefreshfourms={handlerefreshfourms}
                                    liked={value.liked} disliked={value.disliked} />
                                ):(<Pollpost key={index} polldata={value} setForumDetailId={setForumDetailId} handlerefreshfourms ={handlerefreshfourms} />))
                            })}</div></>):<Forumdescription  forumalldata={ForumDetailId} setForumDetailId={setForumDetailId} />)
                        }   
                      </div>
                      <div className="col-md-5 pl-4 news_section_in_forum section_divider">
                        <div className='card ' >
                            <Newsonforum/>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        </>
    );
}

export default Forumpage;
