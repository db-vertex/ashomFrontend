import React, {useState, useEffect} from 'react';
import { Button, IconButton,  } from '@mui/material';
import {NavLink} from "react-router-dom";
import {useParams, useNavigate} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import {getUserdata} from '../API/Userapis';
import Headermenu from './Headermenu';
import NotificationBell from './NotificationBell';
import MoreIcon from '@mui/icons-material/MoreVert';
import { LogoutUser } from '../API/LocalStore';


const Header = (props) => {
    const [currentTab, setcurrentTab] = useState(window.location.pathname);
    const {IsUserLogin, setIsUserLogin, headerData} = props;
    const [username, setusername] = useState('Loading..');
    const [profileImg, setprofileImg] = useState('');
    const [Userdata, setUserdata] = useState('');
    const navigate = useNavigate();

    var base_url = window.location.origin;
    const preloadImages = [
      base_url+"/assets/icons/menu_home_fill.svg",
      base_url+"/assets/icons/menu_home.svg",
      base_url+"/assets/icons/menu_company.svg",
      base_url+"/assets/icons/menu_company_fill.svg",
      base_url+"/assets/icons/menu_forum.svg",
      base_url+"/assets/icons/forum_header_icon.svg",
      base_url+"/assets/icons/menu_news.svg",
      base_url+"/assets/icons/menu_news_fill.svg"
    ];
    
    function capitalizeFirstLetter(string) {
      return string?.charAt(0)?.toUpperCase() + string?.slice(1);
    }
    
    const cacheimages = async (srcArray) =>{
      const promises = await srcArray.map((src) => {
        return new Promise(function (resolve, reject){
          const img  = new Image();
          img.src = src;
          img.onload = resolve();
          img.onerror = reject();
        });
      });
      await Promise.all(promises);
    }
    

    useEffect(() => { 
        getUserdata().then(meta => {
          if (meta.response){
          let error = meta.response.data;
          if (error.status==false){
             LogoutUser();
            // window.location.href = "/login";
            }
          }
        
          setUserdata(meta);
          let {first_name, last_name, profile_pic} = meta;
          setusername(capitalizeFirstLetter(first_name))
          setprofileImg(profile_pic)
        });
        cacheimages(preloadImages);
  }, []);

  


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let params = useParams();
    const company_id = params.id;
    const Pages = ['/home', '/news', '/forum', '/companies', '/company/'+company_id];
    let curr_link = window.location.pathname;
    const [value, setValue] = React.useState(Pages.indexOf(curr_link));
    
    useEffect(() => {
      handleChange();
    }, [currentTab]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
      switch (newValue) {
        case '0':{
          setcurrentTab('/home')
          break;
        }  
        case '1':{
          setcurrentTab('/news')
          break;  
        }  
        case '2':{
          setcurrentTab('/forum')
          break;  
        }    
        case '3':{
          setcurrentTab('/financials')
          break;
        }  
        default:{
          break;
        }  
      }
      
    };

    return (
        <>
        {/* <Subscriptionpopup  Userdata={Userdata} /> */}
          <div className="container-fluid navbar-back sticky-top">
              <div className="container">
                <nav className="navbar navbar-expand-lg  p-0">
                    <div className="navbar-brand">
                    <NavLink style={{"textDecoration":"none"}} to={"/"}>
                          <img className='headerIconImgs' style={{"height": "30px", "width": "43px"}} src="/assets/icons/ashom.svg" alt="" />
                              Ashom.app 
                      </NavLink>
                  
                    </div>
                    <div className='navbar_toogle_box' >
                    {IsUserLogin ? <>
                      <NotificationBell/>
                      <Avatar className='header_profile_cirle'  data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" alt={username?.charAt(0)} src={profileImg} />
                      <IconButton
                        className='p-0'
                        onClick={handleClick}
                        size="large"
                        aria-label="display more actions"
                        edge="end"
                        color="inherit"
                      >
                        <MoreIcon />
                      </IconButton></> :
                      <></>
                   } </div>

                    <div className="collapse navbar-collapse float-left show" id="navbarNav">
                        <ul className="navbar-nav float-md-left w-100">
                        <>    
                          <li className={(headerData.currentpath==='/home'||headerData.currentpath==='/'||headerData.currentpath==='')?"nav-item active":"nav-item"}>
                            <NavLink activeclassname="active_header_navlink" className="nav-link" onClick={()=>setcurrentTab('/home')} to={"/home"}>
                            <img style={{"height": "30px", "width": "43px"}} className={(headerData.currentpath==='/home')?'headerIconImgs':'headerIconImgs d-none'} src="/assets/icons/menu_home_fill.svg" alt="" />
                            <img style={{"height": "30px", "width": "43px"}} className={(headerData.currentpath!=='/home')?'headerIconImgs':'headerIconImgs d-none'} src="/assets/icons/menu_home.svg" alt="" />
                              HOME 
                              </NavLink>
                          </li>
                          <li className={(headerData.currentpath==='/financials')?"nav-item active":"nav-item"}>
                            <NavLink activeclassname="active_header_navlink" className="nav-link" onClick={()=>setcurrentTab('/financials')}  to={"/financials"}>
                              <img className={(headerData.currentpath==='/financials')?'headerIconImgs':'headerIconImgs d-none'} src="/assets/icons/menu_company_fill.svg" style={{"height": "30px", "width": "43px"}} alt="" />
                              <img className={(headerData.currentpath!=='/financials')?'headerIconImgs':'headerIconImgs d-none'} style={{"height": "30px", "width": "43px"}} src="/assets/icons/menu_company.svg" alt="" /> 
                                FINANCIALS 
                              </NavLink>
                          </li>
                          <li className={(headerData.currentpath==='/forum')?"nav-item active":"nav-item"}>
                          <NavLink activeclassname="active_header_navlink" className="nav-link" onClick={()=>setcurrentTab('/forum')} to={"/forum"}>
                              <img className={(headerData.currentpath==='/forum')?'headerIconImgs':'headerIconImgs d-none'}  src="/assets/icons/forum_header_icon.svg" alt="" style={{"height": "30px", "width": "43px"}} />
                              <img className={(headerData.currentpath!=='/forum')?'headerIconImgs':'headerIconImgs d-none'}  src="/assets/icons/forum_header_icon.png" alt="" style={{"height": "30px"}} />
                                FORUM
                              </NavLink>
                          </li>
                          <li className={(headerData.currentpath==='/news')?"nav-item active":"nav-item"}>
                          <NavLink activeclassname="active_header_navlink" className="nav-link" onClick={()=>setcurrentTab('/news')}  to={"/news"}>
                              <img className={(headerData.currentpath==='/news')?'headerIconImgs':'headerIconImgs d-none'}  src="/assets/icons/menu_news_fill.svg" alt="" style={{"height": "30px", "width": "43px"}} />
                              <img className={(headerData.currentpath!=='/news')?'headerIconImgs':'headerIconImgs d-none'}  src="/assets/icons/menu_news.png" alt="" style={{"height": "30px"}} />
                                NEWS 
                              </NavLink>
                          </li>
                          <li className={(headerData.currentpath==='/searches')?"nav-item active":"nav-item"}>
                          <NavLink activeclassname="active_header_navlink" className="nav-link" onClick={()=>setcurrentTab('/searches')}  to={"/searches"}>
                              <img className={(headerData.currentpath==='/searches')?'headerIconImgs':'headerIconImgs d-none'}  src="/assets/icons/menu_search_fill.png" alt="" style={{"height": "30px", "width": "30px"}} />
                              <img className={(headerData.currentpath!=='/searches')?'headerIconImgs':'headerIconImgs d-none'}  src="/assets/icons/menu_search.png" alt="" style={{"height": "30px", "width": "30px"}} />
                                SEARCH 
                              </NavLink>
                          </li> 
                        </> 
                      
                        </ul>
                      </div>
                     {IsUserLogin ? <div className='float-right row headerprofile'>
                          <NotificationBell/>
                            <Chip 
                                onClick={handleClick} 
                                id="headerprofile_chip"
                                className='float-right headerprofile_chip'
                                avatar={<a onClick={(e)=>e.preventDefault()} href="about:blank" className='nolink' style={{"height": "32px", "width":"32px"}}><Avatar style={{"height": "32px", "width":"32px"}} alt={username?.charAt(0)} src={profileImg} /> </a>   }
                                label={<><a onClick={(e)=>e.preventDefault()} href="about:blank" className='nolink'>{username}</a><img className='headerprofile_chip_dropod'  onClick={handleClick}  htmlFor="headerprofile_chip" srcSet={base_url+"/assets/icons/Dropdown.svg"} /></>}
                                variant="outlined"
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined} />
                      </div> : <><Button onClick={()=>navigate('/login')}>Login</Button><Button onClick={()=>navigate('/singup')}>Sign Up</Button></> }
                    </nav>
                  {IsUserLogin ? <Headermenu profileImg={profileImg} username={username} anchorEl={anchorEl} open={open} handleClose={handleClose} setIsUserLogin={setIsUserLogin}/> : <></>}
              </div>
          </div>
            
        </>
    );
}

export default Header;
