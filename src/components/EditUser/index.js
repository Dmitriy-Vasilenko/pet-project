import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Container, Paper, Typography, TextField, Box, Button, Avatar } from '@mui/material';

import GlobalContext from '../../context/globalContext';
import { useApi } from '../../hooks/useApi';

export const EditUser = () => {
  const navigate = useNavigate();
  const { page, user, setUser } = useContext(GlobalContext);
  const api = useApi();

  const [inputAvatar, setInputAvatar] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputAbout, setInputAbout] = useState('');

  const toBack = () => {
    navigate(`/?page=${page}`);
  };

  const resetInputAvatar = () => {
    setInputAvatar('');
  };

  const saveAvatar = () => {
    api.editAvatarUser({ avatar: inputAvatar })
    .then((data) => setUser(data))
    .catch((err) => alert(err));
  };

  const saveUser = () => {
    api.editCurrentUser({ name: inputName.trim(), about: inputAbout.trim() })
    .then((data) => setUser(data))
    .catch((err) => alert(err));
  };

  useEffect(() => {
    if (user) {
        setInputAvatar(user.avatar);
        setInputName(user.name);
        setInputAbout(user.about);
    }
  }, [user])

  return (
    <Container component='main' maxWidth='sm' sx={{my: 12}}>
        <Paper sx={{mx: 3, display: 'flex', flexDirection: 'column', gap: 2, p: 2}}>
            <Typography variant='h4'>Редактирование пользователя</Typography>
            <Box component='div'>
                <TextField 
                    fullWidth 
                    inputProps={{maxLength: '1000'}} 
                    label='Ссылка на аватар'
                    value={inputAvatar} 
                    type='url'
                    name='inputAva'
                    sx={{mb: 2}}
                    onChange={(event) => {setInputAvatar(event.target.value)}}
                />
                <Box component='div' sx={{mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
                    <Avatar src={inputAvatar || user?.avatar} sx={{width: '100px', height: '100px'}}/>
                    <Box component='div' sx={{display: 'flex', gap: 1}}>
                        <Button size='small' color='inherit' onClick={resetInputAvatar}>Отмена</Button>
                        <Button size='small' onClick={saveAvatar}>Сохранить</Button>
                    </Box>
                </Box>
            </Box>
            <TextField 
                fullWidth 
                inputProps={{maxLength: '300'}} 
                label='Имя'
                value={inputName} 
                type='text'
                onChange={({ target }) => setInputName(target.value)}
            />
            <TextField 
                fullWidth 
                inputProps={{maxLength: '300'}} 
                label='Доп. информация'
                value={inputAbout} 
                type='text'
                onChange={({ target }) => setInputAbout(target.value)} 
            />
            <Box component='div' sx={{display: 'flex', gap: 1.5, justifyContent: 'flex-end'}}>
                <Button variant='outlined' onClick={toBack}>Назад</Button>
                <Button variant='contained' onClick={saveUser}>Сохранить</Button>
            </Box>
        </Paper>
    </Container>
  )
}
