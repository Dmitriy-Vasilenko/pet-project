import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Avatar, Button, Divider, Paper, Typography, IconButton, Input, Popover, ButtonGroup } from '@mui/material';
import { Box, Container } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { useApi } from '../../hooks/useApi';
import { Comments } from '../Comments';
import GlobalContext from '../../context/globalContext';

export const PostInfo = () => {
  const [item, setItem] = useState(null);
  const [commentsId, setCommentsId] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const api = useApi();
  const [inputComment, setInputComment] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const {user, page, postsAll, setPostsAll} = useContext(GlobalContext);
  const isInUser = item?.author._id === user?._id;

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePostEdit = () => {
    navigate(`/post/edit/${params.postID}`);
  };

  const handleDeletePost = () => {
    api.deletePost(params.postID)
    .then(api.getPostsAll()
        .then((data) => {
            setPostsAll(data);
            navigate(`/?page=${page}`);
        })
        .catch((err) => alert(err))
    )
    .catch((err) => alert(err));
  };

  const handleClickBack = () => {
    navigate(`/?page=${page}`);
  };

  const handleAddComment = () => {
    api.addComment(inputComment, params.postID)
    .then((data) => {
        setItem(data);
        setInputComment('');
    })
    .catch((err) => alert(err));
  };

  useEffect(() => {
    api.getComments(params.postID)
    .then((data) => setCommentsId(data))
    .catch((err) => alert(err));
  }, [item]);

  useEffect(() => {
    api.getPost(params.postID)
    .then((data) => setItem(data))
    .catch((err) => alert(err.message));
  }, []);

  return (
    <Container component='main' maxWidth='lg' sx={{my: 12}}>
        <Button 
            onClick={handleClickBack} 
            variant='outlined' 
            color='inherit'
            size='small' 
            sx={{ml: 3, mb: 1.5}}
        >
            <ArrowBackIcon fontSize='small'/>Назад
        </Button>
        <Paper sx={{mx: 3, display: 'flex', flexWrap: 'wrap', width: 'auto', height: 'auto'}}>
            <Box component='div' sx={{width: '700px', height: 'inherit'}}>
                <img src={item?.image} alt='Фото' width='100%' height='auto'/>
            </Box>
            <Box component='div' sx={{flexGrow: 1, mb: 2}}>
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
                            <Avatar src={item?.author.avatar} alt='avatar'/>
                        </Box>
                        <Box component='div'>
                            <Typography >
                                {item?.author.name}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                {dayjs(item?.created_at).locale('ru').format('DD MMMM YYYY, HH:mm')}
                            </Typography>
                        </Box>
                    </Box>
                    {isInUser &&
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
                            <ButtonGroup
                                orientation="vertical"
                                aria-label="vertical contained button group"
                                variant="text"
                                color='inherit'
                            >
                                <Button 
                                    key='one'
                                    size='small'  
                                    sx={{px: 2, py: 1}} 
                                    onClick={handleDeletePost}
                                >
                                    Удалить пост
                                </Button>
                                <Button
                                    key='two'
                                    size='small'  
                                    sx={{px: 2, py: 1}} 
                                    onClick={handlePostEdit}
                                >
                                    Редактировать пост
                                </Button>
                            </ButtonGroup>
                        </Popover>
                    </Box>}
                </Box>
                <Divider sx={{width: 'inherit'}}/>
                <Box component='div' sx={{maxWidth: '372px', mx: 2, my: 1}}>
                    <Typography variant='subtitle1' gutterBottom>
                        {item?.title}
                    </Typography>
                    <Typography align='justify' variant='body2' sx={{maxHeight: '300px', overflow: 'scroll'}}>
                        {item?.text}
                    </Typography>
                </Box>
                <Divider sx={{width: 'inherit'}}/>
                <Box component='div' sx={{maxHeight: '300px', overflow: 'scroll'}}>
                    {commentsId?.map((comment) => <Comments key={comment._id} comment={comment} setItem={setItem}/>)}
                </Box>
                <Box component='div' sx={{mx: 2, mt: 3, mb: 1}}>
                    <Input 
                        inputProps={{maxLength: '300'}} 
                        fullWidth maxRows={4} 
                        multiline={true} 
                        placeholder='Ваш комментарий'
                        value={inputComment}
                        sx={{fontSize: '15px'}}
                        onChange={({ target }) => setInputComment(target.value.trim())}
                    />
                </Box>
                <Button 
                    size='small' 
                    variant='outlined' 
                    color='inherit' 
                    sx={{ml: 2}}
                    onClick={handleAddComment}
                >
                    Добавить
                </Button>
            </Box>
        </Paper>
    </Container>
  )
}
