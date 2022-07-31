import { Avatar, CardMedia, Typography } from '@material-ui/core';
import { CardActionArea, IconButton, Alert, Button, TextareaAutosize } from '@mui/material';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { getUserdata, postForumApi, postpollApi, updateForumApi, userEventAPI } from '../API/Userapis';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {setnewssharedata} from '../reducers/NewsShareReducer';
import { useNavigate } from 'react-router-dom';
import {setforumeditdata} from '../reducers/forumEditData';
import { getUserToken } from '../API/LocalStore';

const Addforumlayout = (props) => {
    const navigate = useNavigate();
    const [Userdata, setUserdata] = useState({});
    let username = Userdata.first_name+Userdata.last_name;
    const [SelectedTab, setSelectedTab] = useState('compose');
    const [ForumErrMessage, setForumErrMessage] = useState('');
    const [ForumImage, setForumImage] = useState('');
    const [ForumimageData, setForumimageData] = useState('');
    const hiddenFileInput = React.useRef(null);
    const [ContentText, setContentText] = useState('');
    const [ContentTextErr, setContentTextErr] = useState('');
    const [errorMessage, seterrorMessage] = useState('');
    const [successMessage, setsuccessMessage] = useState('');
    const [option1, setoption1] = useState('');
    const [option1_err, setoption1_err] = useState('');
    const [option2, setoption2] = useState('');
    const [option2_err, setoption2_err] = useState('');
    const [option3, setoption3] = useState('');
    const [option3_err, setoption3_err] = useState('');
    const [PollDuration, setPollDuration] = useState(7);
    const [isPollThirdInpShow, setisPollThirdInpShow] = useState(false);
    const [PostType, setPostType] = useState('');
    const [updateForumId, setupdateForumId] = useState(0);
    const [isHidePolling, setisHidePolling] = useState(false);
    const inputRef = useRef(null);
    const [ForumTitleLink, setForumTitleLink] = useState('');
    const token = getUserToken();
    if(!token) navigate('/', {replace: true});

    const onToggleInput = useCallback(() => {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(0, 0);
      }, []);

    const handleHiddeninputChange = (event) => {
        clearMessages();
        var file = event.target.files[0];
        let file_type = ((file['type']).split('/'))[0];
        setForumimageData(file);
        if (file_type === 'image') {
            var reader = new FileReader();
            var url = reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                setForumImage(reader.result);
            }.bind(this);
           
        }
        else {
            event.preventDefault();
            setForumErrMessage("File must be an image.");
            setForumImage('');
            setForumimageData('');
            return false;
        }
    }

    const shareForum = useSelector((state)=>state.sharenewsreducer.value);
    const editForum = useSelector((state)=>state.forumeditdata.value);

    function clearMessages(){
        setContentTextErr("");
        setForumErrMessage('');
        setsuccessMessage('');
        seterrorMessage('');
    }

    const handleForumSubmit = () =>{
        clearMessages();
        if (ContentText!==''){
            let Content_text = ContentText.replace(/\n\n+/g, '\n');

            if(Content_text.substring(0, 1)==='\n')
            Content_text = Content_text.slice(1);
            if(PostType==="editforum"){
            updateForumApi(Content_text+'@'+ForumTitleLink, ((ForumimageData) ? ForumimageData:''), updateForumId).then((meta) =>{
                if(meta.status){
                    setContentText('');
                    setForumImage('');
                    setForumimageData('');
                    setsuccessMessage(meta.message);
                    props.handlerefreshfourms();
                    navigate("/forum");
                }
                else{
                    seterrorMessage(meta.message);
                }
            })
        }
        else{
            postForumApi(Content_text+'@'+ForumTitleLink, ((ForumimageData) ? ForumimageData:'')).then((meta) =>{
                if(isHidePolling)
                    userEventAPI(`create_news_forum`);
                else
                    userEventAPI(`create_compose_forum`);
                if(meta.status){
                    setContentText('');
                    setForumImage('');
                    setForumimageData('');
                    setsuccessMessage(meta.message);
                    props.handlerefreshfourms();
                    navigate("/forum");
                }
                else{
                    seterrorMessage(meta.message);
                }
            })
          }
        }
        else{
            setContentTextErr("Please enter forum title");
        }
    }
    
    const removeimage = () =>{
        setForumImage("");
        setForumimageData("");
    }

    const handlePollSubmit = () =>{
        let validateForm = true;
        if (ContentText === '') {
            validateForm = false;
            setContentTextErr("Please enter poll question");
        }
        else{
            setContentTextErr("");
        }    
        if(option1===''){
            validateForm=false;
            setoption1_err("please enter option 1");
        }
        else{
            setoption1_err("");
        }
        if (option2 === '') {
            validateForm = false;
            setoption2_err("please enter option 2");
        }
        else {
            setoption2_err("");
        }
        if(isPollThirdInpShow){
        if (option3 === '') {
            validateForm = false;
            setoption3_err("please enter option 3");
        }
        else {
            setoption3_err("");
        }
    }
    else{
        setoption3("");
    }
        if (validateForm){
            postpollApi(ContentText, option1, option2, isPollThirdInpShow?option3:"", PollDuration).then((meta)=>{
                if (meta.status) {
                    userEventAPI(`create_poll_forum`);
                    setContentText('');
                    setoption1('');
                    setoption2('');
                    setoption3('');
                    setsuccessMessage(meta.message);
                    props.handlerefreshfourms();
                    navigate("/forum");
                }
                else {
                    seterrorMessage(meta.message);
                }
            })
        }
    }

    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        getUserdata().then(meta => {
            setUserdata(meta);
        });    
    }, []);
   
    useEffect(() => {
        if(shareForum.active){
            setSelectedTab("compose");
            setisHidePolling(true);
            setForumTitleLink(shareForum.link);
            setContentText("\n\n\n"+shareForum.title)
            setForumImage(shareForum.image)
            setForumimageData(shareForum.image)
            dispatch(setnewssharedata({active:false, title : "", link : "", image : ""}));
            inputRef.current.selectionStart=0;
            onToggleInput();
        }
    }, [shareForum]);

    useEffect(() => {
        if(editForum.active){
            var temp_arr = editForum.forumdata.content.split('@');
            setForumTitleLink(temp_arr.length>1?temp_arr[1]:'');
            setPostType('editforum');
            setisHidePolling(true);
            setupdateForumId(editForum.forumdata.id);
            setSelectedTab("compose");
            setContentText(temp_arr[0])
            setForumImage(editForum.forumdata.content_image);
            setForumimageData(editForum.forumdata.content_image);
            dispatch(setforumeditdata({active:false}));
            inputRef.current.selectionStart=0;
            onToggleInput();
        }
    }, [editForum]);

    const handleBack = () =>{
        navigate(-1);
    }

    return (
        <>
          <div className="container">
              <div className="row section_divider">
                    <div className="col-3 p-0">
                        <Button style={{"borderTopLeftRadius":"5px", "borderBottomLeftRadius":"5px", "transform": "translateX(-10px)"}} onClick={handleBack}> <span className="back_btn_txt2"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcSet="/assets/icons/Dropdown.svg" /> Back</span></Button>
                    </div>
                    <div className="col-8 d-flex align-content-end justify-content-end">
                        <label className='labelasheading'>Add Forum</label>
                    </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-xs-1">
                            <Avatar style={{"height":"35px", "width":"35px"}} className='forumadditem_avatar' alt={(username) ? username[0] : ''} src={Userdata.profile_pic} />                  
                        </div>
                        <div className="col-xs-11">
                            <Typography variant='span' className='forumadditem_username'>{username}</Typography>
                        </div>
                    </div>
                <div className="row">
                  <div className="col-md-10 offset-md-1 p-0"> 
                    <div className="row">
                        <div className="col-md-12">
                        <TextareaAutosize
                            className="addforuminput"
                            aria-label="minimum height"
                            minRows={4}
                            autoFocus 
                            placeholder="What's happening?"
                            value={ContentText}
                            ref={inputRef}
                            onChange={(e) => setContentText(e.target.value)}
                            style={{ width: "100%" }}
                        />
                                <span className="err_text">{ContentTextErr}</span>
                        </div>
                    </div>
                        <div className="row addforumradiogroupbox">
                            <div className="col-6 col-md-3 addforumradiogroup">
                                <input type="radio" id="compose_radio1" onClick={() => setSelectedTab('compose')} name="compose_radio" value="compose" checked={(SelectedTab ==='compose')?true:false} /><label for="compose_radio1" className='mb-0' style={{"transform": "translateY(-2px)"}}> Compose</label>
                        </div>
                        {isHidePolling?"":(
                            <div className="col-6 col-md-3 addforumradiogroup">
                                <input type="radio" id="compose_radio2" onClick={() => setSelectedTab('polling')} name="compose_radio" value="polling" checked={(SelectedTab === 'polling') ? true : false} /><label for="compose_radio2" className='mb-0'> Polling</label>
                            </div>
                            )}
                    </div>
                       
                    {
                       (SelectedTab==='compose')?(
                        <>
                          <div className="row uploadBtnForumAddBox">
                              <div className="col-md-12">
                                <input type="file" onChange={handleHiddeninputChange} id="forumFileInput" ref={hiddenFileInput} className="d-none" /><CardActionArea onClick={() => hiddenFileInput.current.click()}  style={{"width": "96px", "borderRadius": "25px"}}><button className="uploadBtnForumAdd">Upload</button></CardActionArea>
                                <span className="err_text">{ForumErrMessage}</span>
                              </div>
                          </div>  
                          {(ForumImage)?(<div className="row">
                              <div className="col-md-12">
                               {(PostType!=="editforum")?(<button className="forumUploadedDeleteBtn" onClick={() =>removeimage()}><CardActionArea style={{"borderRadius":"30px"}}><img className="forumUploadedDeleteBtnIcon"  src="/assets/icons/forumdeleteicon.png" /></CardActionArea></button>):""}
                                <CardMedia
                                  component="img"
                                  height="300"
                                  style={{"borderRadius": "5px"}}
                                  image={ForumImage}
                                  onError={e => { e.target.src = "/assets/icons/placeholder.png"; }}
                                  alt="Image here"
                                  ></CardMedia>
                              </div>
                          </div>):("")}
                         <div className="row ">
                              <div className="col-md-12 forumpostbtn_row">
                                    <CardActionArea onClick={handleForumSubmit} className="uploadBtnForumAddActionArea"><input className="uploadBtnForumAdd forumpostbtn" type="submit"  value="Post"/></CardActionArea>
                              </div>
                          </div>
                        </>
                       ):(
                           <>
                            <div className="container">
                                <div className="row">
                                    <div className="col-5">
                                        <div className="row">
                                        <select value={PollDuration} onChange={(e)=>setPollDuration(e.target.value)} className="poll_timing_select">
                                            <option value="1" >1 Day</option>
                                            <option value="3">3 Days</option>
                                            <option value="5">5 Days</option>
                                            <option value="7" selected>7 Days</option>
                                        </select>
                                        </div>
                                    </div>
                                   {(!isPollThirdInpShow)?(<div className="col-7 addRowInPollBtnBox">
                                        <div className="">
                                            <button id="addRowInPollBtn" onClick={()=>{setisPollThirdInpShow(true); setoption3("");}}  className="addRowInPoll">
                                                <img srcSet="/assets/icons/addforumrowbtn.png"/>
                                            </button>
                                            <span htmlFor="addRowInPollBtn" >Add New option</span>
                                        </div>
                                    </div>
                                ):("")} 
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <input type="text" onChange={(e)=>{setoption1(e.target.value)}} value={option1} className="pollOptionInput" placeholder="Option 1" />
                                            <span className="err_text">{option1_err}</span>
                                        </div>
                                        <div className="row">
                                            <input type="text" onChange={(e)=>{setoption2(e.target.value)}} value={option2} className="pollOptionInput" placeholder="Option 2" />
                                            <span className="err_text">{option2_err}</span>
                                        </div>
                                        {(isPollThirdInpShow)?(<div className="row">
                                            <input type="text" onChange={(e)=>{setoption3(e.target.value)}} value={option3} className="pollOptionInput" placeholder="Option 3" />
                                            <button className="pollOptionDeleteBtn" onClick={() => setisPollThirdInpShow(false)}><CardActionArea style={{"borderRadius":"30px"}}><img className="forumUploadedDeleteBtnIcon"  src="/assets/icons/forumdeleteicon.png" /></CardActionArea></button>
                                            <span className="err_text">{option3_err}</span>
                                        </div>):("")}
                                        
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-md-12 forumpostbtn_row">
                                        <CardActionArea onClick={handlePollSubmit} className="uploadBtnForumAddActionArea"><input className="uploadBtnForumAdd forumpostbtn" type="submit" value="Post" /></CardActionArea>
                                    </div>
                                </div>
                            </div>
                           </>
                       )
                   }   
                        <div className='row' style={{ "height": "50px" }}>
                            <div className='col-md-12'>
                                <Alert className={(errorMessage != '') ? '' : 'd-none'} severity="error">{errorMessage}</Alert>
                                <Alert className={(successMessage != '') ? '' : 'd-none'} severity="success">{successMessage}</Alert>
                            </div>
                        </div>
                       </div>
                    </div>
                  </div>
              </div>
          </div>
        </>
    );
}

export default Addforumlayout;
