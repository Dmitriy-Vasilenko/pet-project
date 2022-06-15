import React, { useContext, useState } from 'react';

import { Avatar, Divider, Typography, IconButton, Popover, Button } from '@mui/material';
import { Box } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import GlobalContext from '../../context/globalContext';

import { useApi } from '../../hooks/useApi';

export const Comments = ({ comment, setItem }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {user} = useContext(GlobalContext);
  const api = useApi();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment =() => {
    api.deleteComment(comment.post, comment._id)
    .then((data) => {
        setItem(data);
        setAnchorEl(null);
    })
    .catch((err) => alert(err));
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
        <Box 
            component='div' 
            sx={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                gap: 1.5, 
                mx: 2, 
                my: 1
            }}
        >
            <Box component='div' sx={{display: 'flex', gap: 1.5, alignItems: 'center', maxWidth: '300px'}}>
                <Box component='div'>
                    <Avatar src={comment.author.avatar} alt='avatar'/>
                </Box>
                <Box component='div'>
                    <Typography >
                        {comment.author.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                    {dayjs(comment.created_at).locale('ru').format('DD MMMM YYYY, HH:mm')}
                    </Typography>
                </Box>
            </Box>
            {(comment.author._id === user?._id) &&
            <Box component='div'>
                <IconButton aria-describedby={id} onClick={handleClick}>
                    <MoreVertIcon/>
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                >
                    <Button 
                        size='small' 
                        color='inherit' 
                        sx={{px: 2, py: 1}} 
                        onClick={handleDeleteComment}
                    >
                        Удалить комментарий
                    </Button>
                </Popover>
            </Box>}
        </Box>
        <Typography variant='body2' sx={{ml: 8.5, maxWidth: '300px'}} align='justify' gutterBottom>
            {comment.text}
        </Typography>
        <Divider variant='inset'/>
    </>
  )
}
