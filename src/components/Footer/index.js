import React from 'react';

import { Container } from '@mui/system';

export const Footer = () => {
  return (
    <Container 
        component='footer' 
        maxWidth='lg' 
        sx={{
            height: '50px', 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            py: 4
        }}
    >
        © Posts
    </Container>
  )
}
