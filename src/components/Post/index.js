import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Button, Box, Popover, ButtonGroup } from '@mui/material';

import { red } from '@mui/material/colors';

import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';

import { useApi } from '../../hooks/useApi';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import GlobalContext from '../../context/globalContext';

export const Post = ({post}) => {
  const navigate = useNavigate();
  const { user, setPostsAll, page } = useContext(GlobalContext);
  const isInUser = post?.author._id === user?._id;
  const [favorite, setFavorite] = useState(post?.likes || []);
  const [anchorEl, setAnchorEl] = useState(null);
  const isInFavorite = favorite.includes(user?._id);
  const api = useApi();

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickRead = () => {
    navigate(`post/${post?._id}`)
  };

  const handlePostEdit = () => {
    navigate(`/post/edit/${post?._id}`);
  };

  const handleDeletePost = () => {
    api.deletePost(post?._id)
    .then(api.getPostsAll()
        .then((data) => {
            setPostsAll(data);
            navigate(`/?page=${page}`);
        })
        .catch((err) => alert(err))
    )
    .catch((err) => alert(err));
  };

  const addFavorite = () => {
    api.addLike(post?._id)
    .then((data) => setFavorite(data.likes))
    .catch((err) => alert(err.message))
  };

  const deleteFavorite = () => {
    api.deleteLike(post?._id)
    .then((data) => setFavorite(data.likes))
    .catch((err) => alert(err.message))
  };



  return (
    <Card sx={{ width: 345, mb: 3 }}>
      <CardHeader
        avatar={
          <Avatar src={post?.author.avatar} sx={{ bgcolor: red[500] }} aria-label="recipe"/>
        }
        action={isInUser &&
          <Box>
            <IconButton aria-label="settings" aria-describedby={id} onClick={handleClick}>
                <MoreVertIcon />
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
          </Box>
        }
        title={
            <Typography 
                noWrap={true} 
                sx={{maxWidth: {xs: '120px', sm: '225px'}}}
            >
                {post?.author.name}
            </Typography>
        }
        subheader={dayjs(post?.created_at).locale('ru').format('DD MMMM YYYY, HH:mm')}
      />
      <CardMedia
        component="img"
        height="194"
        image={post?.image}
        alt="Фото"
      />
      <CardContent>
        <Typography noWrap={true} sx={{maxWidth: '225px'}}>
            {post?.title}
        </Typography>
        <Typography align='justify' variant="body2" color="text.secondary" sx={{height: '60px', overflow: 'hidden'}}>
          {post?.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{justifyContent: 'space-between'}}>
        <Box component='div'>
            {isInFavorite ?
                (<IconButton onClick={deleteFavorite} color='error' aria-label="add to favorites">
                    <FavoriteIcon />
                    <Typography sx={{ml: 1}}>
                        {favorite?.length}
                    </Typography>
                </IconButton>) :
                (<IconButton onClick={addFavorite} aria-label="add to favorites">
                    <FavoriteIcon />
                    <Typography sx={{ml: 1}}>
                        {favorite?.length}
                    </Typography>
                </IconButton>)
            }
            <IconButton sx={{cursor: 'default'}} aria-label="share" disableRipple={true}>
                <CommentIcon/>
                <Typography sx={{ml: 1}}>
                    {post?.comments.length}
                </Typography>
            </IconButton>
        </Box>
        <Button size="small" color='inherit' onClick={handleClickRead}>Читать</Button>
      </CardActions>
    </Card>
  )
}
