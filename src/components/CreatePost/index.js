import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import { Container, Paper, Typography, TextField, CardMedia, Box, Button } from '@mui/material';

import noFoto from '../../../public/assets/png/nofoto.png';
import GlobalContext from '../../context/globalContext';
import { useApi } from '../../hooks/useApi';

export const CreatePost = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputText, setInputText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [inputTags, setInputTags] = useState('');
  const { page, setPostsAll } = useContext(GlobalContext);
  const navigate = useNavigate();
  const api = useApi();

  const toBack = () => {
    navigate(`/?page=${page}`);
  };

  const handleSubmit = () => {
    if (inputTitle === '' || inputText === '' || inputUrl === '' || inputTags === '') {
        alert('Заполните все обязательные поля')
    } else {
        api.addPost({
            title: inputTitle,
            text: inputText,
            image: inputUrl,
            tags: inputTags
        })
        .then((data) => {
            setPostsAll((prevState) => [...prevState, data]);
            navigate(`/?page=${page}`);
        })
        .catch((err) => alert(err))
    }
  };

  return (
    <Container component='main' maxWidth='md' sx={{my: 12}}>
        <Paper sx={{mx: 3, display: 'flex', flexDirection: 'column', gap: 2, p: 2}}>
            <Typography variant='h4'>Создание поста</Typography>
            <TextField 
                fullWidth 
                inputProps={{maxLength: '1000'}} 
                label='Ссылка на изображение' 
                type='url'
                required
                onChange={({ target }) => {setInputUrl(target.value.trim())}}
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
                type='text'
                required
                onChange={({ target }) => {setInputTitle(target.value.trim())}}
            />
            <TextField 
                fullWidth 
                inputProps={{maxLength: '5000'}} 
                multiline  
                rows={4} 
                label='Текст поста' 
                type='text'
                required
                onChange={({ target }) => {setInputText(target.value.trim())}}
            />
            <TextField 
                fullWidth 
                inputProps={{maxLength: '300'}} 
                label='Введите теги через запятую' 
                type='text'
                onChange={({ target }) => {setInputTags(target?.value.trim().split(','))}} 
            />
            <Typography variant='caption'>* - поля, обязательные для ввода</Typography>
            <Box component='div' sx={{display: 'flex', gap: 1.5, justifyContent: 'flex-end'}}>
                <Button variant='outlined' onClick={toBack}>Отмена</Button>
                <Button variant='contained' onClick={handleSubmit}>Создать</Button>
            </Box>
        </Paper>
    </Container>
  )
}
