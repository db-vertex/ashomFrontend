import React, { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { getFlag } from '../API/LocalStore';
import { getCompaniesByCountry, userEventAPI } from '../API/Userapis';
import { useDispatch } from 'react-redux';
import { setForumNewsModalData } from '../reducers/ForumNewsModalReducer';

function CompanySearch(props) {
    const [items, setitems] = useState([]);
    const [SearchStr, setSearchStr] = useState('');
    const dispatch = useDispatch();
      useEffect(() => {
        getCompaniesByCountry('0', '', '0').then(metas => {
            metas = metas.map(meta=> ({ ...meta, name: meta.Company_Name }));
            setitems(metas)
        });
    }, []);
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    return false;
  }
  

  const handleOnHover = (result) => {
    // the item hovered
  }

  const handleOnSelect = (item) => {
    dispatch(setForumNewsModalData({visibility:true, details:item}));
    userEventAPI('search_company');
  }

  const handleOnFocus = () => {
  }

  const formatResult = (item) => {
    return (
      <>
        <div style={{"transform":"translateX(0px)"}} className="row pl-1">
            <div className="col-1">
                <img style={{"maxWidth":"30px"}} src={getFlag(item.Country)} alt="" />
            </div>
            <div className="col-11 pl-2">
                <div className="row">
                    <div className="col-md-12">
                        {item.Country+" - "+((item.Reference_No!=0)?(item.Reference_No+" - "):"")+item.SymbolTicker+" | "+item.Company_Name}
                    </div>
                </div>
            </div>
        </div>
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <div {...props}>   
          <ReactSearchAutocomplete
            items={items}
            style="text-transform:uppercase"
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            placeholder="Search Companies"
            showIcon={true}
            onFocus={handleOnFocus}
            fuseOptions={{
              keys: ["Company_Name", "Country", "SymbolTicker", "Reference_No", "industry"],
              shouldSort: true,
              // includeScore: 1,
              threshold: 0.2,
              includeScore: 0,
              // includeMatches: false,
              // location: 0,
              // distance: 1,
              // useExtendedSearch: true,
              // sortFn: (value)=>{
              //   console.log(value);
              //   return false
              // },
              findAllMatches: false,
              // getFn: (value)=>{
              //   console.log(value);
              // },
              // maxPatternLength: 100,
              minMatchCharLength: 0,
              isCaseSensitive: true
            }}
            autoFocus
            styling={{
                height: "34px",
                borderRadius: "4px",
                backgroundColor: "white",
                boxShadow: "none",
                border: "1px solid #aaa",
                hoverBackgroundColor: "#72C4F1",
                color: "#444",
                fontSize: "12px",
                fontFamily: "Courier",
                iconColor: "#aaa",
                lineColor: "#aaa",
                placeholderColor: "#bbb",
                clearIconMargin: "0px 8px 0 0",
                zIndex: 2,
              }}
              formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  )
}

export default CompanySearch