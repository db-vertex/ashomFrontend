import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Setselectdoc = () => {
    // http://localhost:3000/setselectdoc?companyid=2&year=Annual&period=2018
    const [searchParams, setSearchParams] = useSearchParams();
    sessionStorage.setItem('document_set_year', searchParams.get("year"));
    sessionStorage.setItem('document_set_period', searchParams.get("period"));
    window.location.href = '/company/'+searchParams.get("companyid");
    return (
        <div>
        
        </div>
    );
}

export default Setselectdoc;
