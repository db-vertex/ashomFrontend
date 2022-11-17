import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocumentUrl, getDocumentOpenName , getDocumentCompanySymbol} from "../API/LocalStore";
import { useDispatch } from 'react-redux';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { userEventAPI } from "../API/Userapis";
import { GAEvenet } from "../API/GoogleAnalytics";

export default function AllPages(props) {
  const [Pdfurl, setPdfurl] = useState('');
  const [PdfName, setPdfName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    GAEvenet();
    const doc_url = getDocumentUrl();
    if(!doc_url)
    navigate(-1);
    setPdfurl(encodeURI(getDocumentUrl()));
    const doc_name = getDocumentOpenName();
    const company_symbol = getDocumentCompanySymbol();
    setPdfName(doc_name);

    if(doc_name==='Income Statement')
      userEventAPI(`company_income_statement_${company_symbol}_view`); 
    if(doc_name==='Balance Sheet')
      userEventAPI(`company_balance_sheet_${company_symbol}_view`);
    if(doc_name==='Equity Statement')
      userEventAPI(`company_equity_statement_${company_symbol}_view`);
    if(doc_name==='Cash Flow Statement')
      userEventAPI(`company_cashflow_statement_${company_symbol}_view`);
    if(doc_name==='Comprehensive Statement')
      userEventAPI(`company_comprehensive_statement_${company_symbol}_view`);
    if(doc_name==='Notes')
      userEventAPI(`company_notes_${company_symbol}_view`);
    if(doc_name==='Annual Report')
      userEventAPI(`company_annual_report_${company_symbol}_view`);
    if(doc_name==='Financial Report')
      userEventAPI(`company_financial_report_${company_symbol}_view`);
  }, []);

  const handleBack = () =>{
    navigate(-1);
}

useEffect(() => {
  dispatch(setheadermenuData({currentpath:'/financials', headerfootershow:true}));
}, []);
  return (
    <>
    <div style={{"minHeight":"90vh"}}>
                <div className="container-fluid nopaddingcontainer mb-2">
                    <div className="container card section_divider">
                    <div className="row section_divider">
                            <div className="col-md-12">
                                <Button style={{"borderTopLeftRadius":"5px", "borderBottomLeftRadius":"5px", "transform":"translateX(-10px)"}} onClick={handleBack}> <span className="back_btn_txt2"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcSet="/assets/icons/Dropdown.svg" /> Back</span></Button>
                            </div>
                    </div>
                    <div className="row news_label_with_search_row pt-1" style={{"background": "#eeedef"}}>
                        <div className="col-md-6">
                        <label className='labelasheading'>{PdfName}</label><br/>     
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col-md-12 pb-3 pdfdocbox">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                        <div
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                height: '150vh',
                            }}
                        >
                            {Pdfurl!==''?(<Viewer fileUrl={Pdfurl} />):""}
                        </div>
                        </Worker>  
                        {/* {Pdfurl!==''?(<iframe height="90%" id="doc_viewr" className="doc_viewr" src={Pdfurl} aria-controls="false" title="Ashom Doc Viewer" frameBorder="0" ></iframe>):""} */}
            </div>
        </div>
      </div>
      </div>
      </div>
    </>
    );
}
