import  React, {useState, useEffect} from 'react';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/material/styles';
    
const Label = styled('label')({
        display: 'block',
});
    
const Input = styled('input')(({ theme }) => ({
    width: 200,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
}));
    
const Listbox = styled('ul')(({ theme }) => ({
    width: '92%',
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 200,
    fontSize: '14px',
    border: '1px solid rgba(0,0,0,.25)',
        '& li[data-focus="true"]': {
            backgroundColor: '#4a8df6',
            color: 'white',
            cursor: 'pointer',
        },
        '& li:active': {
            backgroundColor: '#2977f5',
            color: 'white',
        },
}));

const Forumselect = ({forums}) => {
        
        const [ForumListArray, setForumListArray] = useState(forums);
       
        const {
            getRootProps,
            getInputLabelProps,
            getInputProps,
            getListboxProps,
            getOptionProps,
            groupedOptions,
        } = useAutocomplete({
            id: 'use-autocomplete-demo',
            options: ForumListArray,
            getOptionLabel: (option) =>{
                return option.content;
            } 
        });
    
        function replaceAll(string, search, replace) {
            return string.split(search).join(replace);
        }
    
        return (
            <div>
                <div {...getRootProps()} className='row search_input_box_ForumPage'>
                    <div className="col-2 col-md-1">
                        <img className='search_icon_r' alt="" srcSet="/assets/icons/search_icon_light.svg" />
                    </div>
                    <div className="col-10 col-md-11">
                        <input {...getInputProps()} autoFocus={true} className='search_input_ForumPage ' placeholder='Search' />
                    </div>
                </div>
                
                {groupedOptions.length > 0 ? (
                    <Listbox {...getListboxProps()}>
                        {groupedOptions.map((option, index) => (
                            <div key={index} style={{"display":"flex", "height":"35px", "alignItems":"center"}}>
                                 <li style={{"textOverflow": "ellipsis", "fontSize": "12px", "color": "grey", "lineHeight": "1.5em", "height": "1.6em", "overflow" : "hidden"}} {...getOptionProps({ option, index })}>{option.content}</li>
                            </div>
                        ))}
                    </Listbox>
                ) : null}
            </div>
        );
    }
    
export default Forumselect;
