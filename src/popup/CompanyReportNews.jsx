import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';

const Companyreportnews = (props) => {
    const {GoToReports, GoToNews, CompanyImage, CompanyName, CompanyId, isDocumentDialog, setisDocumentDialog} = props;
    
    const [open, setOpen] = React.useState(isDocumentDialog);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setisDocumentDialog(true)
      };
    
      const handleClose = () => {
        setisDocumentDialog(false)
      };

     const imageClick = () => {
         
      };      

    return (
       
        <Dialog
            fullScreen={fullScreen}
            open={isDocumentDialog}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">
            <div className="row w-100">
                <div className="col-2"></div>
                <div className="col-8 d-flex justify-content-center">

                <img  style={{"height":"40px", "maxHeight":"40px"}} src={CompanyImage} alt="" srcSet="" />     
                  <span>{CompanyName}</span>
                </div>
                <div className="col-2">
                <IconButton style={{"position":"absolute", "top":"0"}} onClick={handleClose}>
                    <CloseIcon />
                 </IconButton>
                </div>
            </div>
         
        </DialogTitle>
        <DialogContent>
        <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="modalpopusContainer">
                             <div>   
                            <img src="./assets/icons/FinancialStatement.png" alt=""  />
                            </div>
                             <span>Financial Statements</span>   
                            </div>
                        </div>
                        <div className="col-md-6">
                        <div className="modalpopusContainer">
                        <div>   
                            <img src="./assets/icons/newsIcon.png" alt=""  />
                            </div>
                             <span>News</span>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
      </Dialog>
       
    );
}

export default Companyreportnews;
