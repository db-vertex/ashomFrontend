import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Grid } from '@mui/material';
import { setForumNewsModalData } from '../reducers/ForumNewsModalReducer';
import { useDispatch} from 'react-redux';
import { userEventAPI } from '../API/Userapis';

const Companylistcard = ({CompanyImage, CompanyName, value, isSearched}) => {
    const dispatch = useDispatch();
    return (
        <>
        <Grid  item xs={6} md={2} 
        onClick={()=>{
            dispatch(setForumNewsModalData({visibility:true, details:value})); 
            if(isSearched)
            userEventAPI('search_company');
        }}
         >
         <CardActionArea>
             <Card style={{"height":"200px"}}>
           
                <CardContent
                    style={{"height":"100px"}}
                >
                <CardMedia
                    component="img"
                    image={CompanyImage}
                    alt={CompanyName}
                    onError={e => { e.target.src = "/assets/icons/placeholder.png"; }}
                    style={{"maxWidth":"100%", "maxHeight":"100px", "padding":"8px", "objectFit":"contain"}}
                />
                </CardContent>
                <CardContent>
                <Typography gutterBottom variant="span" style={{"textAlign":"center", "fontSize":"13px", "float":"bottom", "minHeight":"38px", "maxHeight":"38px"}} component="div">{CompanyName}</Typography>
                </CardContent>
            </Card>
            </CardActionArea>
            </Grid>
        </>
    );
}

export default React.memo(Companylistcard);
