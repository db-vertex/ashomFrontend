import React from 'react';

function SearchList({item, isHighlighted}) {
    return <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
        {item.label}
    </div>;
}

export default SearchList;
