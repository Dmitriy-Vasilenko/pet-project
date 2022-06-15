import React, { useContext } from 'react';
import { useNavigate } from 'react-router';

import { AppBar, Toolbar, Container, Typography, Box, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';

import { Logo } from '../Logo';
import { Search } from '../Search';

import GlobalContext from '../../context/globalContext';

export const Header = () => {
  const { user, setUser, setPage, setPosts, setPostsAll, setFormDialogState } = useContext(GlobalContext);
  const navigate = useNavigate();

  const addPost = () => {
    navigate('post/create');
  };

  const editUser = () => {
    navigate('user/edit');
  };

  const logOutUser = () => {
    localStorage.removeItem('token');
    setPage(1);
    setUser(null);
    setPosts(null);
    setPostsAll(null);
    navigate('/?page=1');
    setFormDialogState(() => {
        return {isOpen: true};
    });
  };

  return (
    <AppBar position='fixed' sx={{backgroundColor: 'white'}}>
        <Container maxWidth='lg'>
            <Toolbar 
                sx={{
                    display: 'flex', 
                    justifyContent: 'space-between',
                    flexDirection: {xs: 'column', sm: 'row'},
                    gap: {xs: '10px', sm: 0},
                    py: {xs: '5px', sm: 0},
                }}
            >
                <Box 
                    component='div' 
                    sx={{
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '5px'
                    }}
                >
                    <Logo/>
                    <Typography variant='h5' sx={{color: 'black'}}>Posts</Typography>
                </Box>
                <Search/>
                <Stack direction="row" spacing={1}>
                    <Chip
                        icon={<AddIcon/>}
                        label='Создать пост'
                        clickable
                        variant='outlined'
                        sx={{mr: 2}}
                        onClick={addPost}
                    />
                    <Chip
                        avatar={<Avatar alt='M' src={user?.avatar} />}
                        label={user?.name}
                        clickable
                        variant='outlined'
                        onClick={editUser}
                    />
                    <Chip 
                        icon={<LogoutIcon/>}
                        label="Выйти" 
                        clickable
                        color='error'
                        variant='outlined'
                        onClick={logOutUser}
                    />
                </Stack>
            </Toolbar>
        </Container>
    </AppBar>
  )
}
