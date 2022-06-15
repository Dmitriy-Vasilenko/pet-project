import React, { useContext } from 'react';
import { useNavigate } from 'react-router';

import logo from '../../../public/assets/svg/logo.svg';
import GlobalContext from '../../context/globalContext';

import { Link } from '@mui/material';

export const Logo = () => {
  const { setPage } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setPage(1);
    navigate('/?page=1');
  }

  return (
    <Link onClick={handleClick} sx={{cursor: 'pointer'}}>
        <img src={logo} alt='logo' height='40'/>
    </Link>
  )
}
