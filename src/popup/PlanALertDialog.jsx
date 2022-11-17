import React from 'react';

const Planalertdialog = () => {
    return (
        <div>
            <div className='black_shde_back'>
              <div className="alert_dialog container">
                  <div className="row alert_dialog_title_box">
                      <div className="col-md-12 text-center">
                        <span className="alert_dialog_title">Alert</span>
                      </div>
                  </div>
                  <div className="alert_dialog_body row text-center">
                    <div className="col-md-12">
                      <span>Company limit over for Free plan</span>
                    </div>
                  </div>
                  <div className="alert_dialog_button_group row">
                      <div className="col-6 p-0">
                          <button className='alert_dialog_button btn1'>Cancel</button>
                      </div>
                      <div className="col-6 p-0">
                          <button className='alert_dialog_button btn2'>Upgrade</button>
                      </div>
                  </div>
              </div>
              </div>
        </div>
    );
}

export default Planalertdialog;
