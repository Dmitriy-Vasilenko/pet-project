import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Box, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import GlobalContext from '../../context/globalContext';

export const Search = () => {
  const { setSearchQuery, setPage } = useContext(GlobalContext);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    setSearchText('');
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
    setPage(1);
    navigate('/?page=1');
  };

  useEffect(() => {
    setSearchQuery(searchText);
  }, [searchText])

  return (
    <Box component='div' sx={{position: 'relative'}}>
        <Box 
            component='input'
            type='text'
            placeholder='Поиск'
            value={searchText}
            sx={{
                border: 'none', 
                borderRadius: '25px', 
                outlineStyle: 'none', 
                lineHeight: '10px', 
                height: '35px',
                width: {md: '400px'},
                pl: '15px',
                pr: '30px',
                backgroundColor: 'whitesmoke',
                ':focus': {
                    border: '1px solid grey'
                }
            }}
            onChange={handleChange}
        />
        <IconButton 
            disableRipple={true} 
            sx={{position: 'absolute', right: '10px', py: 1, px: 0}} 
            onClick={handleClick}
        >
            {searchText && <CancelIcon fontSize='small'/>}
        </IconButton>
    </Box>
  )
}
