import { Button, Grid } from '@mui/material';
import React from 'react';
import { Modal } from 'react-bootstrap';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  VKShareButton,
  VKIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";
import { userEventAPI } from '../API/Userapis';

const Sharebtnsmodal = (props) => {
   const {shareUrl, sharelink} = props;
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Share
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Grid container spacing={1} className="justify-content-around">
          <Grid item>
            <FacebookShareButton
              onClick={()=>userEventAPI('news_share')}
              url={sharelink}
              quote="From Ashom News"
              hashtag="#ashom.app">
              <FacebookIcon logoFillColor="white" />  
            </FacebookShareButton>
          </Grid>
          <Grid item>
            <WhatsappShareButton
              onClick={()=>userEventAPI('news_share')}
              url={shareUrl}
              quote="From Ashom News"
              hashtag="#ashom.app">
              <WhatsappIcon logoFillColor="white" />
            </WhatsappShareButton>
          </Grid>
          <Grid item>
          <EmailShareButton
              onClick={()=>userEventAPI('news_share')}
              url={shareUrl}
              quote="From Ashom News"
              hashtag="#ashom.app">
              <EmailIcon logoFillColor="white" />
            </EmailShareButton>
            </Grid>
        
          <Grid item>
            <RedditShareButton
              onClick={()=>userEventAPI('news_share')}
              url={shareUrl}
              quote="From Ashom News"
              hashtag="#ashom.app">
              <RedditIcon logoFillColor="white" />
            </RedditShareButton>
          </Grid>
         
          <Grid item>
            <VKShareButton
              onClick={()=>userEventAPI('news_share')}
              url={shareUrl}
              quote="From Ashom News"
              hashtag="#ashom.app">
              <VKIcon logoFillColor="white" />
            </VKShareButton>
          </Grid>
        </Grid>
        <div className="row">
          <div className="col-md-12 justify-content-center d-flex mt-3">
              <span style={{"fontSize":"12px", "color":"#555", "wordBreak": "break-all"}}>{sharelink}</span>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default Sharebtnsmodal;
