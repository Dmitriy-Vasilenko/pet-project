import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Container, Paper, Typography, TextField, CardMedia, Box, Button } from '@mui/material';

import noFoto from '../../../public/assets/png/nofoto.png';
import GlobalContext from '../../context/globalContext';
import { useApi } from '../../hooks/useApi';

export const EditPost = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputText, setInputText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [inputTags, setInputTags] = useState('');
  const [post, setPost] = useState(null);
  const { page, setPostsAll } = useContext(GlobalContext);
  const navigate = useNavigate();
  const params = useParams();
  const api = useApi();

  const toBack = () => {
    navigate(`/?page=${page}`);
  };

  const editPostInfo = {
    title: inputTitle.trim(),
    text: inputText.trim(),
    image: inputUrl.trim(),
    tags: inputTags
  };

  const handleSubmit = () => {
    if (inputTitle === '' || inputText === '' || inputUrl === '' || inputTags === '') {
        alert('Заполните все обязательные поля')
    } else {
        api.editPost(params.postID, editPostInfo)
        .then((data) => {
            setPost(data);
            setPostsAll(prevState => [...prevState]);
            navigate(`/?page=${page}`);
        })
        .catch((err) => alert(err))
    }
  };

  useEffect(() => {
    api.getPost(params.postID)
    .then((data) => setPost(data))
    .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    if (post) {
        setInputTitle(post.title);
        setInputText(post.text);
        setInputUrl(post.image);
        setInputTags(post.tags);
    }
  }, [post])

  return (
    <Container component='main' maxWidth='md' sx={{my: 12}}>
        <Paper sx={{mx: 3, display: 'flex', flexDirection: 'column', gap: 2, p: 2}}>
            <Typography variant='h4'>Редактирование поста</Typography>
            <TextField 
                fullWidth 
                inputProps={{maxLength: '1000'}} 
                label='Ссылка на изображение'
                value={inputUrl}
                type='url'
                onChange={({ target }) => {setInputUrl(target.value)}}
            />
            <CardMedia
                component="img"
                image={inputUrl || noFoto}
                alt="Ваше изображение не загрузилось"
                sx={{width: '300px', mx: 'auto'}}
            />
            <TextField 
                fullWidth 
                inputProps={{maxLength: '300'}} 
                label='Заголовок поста'
                value={inputTitle}
                type='text'
                onChange={({ target }) => {setInputTitle(target.value)}}
            />
            <TextField 
                fullWidth 
                inputProps={{maxLength: '5000'}} 
                multiline  
                rows={4} 
                label='Текст поста'
                value={inputText}
                type='text'
                onChange={({ target }) => {setInputText(target.value)}}
            />
            <TextField 
                fullWidth 
                inputProps={{maxLength: '300'}} 
                label='Введите теги через запятую'
                value={inputTags} 
                type='text'
                onChange={({ target }) => {setInputTags(target?.value.split(','))}} 
            />
            <Box component='div' sx={{display: 'flex', gap: 1.5, justifyContent: 'flex-end'}}>
                <Button variant='outlined' onClick={toBack}>Отмена</Button>
                <Button variant='contained' onClick={handleSubmit}>Сохранить</Button>
            </Box>
        </Paper>
    </Container>
  )
}
