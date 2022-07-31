import React, {useState, useEffect} from 'react';
import { Modal } from 'react-bootstrap';
import { getRemainsVisits, insertSearchAPI, userEventAPI } from '../API/Userapis';
import { useNavigate } from 'react-router-dom';
import { getFlag, getUserToken } from '../API/LocalStore';
import { Avatar, Chip } from '@mui/material';
import { useDispatch } from 'react-redux';
import 'bootstrap';
import { showsubscriptionmodal } from '../reducers/SubscriptionModalReducer';
import { useConfirm } from 'material-ui-confirm';


const ForumNewsModal = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const c_data = props.companydata;
    const Company_name = c_data.Company_Name;
    const Company_image = c_data.image;
    const Company_id = c_data.id;
    const Company_country = c_data.Country;
    const Delisted_date = c_data.DelistingDate;
    const isSuspended = (c_data.company_status==='Suspended');
    const [Remaining_count, setRemaining_count] = useState('');
    const [isSubscribed, setisSubscribed] = useState(false);
    const [Last_report, setLast_report] = useState("");
    const [isYearly, setisYearly] = useState(false);

    useEffect(() => {
        let searchstr = `CompanyName✂${c_data.Country}✂${c_data.SymbolTicker}✂${c_data.image}✂${c_data.Company_Name}✂${c_data.id}`;
        if(c_data.Country!=='')
        insertSearchAPI(searchstr);
        userEventAPI(`view_${c_data.Country}_${c_data.SymbolTicker}`);
        getRemainsVisits(c_data.SymbolTicker).then(meta =>{
            if(meta.status){
                setLast_report(meta.last_report);
                let visited_data = meta.visit_data;
                if(visited_data.max_companies==0){
                setisYearly(true); 
                }
                setRemaining_count((visited_data.remaining_visits)+' out of  '+(visited_data.max_companies));
                setisSubscribed(true);
            }
            else{
                setisSubscribed(setRemaining_count);
                setisSubscribed(false);
            }
        });
    }, [Company_name]);

    //Navigate to Financial Report
    const n_to_Financial_Report = (e) => {
        e.preventDefault();
        props.onHide();
        navigate("/company/"+Company_id);
    }

    const n_to_Company_news = (e) => {
        e.preventDefault();
        navigate("/companynews/"+Company_id);
        props.onHide();
    }

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
        <div className="container">
        <div className="row">
            <div className="col-sm-1  col-6 order-sm-1">
                <Chip
                    style={{"border":"none"}}
                    avatar={<Avatar alt={Company_country?Company_country[0]:"A"} src={getFlag(Company_country)} />}
                    label={Company_country}
                    variant="outlined"
                />
            </div>
            <div className="col-sm-1 col-6 order-sm-3">
                <button type="button" onClick={props.onHide} className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="col-sm-10 col-12 order-sm-2">
                <div className="row">
                    <div className="col-md-12 popup_company_box">
                        <img alt="" src={Company_image} srcSet={Company_image} />
                        <span className='d-flex align-items-center'>{Company_name}</span>
                    </div>
                </div>
            </div>           
        </div>
        </div>
        </Modal.Header>
        <Modal.Body className="pt-0">
        <div className="row  mb-3">
            <div className="col-md-12 delisted_txtc mb-0">
            {(!isYearly)?((isSubscribed)?(<span className='delisted_txtc mb-0'>Remaining Count : {Remaining_count}</span>):(<><span style={{"color":"red"}}>Remaining Count : 0 of 0</span>  </>)):""}
            {isSuspended?(<span className='float-end redx'>SUSPENDED</span>):""} 
            </div>  
            <div className="col-md-12 delisted_txtc mb-0">
                {Last_report?(<span className="last_released_text_modal">Last Released Report: {Last_report}</span>):""} 
                {Delisted_date?(<span className='redx'>DELISTED ON {Delisted_date}</span>):""} 
            </div>
        </div>

        <div className="row" style={{"display": "flex", "justifyContent": "space-evenly"}}>
            <a  href="about:blank"  className="nolink box_inner company_pop_r" style={{"TextDecoration":"none", "color":"inherit"}} onClick={(e)=>n_to_Financial_Report(e)}>
                <div className="round_company_circle">
                    <img alt="" srcSet="/assets/icons/FinancialStatement.png" />
                </div>
                <span>Financial Statements</span>
            </a>
            <a  href="about:blank"  className="nolink box_inner company_pop_r" style={{"TextDecoration":"none", "color":"inherit"}} onClick={(e)=>n_to_Company_news(e)}>
                <div className="round_company_circle">
                    <img alt="" srcSet="/assets/icons/newsIcon.png" />
                </div>
                <span>Company News</span>
            </a>
            </div>
            </Modal.Body>
            <Modal.Footer>
            <div className="row w-100">
            <div className="col-md-12 company_pop_r delisted_txt  mb-0">
                   {(!isYearly)?(<button onClick={()=>dispatch(showsubscriptionmodal({value:true}))} className="upgradebtnonpopup">Upgrade Subscription</button>):""}
                </div>
            </div>
            </Modal.Footer>
      </Modal>
    );
}

export default ForumNewsModal;
