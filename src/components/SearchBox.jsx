import React, { useEffect, useState } from 'react'
import { Search } from '@mui/icons-material';
import { getFlag } from '../API/LocalStore';
import { getCompaniesByCountry, userEventAPI } from '../API/Userapis';
import { useDispatch } from 'react-redux';
import { setForumNewsModalData } from '../reducers/ForumNewsModalReducer';

const SearchBox = () => {
    var inputs = document.querySelectorAll('input');
    const dispatch = useDispatch();
    const [items, setitems] = useState([]);
    const [FilteredItems, setFilteredItems] = useState([]);
    const [SearchStr, setSearchStr] = useState('');

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('focus', function(){
            this.parentNode.appendChild(document.querySelector('.dropdown'));
        });
    }

    useEffect(() => {
        getCompaniesByCountry('0', '', '0').then(metas => {
            metas = metas.map(meta=> ({ ...meta, name: meta.Company_Name }));
            setitems(metas)
            setFilteredItems(metas);
        });
    }, []);

    const handleOnSelect = (item) => {
        dispatch(setForumNewsModalData({visibility:true, details:item}));
        userEventAPI('search_company');
      }

    const handleSearch = (e) =>{
        var string = e.target.value;
        setSearchStr(string);
        var CapString = string.charAt(0).toUpperCase() + string.slice(1);
        var UpperString = string.toUpperCase();
        let filtered = items.filter(item => ((item.Country.search(UpperString)>=0)||(item.Company_Name.toUpperCase().search(string.toUpperCase())>=0)||(item.SymbolTicker.toUpperCase().search(string.toUpperCase())>=0)||(item.Reference_No.search(string)>=0)||(item.industry.search(string)>=0)));
        setFilteredItems(filtered);
    }

    return (
        <div className="seachboxHome_outer">
            <div className="holder" >
              <Search className='seachboxHome_icon'/><input type="text" className='seachboxHome_input' placeholder='Search companies' onChange={(e)=>handleSearch(e)} value={SearchStr} />
            </div>
            <div className="dropdown">
                {
                    FilteredItems.slice(0, 15).map((item, index) => {
                        return (
                            <div className="seachboxHome_item" key={index} onClick={()=>handleOnSelect(item)}>
                                <img className='seachboxHome_flag' alt="" src={getFlag(item.Country)} />
                                <span className='seachboxHome_name'>
                                    {item.Country+" - "+((item.Reference_No!=0)?(item.Reference_No+" - "):"")+item.SymbolTicker+" | "+item.Company_Name}
                                </span>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    );
}

export default SearchBox;
