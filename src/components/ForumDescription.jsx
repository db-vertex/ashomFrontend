import React, {useState, useEffect} from 'react';
import { Button } from '@mui/material';
import Forumpost from './Forumpost';
import {timeSince, getForumComments, getCommentReplies, userEventAPI} from '../API/Userapis';
import Chatlist from '../components/Chatlist';
import Commentinput from './Commentinput';
import Pollpost from './PollPost';
import { NavLink, Route, Router, Routes, useNavigate } from 'react-router-dom';
import Backbutton from './Backbutton';
import { getUserToken } from '../API/LocalStore';

const Forumdescription = (props) => {
    const ForumData = props.forumalldata;
    const [CommentRepliesId, setCommentRepliesId] = useState(ForumData.id);
    const [CommentsReplies, setCommentsReplies] = useState([]);
    const token = getUserToken();
   
    const [isEditing, setisEditing] = useState(false);
    const [EditingText, setEditingText] = useState('');
    const [EditingCommentId, setEditingCommentId] = useState(0);

    const [isReplaying, setisReplaying] = useState(false);
    const [ReplayText, setReplayText] = useState('');
    const [ReplayCommentId, setReplayCommentId] = useState(0);

    const [isViewingReplies, setisViewingReplies] = useState(false);
    const [repliesOf, setrepliesOf] = useState('');
    const [repliedCount, setrepliedCount] = useState(0);
    const [defaultReplieID, setdefaultReplieID] = useState(0);
    const [repliesArr, setrepliesArr] = useState([]);

    const navigate = useNavigate();
    if(!token) navigate('/', {replace: true});
    const locationSplit = window.location.pathname.split('/')[3];
    const current_replies_count = (locationSplit)?locationSplit:0;

    useEffect(()=>{
        userEventAPI(`view_forum_detail_click`);
    if(current_replies_count>0){
        setisViewingReplies(true);
        setrepliedCount(current_replies_count);
        setrepliesOf(repliesArr[current_replies_count-1])
        setdefaultReplieID(repliesArr[current_replies_count-1].id)
        getCommentReplies(repliesArr[current_replies_count-1].id).then(meta =>{
            setCommentsReplies(meta);
        })
    }
    else{
        setisViewingReplies(false);
        setrepliedCount(0);
        setdefaultReplieID(ForumData.id);
        navigate("/forum")
    }

    if(current_replies_count!=repliedCount){
        setrepliedCount(current_replies_count);
    }
    }, [current_replies_count])

    const [ForumComments, setForumComments] = useState([]);
    const handleback = () =>{
        props.setForumDetailId('');
    }

    useEffect(() => {
       getForumComments(CommentRepliesId).then(meta => {
           setForumComments(meta)
       })
       
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [ForumData]);
    
   
    const handleRefreshReplies = () => {
        getCommentReplies(repliesOf.id).then(meta =>{
            setCommentsReplies(meta);
        })
    }
    
    const handlermorereplies = (chatdata) =>{
        setisViewingReplies(true);
        setrepliesOf(chatdata);
        navigate("/forum/replies/"+(parseInt(repliedCount)+1))
        setrepliedCount(parseInt(repliedCount)+1);
        getCommentReplies(chatdata.id).then(meta =>{
            setCommentsReplies(meta);
        })
        let replyarr = repliesArr;
        replyarr[current_replies_count]=chatdata;
        setrepliesArr(replyarr);
        setisViewingReplies(true);
        setReplayText("");
        setReplayCommentId(chatdata.id);
        setdefaultReplieID(chatdata.id);
        // alert(JSON.stringify(chatdata))
    }
    
    return (
        <>
            <div className="container">
                <div className="row" style={{"height":"30px", "marginTop":"8px"}}>
                <Button style={{"borderTopLeftRadius":"5px", "borderBottomLeftRadius":"5px"}} onClick={handleback}> <span className="back_btn_txt2"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcSet="/assets/icons/Dropdown.svg" /> Back</span></Button>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        
                        {(ForumData.forum_type==="forum")?(<Forumpost forumalldata={ForumData} setForumDetailId={ForumData.id} form_id={ForumData.id} username={ForumData.first_name+' '+ForumData.last_name} profile_img={ForumData.profile_pic} 
                            time={timeSince(new Date(ForumData.created))} content={ForumData.content} content_image={ForumData.content_image} 
                            url_link={"url"} total_messages={ForumData.total_comments} 
                            total_likes={ForumData.total_liked} total_dislikes={ForumData.total_disliked} 
                            total_shares={ForumData.share_count} 
                            liked={ForumData.liked} disliked={ForumData.disliked}/>
                                ):(<Pollpost  polldata={ForumData} setForumDetailId={ForumData.id} />)}   
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <label className='labelasheading'>Comments</label><br/> 
                    {
                    (!isViewingReplies)?(    
                        (ForumComments.length >0)?
                        (ForumComments.map(function (value, index, array) {
                            return (
                            <div className="chatlistdivouter">    
                            <Chatlist key={index} forumId={ForumData.id} setisEditing={setisEditing} setEditingText={setEditingText} setEditingCommentId={setEditingCommentId} setisReplaying={setisReplaying} setReplayText={setReplayText} setReplayCommentId={setReplayCommentId} chatdata={value} ForumComments={ForumComments} ForumData={ForumData} setForumComments={setForumComments}  />
                            {(value.in_reply)?((value.replies.length >0)?
                                (value.replies.map(function (replyvalue, index, array) {
                                    return (<div className='row'><div className="col-11 offset-1"><Chatlist key={index} forumId={ForumData.id} setisEditing={setisEditing} setEditingText={setEditingText} setEditingCommentId={setEditingCommentId} setisReplaying={setisReplaying} setReplayText={setReplayText} setReplayCommentId={setReplayCommentId} chatdata={replyvalue} ForumComments={ForumComments} ForumData={ForumData} setForumComments={setForumComments}  />
                                   {(replyvalue.in_reply)?( (<div className='morerepliesdiv'><span className='morerepliestxt' onClick={()=>handlermorereplies(replyvalue)}>more replies</span></div>)):""}
                                    </div></div>)
                                })):""
                                ):""}
                            </div>)
                        })):""):<>
                        <div className="row">
                            <div className="col backtoprevioustextdiv">
                                <span className='backtoprevioustext' onClick={()=>navigate(-1)}>&#60; Previous</span>
                            </div>
                        </div>
                        <Chatlist key={0} forumId={ForumData.id} setisEditing={setisEditing} setEditingText={setEditingText} setEditingCommentId={setEditingCommentId} setisReplaying={setisReplaying} setReplayText={setReplayText} setReplayCommentId={setReplayCommentId} chatdata={repliesOf} ForumComments={ForumComments} ForumData={ForumData} setForumComments={setForumComments}  />
                        
                        <div className="row">
                            <div className="col-md-11 offset-md-1">
                        
                             {(CommentsReplies.length >0)?
                        (CommentsReplies.map(function (value, index, array) {
                            return (
                            <div className="chatlistdivouter">    
                            <Chatlist key={index} forumId={ForumData.id} setisEditing={setisEditing} setEditingText={setEditingText} setEditingCommentId={setEditingCommentId} setisReplaying={setisReplaying} setReplayText={setReplayText} setReplayCommentId={setReplayCommentId} chatdata={value} ForumComments={ForumComments} ForumData={ForumData} setForumComments={setForumComments}  />
                            {(value.in_reply)?((value.replies.length >0)?
                                (value.replies.map(function (replyvalue, index, array) {
                                    return (<div className='row'><div className="col-11 offset-1"><Chatlist key={index} forumId={ForumData.id} setisEditing={setisEditing} setEditingText={setEditingText} setEditingCommentId={setEditingCommentId} setisReplaying={setisReplaying} setReplayText={setReplayText} setReplayCommentId={setReplayCommentId} chatdata={replyvalue} ForumComments={ForumComments} ForumData={ForumData} setForumComments={setForumComments}  />
                                   {(replyvalue.in_reply)?( (<div className='morerepliesdiv'><span className='morerepliestxt' onClick={()=>handlermorereplies(replyvalue)}>more replies</span></div>)):""}
                                    </div></div>)
                                })):""
                                ):""}
                            </div>)
                        })):""}
                         </div>
                        </div>  
                    </>
                    }
                    <Commentinput defaultReplieID={defaultReplieID} handleRefreshReplies={handleRefreshReplies} isViewingReplies={isViewingReplies} isEditing={isEditing} setisEditing={setisEditing} setEditingText={setEditingText} EditingText={EditingText} EditingCommentId={EditingCommentId} isReplaying={isReplaying} setisReplaying={setisReplaying} setReplayText={setReplayText} ReplayText={ReplayText} ReplayCommentId={ReplayCommentId} ForumComments={ForumComments} ForumData={ForumData} setForumComments={setForumComments} forumId={ForumData.id} setReplayCommentId={setReplayCommentId}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forumdescription;
