import React from 'react';


const Documentdetailppopup = ({isDetailModalShow, Document_title, Document_details}) => {
    return (
        <div className="modal fade" id="documentDetailPoppup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div style={{"background":"#70c8ee", "color":"white"}} className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">{Document_title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body documentModalBody">
               {Document_details}
            </div>
            </div>
        </div>
        </div>
       
    );
}

export default Documentdetailppopup;
