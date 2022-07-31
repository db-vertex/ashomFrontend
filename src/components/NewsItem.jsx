import React from 'react';
import { Grid } from '@material-ui/core';
import { Card, CardMedia, CardContent, Typography, Link } from '@mui/material';
import {timeSince, userEventAPI} from '../API/Userapis';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showsharemodal } from '../reducers/ShareBtnModalReducer';
import {setnewssharedata} from '../reducers/NewsShareReducer';
import { getUserToken } from '../API/LocalStore';
import { useConfirm } from 'material-ui-confirm';

const Newsitem = (props) => {
    const {image, title, description, url_link, size, date, created} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const confirm = useConfirm();

    const share_url_txt = `Hi you are using Ashom.App. Please download app(Here is playstore link) \n \nNews: \nKSA Business: Muqassa seals major Saudi clearing cooperation deal - Gulf Digital News \n ${url_link}`;

    const sharetoforum = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        const token = getUserToken();
        if(!token){
            navigate('/login', {state: {
                redirect_url: window.location.pathname
            }});
        }
        else{
            dispatch(setnewssharedata({active:true, title : description, link : url_link, image : image}));
            navigate('/forum/addforum');
        }
    }
   
    return (
        <>
  
        <Grid className='newsItemBox'  item xs={12} md={3} >
        <a style={{"textDecoration":"none"}} target="blank" onClick={()=>userEventAPI(`view_news_detail_click`)} href={url_link}>  
        <div className="newsItemIcons">
            <div className="newsItemIconsdIV">
                <div className="newsItemIconsLink"  href='/forum' onClick={(e)=>sharetoforum(e)}>
                    <img  alt="" srcSet="/assets/icons/forum_icon_news.svg" />
                </div>
                <div className="newsItemIconsLink" to="/login"  href='/news'
                    onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(showsharemodal({isShow:true, shareUrl:share_url_txt, link:url_link }));}}>
                <img style={{"width":"18px", "height":"18px"}} src="/assets/icons/share.svg" className="githubIcon" />
                </div>    
            </div>
        </div>
        <Card>
            <CardMedia
                className='news_media_image'
                component="img"
                height="154"
                onError={e => { e.target.src = "/assets/icons/placeholder.png"; }}
                image={image}
                alt={title}>
            </CardMedia>   
            <CardContent className='newscarddescbox' >
            <div className="row">  
             <div className="col-md-5 order-md-2 ">
               <Typography className="newstimingtext" style={{ "fontWeight": "200", "fontSize": "10px", "textAlign": "right" }}>
                  {timeSince(new Date(date))}
               </Typography>
              </div>
            <div className="col-md-7 order-md-1">
                <Typography style={{"fontWeight":"400", "display": "-webkit-box", "WebkitLineClamp": "1", "WebkitBoxOrient": "vertical", "textOverflow": "ellipsis", "overflow": "hidden", "fontSize":"12px"}}>
                {title}
                </Typography></div>
               
                </div>
            <Typography style={{"fontSize":"12px", "color":"grey", "lineHeight": "1.5em", "height": "3em", "overflow" :"hidden"}}>
                {description}
            </Typography>
            {/* <Link href={url_link} style={{"textDecorationLine":"none"}}>{url_link}</Link> */}
            </CardContent> 
            </Card>    
            </a>
         </Grid>
         
        </>
    );
}

export default React.memo(Newsitem);
