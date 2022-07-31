import { Avatar, Card, CardContent,  CardActionArea, CardHeader, CardMedia, Typography, CardActions, Button, IconButton } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {setLikeUnlikeForum, setDislikeUnDislikeForum, setForumShares, timeSince, votePollApi, deleteForumAPI} from '../API/Userapis';
import { showsharemodal } from '../reducers/ShareBtnModalReducer';
import { useConfirm } from 'material-ui-confirm';

const Pollpost = (props) => {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const {setForumDetailId, polldata} = props;
    const {id, forumalldata,  first_name, last_name, options, profile_img, liked, isMine, disliked, share_count,  total_comments, content, content_image, total_messages, total_liked, total_disliked, total_shares, created} = polldata;
    const form_id = id;
    const time = timeSince(new Date(created).setTime(new Date(created).getTime() - ((new Date().getTimezoneOffset() / 60) * 60 * 60 * 1000)));
    const username = first_name+last_name;
    const url_link = ((content.split("@")).length>1)?content.split("@")[1]:"";
    const content_txt = content.split("@")[0];
    const [Liked, setLiked] = useState(liked);
    const [Disliked, setDisliked] = useState(disliked);
    const [TotalLiked, setTotalLiked] = useState(total_liked);
    const [TotalDisliked, setTotalDisliked] = useState(total_disliked);
    const [TotalShares, setTotalShares] = useState(share_count);
    const [Option1Voters, setOption1Voters] = useState(0);
    const [Option2Voters, setOption2Voters] = useState(0);
    const [Option3Voters, setOption3Voters] = useState(0);
    var Option1CVoters = 0;
    var Option2CVoters = 0;
    var Option3CVoters = 0;
    const share_url_txt = `Hi you are using Ashom.App. Please download app(Here is playstore link) \n \nForum: \n${content} \n 1. ${options.option1} \n 2. ${options.option2} ${options.option3!==''?"\n 3. "+options.option3:""}`;


    const [PollResult, setPollResult] = useState(false);
    
    useEffect(() => {
        Option1CVoters = parseInt(options.total_option1_voters);
        Option2CVoters = parseInt(options.total_option2_voters);
        Option3CVoters = parseInt(options.total_option3_voters);

        setOption1Voters(parseInt(options.percentage_option1_voters));
        setOption2Voters(parseInt(options.percentange_option2_voters));
        setOption3Voters(parseInt(options.percentage_option3_voters));

    }, []);

    const handleLike = () =>{
        if(Liked==false){
            setDisliked(false);
            setTotalLiked(parseInt(TotalLiked)+1)
        } 
        else{
            setTotalLiked(parseInt(TotalLiked)-1)
        }

        if(Disliked){
            setTotalDisliked(parseInt(TotalDisliked)-1)
        }

        setLiked(Liked?false:true);
        setLikeUnlikeForum(form_id)
    }

    const handleDislike = () =>{
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

    const handleShare = () =>{
        dispatch(showsharemodal({isShow:true, shareUrl:share_url_txt, link:url_link }));
        setTotalShares(parseInt(TotalShares)+1);
        setForumShares(form_id);
    }


    const handleComment = () =>{
        setForumDetailId(polldata);
    }

    const sendPollVote = (option) =>{
        votePollApi(form_id, option).then(meta=>{
            if(meta.status){
                switch (option) {
                    case 1:{
                        Option1CVoters++;
                        calculateVoters();
                        break;
                    }
                    case 2:{
                        Option2CVoters++;
                        calculateVoters();
                        break;
                    }
                    case 3:{
                        Option3CVoters++;
                        calculateVoters();
                        break;    
                    }
                    default:
                        break;
                }
            }
            else{
                alert(meta.message);
            }

        
        })
    }

    const calculateVoters = () =>{
       
       if(options.option3!==''){
            let total_voters = Option1CVoters+Option2CVoters+Option3CVoters;
            setOption1Voters(Option1CVoters>0?(Option1CVoters*100/total_voters):0);
            setOption2Voters(Option2CVoters>0?(Option2CVoters*100/total_voters):0);
            setOption3Voters(Option3CVoters>0?(Option3CVoters*100/total_voters):0);
        }
        else{
            let total_voters = Option1CVoters+Option2CVoters;
            setOption1Voters(Option1CVoters>0?(Option1CVoters*100/total_voters):0);
            setOption2Voters(Option2CVoters>0?(Option2CVoters*100/total_voters):0);
        }
    }

    const delete_poll_handler = () =>{
        confirm({ description: 'Are you really want to delete this poll?', title: 'Delete Poll' })
        .then(() => {
         deleteForumAPI(form_id).then(meta =>{
            if(meta.status){
                props.handlerefreshfourms();
            }
        })
       })
      .catch(() => {

        });
    }

    return (
        <>
        <Card className='forumpostcard'>
        <CardContent  style={{"padding":"0", "paddingTop":"10px", "paddingLeft":"4px"}}>
           <div className="row">
            <div className="col-md-1 col-2">
                <Avatar className='forumpostitem_avatar'  alt={(username)?username[0]:''} src={profile_img} />
            </div>
            <div className="col-md-11 col-10">
               <div className="row">
                <div className="col-md-10 col-12">
                <Typography variant='h6' style={{"height": "13px", "fontSize":"15px"}}>{username}</Typography>
                <Typography style={{"color":"grey", "fontSize":"11px"}} variant='span'>{time}</Typography><br/>
                <Typography style={{"fontSize":"13px", "display": "-webkit-box", "WebkitLineClamp": "2", "WebkitBoxOrient": "vertical", "textOverflow": "ellipsis", "overflow": "hidden"}} variant='span'>{content_txt}</Typography>
                <Typography className='forumpost_link' variant='span'><a target="_black"  style={{"color":"rgb(80 185 242)"}} href={url_link}>{url_link}</a></Typography>
                </div>
                {(isMine)?(<div className="col-2 edit_delete_forum_btn_bx justify-content-end">
                   <a href="about:blank" className='nolink' onClick={(e)=>e.preventDefault()}><img src="/assets/icons/delete_forum.svg" className='edit_delete_forum_btn' onClick={delete_poll_handler}/></a>
                </div>):""}
                </div> 
                </div> 
                </div> 
                </CardContent> 
                <div className="row">
            <div className="col-md-11 offset-md-1  col-12">   
            <CardContent className="p-0" height="300"> 
              <div className="container">
                  <div className="row">
                        <div className="pollprogressbar">
                        <CardActionArea onClick={()=>sendPollVote(1)} style={{"height":"100%", "borderRadius":"10px"}}>
                            <span className='poloptionpercentage1'><b>{options.option1}</b></span>   
                            <span className='poloptionpercentage2'><b>{(Option1Voters+"%")}</b></span>   
                            <div className="pollprogress" style={{"--mywidth":(Option1Voters+"%")}}>
                            </div>
                            </CardActionArea>
                        </div>
                        
                  </div> 
                  <div className="row">
                      <div className="pollprogressbar">
                      <CardActionArea onClick={()=>sendPollVote(2)} style={{"height":"100%", "borderRadius":"10px"}}>
                            <span className='poloptionpercentage1'><b>{options.option2}</b></span>   
                            <span className='poloptionpercentage2'><b>{(Option2Voters+"%")}</b></span>
                            <div className="pollprogress" style={{"--mywidth":(Option2Voters+"%")}}>
                        </div>
                    </CardActionArea>
                    </div>
                  </div>
                  {(options.option3!=='')?(
                  <div className="row">
                        <div className="pollprogressbar">
                        <CardActionArea onClick={()=>sendPollVote(3)} style={{"height":"100%", "borderRadius":"10px"}}>
                            <span className='poloptionpercentage1'><b>{options.option3}</b></span>   
                            <span className='poloptionpercentage2'><b>{(Option3Voters+"%")}</b></span>
                            <div className="pollprogress" style={{"--mywidth":(Option3Voters+"%")}}>
                            </div>
                            </CardActionArea>
                        </div>
                  </div>):("")}
              </div>
            </CardContent> 
            </div>
            </div>
            
            <div className='row forum_action_btn_devider'> 
            <div className="col-md-11 offset-md-1">
            <CardActions style={{"padding": "0px", "marginTop":"5px"}}>
                <div className="forumactionbtns d-flex flex-column justify-content-center text-center">
                <IconButton onClick={handleComment}>
                    <img style={{"height":"20px"}} srcSet='/assets/icons/comments.png'/>
                </IconButton><span>{total_comments}</span></div>
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

export default Pollpost;
