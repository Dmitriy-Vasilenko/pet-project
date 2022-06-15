import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@mui/system';

import { Post } from '../Post';

import GlobalContest from '../../context/globalContext';
import { Button, Pagination, PaginationItem, Stack, Typography } from '@mui/material';

export const PostList = () => {
    const {postsAll, posts, pageQty, page, setPage} = useContext(GlobalContest);

    return (
        <Container component='main' maxWidth='lg' sx={{mt: {sm: 12, xs: 21}, mb: 5}}>
            {/* <Container component='div' sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                <Typography variant='h5'>Создай свой уникальный пост!</Typography>
                <Button variant='outlined' color='inherit'>Создать пост</Button>
            </Container> */}
            <Container 
                component='div'  
                sx={{
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'space-around',
                    mb: 2
                }}
            >
                {posts && posts.map((post) => <Post key={post._id} post={post}/>)}
            </Container>
            <Stack spacing={2}>
                <Pagination
                    page={page} 
                    count={pageQty}
                    onChange={(_, num) => setPage(num)} 
                    showFirstButton 
                    showLastButton
                    sx={{mx: 'auto'}}
                    renderItem={
                        (item) => (
                            <PaginationItem 
                                component={Link}
                                to={`/?page=${item.page}`}
                                {...item}
                            />
                        )
                    }
                />
            </Stack>
        </Container>
    )
}
