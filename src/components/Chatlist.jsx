import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import MoreIcon from '@mui/icons-material/MoreVert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import {deleteCommentApi, getForumComments, timeSince} from '../API/Userapis';

const Chatlist = (props) => {
    const {profile_pic, comment, created, id, in_reply, isMine, name, replied_to, replies} = props.chatdata;
    const {ForumData, setForumComments, setisEditing, setEditingText, setEditingCommentId, setReplayCommentId, setReplayText, setisReplaying} = props;
    var created_at = new Date(created);
    created_at.setHours(created_at.getHours() + 5);
    created_at.setMinutes(created_at.getMinutes() + 30);
    created_at.setSeconds(created_at.getSeconds());
    created_at = timeSince(created_at);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleEditBtn =(e) =>{
    setisEditing(true);
    setEditingText(comment);
    setEditingCommentId(id);
    handleClose(e);
    // getForumComments(ForumData.id).then(meta => {
    //     ForumData.total_comments = meta.length;
    //     setForumComments(meta)
    // })
    }

  const deleteComment = (e) =>{
    deleteCommentApi(id).then(meta =>{
        getForumComments(ForumData.id).then(meta => {
            ForumData.total_comments = meta.length;
            setForumComments(meta)
        })
    })
    handleClose(e);
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handlereplay = () =>{
    setisReplaying(true);
    setReplayCommentId(id);
    setReplayText("Reply: "+name+"- ");
  }

    return (
        <>
           <div className="container chatlist_container">
               <div className="row">
                   <div className="col-1">
                   <Avatar
                      alt="A"
                      src={profile_pic}
                       sx={{ width: 40, height: 40 }}
                    />
                   </div>
                   <div className="col-9">
                       <div className="row">
                           <div className="col-md-12 chat_list_username" style={{"lineHeight":"0.5"}}>{name}</div>
                       </div>
                       <div className="row">
                           <div className="col-md-12 chat_list_message">{comment}</div>
                       </div>
                   </div>
                   <div className="col-2 ">
                       <div className="row">
                      {(isMine)?<IconButton
                            style={{"transform":"rotateZ(90deg)", "height":"5px"}}
                            ref={anchorRef}
                            id="composition-button"
                            aria-controls={open ? 'composition-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                        >
                        <MoreIcon />
                        </IconButton>:""}
                       </div>
                        <div className="row  commentreplaybox">
                            <button className='commentreplaybtnn' onClick={handlereplay}><span className='commentreplaybtn'>Reply</span></button>
                        </div>
                        <div className="row comment_timing_txt_box">
                            <span className='comment_timing_txt'>{created_at}</span>
                        </div>
                   </div>
               </div>
           </div>
           <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          style={{"z-index":"1"}}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    className='comment_menu_box'
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleEditBtn}><img srcSet="/assets/icons/editing.svg" style={{"marginRight":"10px"}}/>  Edit</MenuItem>
                    <MenuItem onClick={deleteComment}><img srcSet="/assets/icons/delete.svg" style={{"marginRight":"10px"}}/> Delete</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </>
    );
}

export default Chatlist;
