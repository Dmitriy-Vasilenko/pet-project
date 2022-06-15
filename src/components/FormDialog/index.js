import React, { useContext, useState } from 'react';

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import GlobalContext from '../../context/globalContext';

import { useApi } from '../../hooks/useApi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const FormDialog = () => {
    const { formDialogState, setFormDialogState, setUser } = useContext(GlobalContext);
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const { writeLS } = useLocalStorage();
    const api = useApi();

    const handleClose = () => {
        setFormDialogState(() => {
            return {isOpen: false};
        });
    };

    const signUp = () => {
        api.signUp({email: inputEmail, password: inputPassword})
        .then((createdUser) => {
            api.signIn({email: inputEmail, password: inputPassword})
            .then((dataSignIn) => {
                writeLS('token', dataSignIn.token);
                setUser(dataSignIn.data);
                setFormDialogState(() => {
                    return {isOpen: false};
                });
            })
            .catch((err) => alert(err))
        })
        .catch((err) => alert(err))
    };

    const signIn = () => {
        api.signIn({email: inputEmail, password: inputPassword})
        .then((dataSignIn) => {
            writeLS('token', dataSignIn.token);
            setUser(dataSignIn.data);
            setFormDialogState(() => {
                return {isOpen: false};
            });
        })
        .catch((err) => alert(err))
    };

    return (
        <div>
            <Dialog open={formDialogState.isOpen}>
                <DialogTitle>Регистрация и вход</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Для регистрации введите Email и пароль, или войдите с имеющимися Email и паролем
                </DialogContentText>
                <TextField
                    margin="dense"
                    id="name"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    required
                    onChange={({ target }) => setInputEmail(target.value)}
                />
                <TextField
                    margin="dense"
                    label="Пароль"
                    type="password"
                    fullWidth
                    variant="standard"
                    required
                    onChange={({ target }) => setInputPassword(target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={signUp}>Зарегистрироваться</Button>
                <Button onClick={signIn}>Войти</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
