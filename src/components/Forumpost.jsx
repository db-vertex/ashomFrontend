import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography, CardActions, Button, IconButton } from '@mui/material';
import React, {useState} from 'react';
import {setLikeUnlikeForum, setDislikeUnDislikeForum, setForumShares, deleteForumAPI} from '../API/Userapis'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setforumeditdata} from '../reducers/forumEditData';
import { showsharemodal } from '../reducers/ShareBtnModalReducer';
import { useConfirm } from 'material-ui-confirm';
import { getUserToken } from '../API/LocalStore';

const Forumpost = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const confirm = useConfirm();
    const {form_id,  forumalldata, username, profile_img, time, content, content_image, total_messages, total_likes, total_dislikes, total_shares, setForumDetailId, handlerefreshfourms} = props;
    const url_link = ((content.split("@")).length>1)?content.split("@")[1]:"";
    const content_txt = content.split("@")[0];
    const [Liked, setLiked] = useState(props.liked);
    const [Disliked, setDisliked] = useState(props.disliked);
    const [TotalLiked, setTotalLiked] = useState(total_likes);
    const [TotalDisliked, setTotalDisliked] = useState(total_dislikes);
    const [TotalShares, setTotalShares] = useState(total_shares);
    const share_url_txt = `Hi you are using Ashom.App. Please download app(Here is playstore link) \n \nForum: \n${content} \n ${url_link}`;


    const handleLike = () =>{
        const token = getUserToken();
        if(!token)
        navigate('/login', {state: {
            redirect_url: window.location.pathname
        }});
        else{
            if(Liked==false){
                setDisliked(false);
                setTotalLiked(parseInt(TotalLiked)+1);
            } 
            else{
                setTotalLiked(parseInt(TotalLiked)-1);
            }

            if(Disliked){
                setTotalDisliked(parseInt(TotalDisliked)-1);
            }

            setLiked(Liked?false:true);
            setLikeUnlikeForum(form_id);
        }
    }

    const handleDislike = () =>{
        const token = getUserToken();
        if(!token){
            navigate('/login', {state: {
                redirect_url: window.location.pathname
            }});
        }
        else{
            if(Disliked==false){
                setLiked(false);
                setTotalDisliked(parseInt(TotalDisliked)+1)
            } 
            else{
                setTotalDisliked(parseInt(TotalDisliked)-1)
            }

            if(Liked){
                setTotalLiked(parseInt(TotalLiked)-1)
            }

            setDisliked(Disliked?false:true)
            setDislikeUnDislikeForum(form_id)
        }
    }

    const handleShare = () =>{
        const token = getUserToken();
        if(!token){
            navigate('/login', {state: {
                redirect_url: window.location.pathname
            }});
        }
        else{
            dispatch(showsharemodal({isShow:true, shareUrl:share_url_txt, link:url_link }));
            if(forumalldata.isMine)
            return false;
            setTotalShares(parseInt(TotalShares)+1);
            setForumShares(form_id);
        }
    }


    const handleComment = () =>{
        const token = getUserToken();
        if(!token){
            navigate('/login', {state: {
                redirect_url: window.location.pathname
            }});
        }
        else
        setForumDetailId(forumalldata);
    }

    const edit_forum_handler = () =>{
        dispatch(setforumeditdata({active:true, forumdata: forumalldata }));
        navigate("/forum/addforum")
    }

    const delete_forum_handler = () =>{
        confirm({ description: 'Are you really want to delete this Forum?', title: 'Delete Forum' })
        .then(() => { deleteForumAPI(form_id).then(meta =>{
            if(meta.status){
                props.handlerefreshfourms();
            }
        }) })
        .catch(() => { });
        
    }
    return (
        <>
        <Card className="forumpostcard">
             <CardContent  style={{"padding":"0", "paddingTop":"10px", "paddingLeft":"4px"}}>
               <div className='row'>
               <div className='col-md-1 col-2'>
                    <Avatar className='forumpostitem_avatar'  alt={(username)?username[0]:''} src={profile_img} />
               </div>  
               <div className='col-md-11 col-10'>
               <div className="row">
                <div className={(forumalldata.isMine)?"col-10":"col-md-12"}>
                <Typography variant='h6' style={{"height": "13px", "fontSize":"15px"}}>{username}</Typography>
                <Typography style={{"color":"grey", "fontSize":"11px"}} variant='span'>{time}</Typography><br/>
                <Typography className='forum_post_content' style={{"fontSize":"13px", "display": "-webkit-box", "WebkitLineClamp": "2", "WebkitBoxOrient": "vertical", "textOverflow": "ellipsis", "overflow": "hidden", "whiteSpace": "pre"}} variant='span'>{content_txt.replace(/\n\n+/g, '\n')}</Typography>
                <Typography className='forumpost_link' variant='span'><a target="_black"  style={{"color":"rgb(80 185 242)"}} href={url_link}>{url_link}</a></Typography>
                </div>
                {(forumalldata.isMine)?(<div className="col-2 edit_delete_forum_btn_bx">
                    <a href="about:blank" className='nolink' onClick={(e)=>e.preventDefault()}><img src="/assets/icons/edit_forum.png" className='edit_delete_forum_btn' onClick={edit_forum_handler}/></a>
                    <a href="about:blank" className='nolink' onClick={(e)=>e.preventDefault()}><img src="/assets/icons/delete_forum.svg" className='edit_delete_forum_btn' onClick={delete_forum_handler}/></a>
                </div>):""}
                </div> 
                </div> 
                </div> 
            </CardContent>  
            <div className="row">
            <div className="col-md-11 offset-md-1">
                <CardMedia
                    className={!content_image ? 'd-none' : 'forum_post_image'}
                    component="img"
                    height="300"
                    onError={e => { e.target.src = "/assets/icons/placeholder.png"; }}
                    image={content_image}
                    alt="Image not available"
                />  
                 </div>
                 </div>
                 <div className='row forum_action_btn_devider'> 
                 <div className="col-md-11 offset-md-1">
            <CardActions style={{"padding": "0px", "marginTop":"5px"}}>
                <div className="forumactionbtns d-flex flex-column justify-content-center text-center">
                <IconButton onClick={handleComment}>
                    <img style={{"height":"20px"}} srcSet='/assets/icons/comments.png'/>
                </IconButton><span>{total_messages}</span></div>
                <div className="forumactionbtns  d-flex flex-column justify-content-center text-center">
                <IconButton onClick={handleLike}>
                    {(Liked)?<img style={{"height":"20px"}} srcSet='/assets/icons/like_fill.png'/>
                            :<img style={{"height":"20px"}} srcSet='/assets/icons/like.png'/>}
                </IconButton><span>{TotalLiked}</span></div>
                <div className="forumactionbtns  d-flex flex-column justify-content-center text-center">
                <IconButton onClick={handleDislike}>
                    {(Disliked)?<img style={{"height":"20px"}} srcSet='/assets/icons/dislike_fill.png'/>
                            :<img style={{"height":"20px"}} srcSet='/assets/icons/dislike_.png'/>}
                </IconButton><span>{TotalDisliked}</span></div>
                <div className="forumactionbtns  d-flex flex-column justify-content-center text-center">
                <IconButton onClick={handleShare}>
                    <img style={{"height":"20px"}} srcSet='./assets/icons/share.png'/>
                </IconButton><span>{TotalShares}</span></div>
            </CardActions>  
            </div>
            </div>     
        </Card>
        </>
    );
}

export default Forumpost;
