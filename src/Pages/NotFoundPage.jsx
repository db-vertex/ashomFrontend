import React from 'react';
import { Link } from 'react-router-dom';

const Notfoundpage = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{"minHeight":"80vh"}}>
            <div className="page404_box">
                <img src="/assets/icons/error404.png"/>
                <h1>404</h1>
                <h3>Page Not Found</h3>
                <span>Want to go <Link reloadDocument={true} to='/login'>login page</Link>?</span>
            </div>
        </div>
    );
}

export default Notfoundpage;
