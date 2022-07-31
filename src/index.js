import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ConfirmProvider } from 'material-ui-confirm';
import TagManager from 'react-gtm-module'
import { GA_TRACKINGID, GTM_ID } from './API/Environment';
import ReactGA from 'react-ga';

const tagManagerArgs = {
    gtmId: GTM_ID,
    // dataLayer: {
    //     userProject: 'project'
    // }
}
TagManager.initialize(tagManagerArgs);



ReactDOM.render( 
    <React.StrictMode >
        <Provider store = { store } >
            <ConfirmProvider >
                <BrowserRouter >
                    <App/>
                </BrowserRouter > 
            </ConfirmProvider> 
        </Provider> 
    </React.StrictMode > ,
    document.getElementById('root')
);
reportWebVitals();