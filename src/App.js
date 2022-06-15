import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import { useApi } from './hooks/useApi';
import { useLocalStorage } from './hooks/useLocalStorage';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PostList } from './components/PostList';
import { PostInfo } from './components/PostInfo';
import { CreatePost } from './components/CreatePost';
import { EditUser } from './components/EditUser';
import { EditPost } from './components/EditPost';
import { FormDialog } from './components/FormDialog';

import GlobalContext from './context/globalContext';

import './index.css';

export const App = () => {
  const [user, setUser] = useState(null);
  const [postsAll, setPostsAll] = useState(null);
  const [posts, setPosts] = useState(null);
  const location = useLocation();
  const [page, setPage] = useState(parseInt(location.search?.split('=')[1] || 1));
  const [pageQty, setPageQty] = useState(0);
  const [formDialogState, setFormDialogState] = useState({isOpen: false});
  const [searchQuery, setSearchQuery] = useState('');
  const { readLS } = useLocalStorage();
  const token = readLS('token');

  const api = useApi();

  useEffect(() => {
    if (!token) {
      setFormDialogState({isOpen: true});
    }
  }, []);

  useEffect(() => {
    if (token) {
      api.getUser()
      .then((user) => setUser(user))
      .catch((err) => alert(err.message))
    }
  }, [])

  useEffect(() => {
    if (token) {
      api.getPostsAll()
      .then((posts) => setPostsAll(posts))
      .catch((err) => alert(err.message))
    }
  }, [])

  // useEffect(() => {
  //   if (token) {
  //     api.getPosts(page)
  //     .then((data) => {
  //       setPosts(data.posts)
  //       setPageQty(Math.ceil(data.total/12))
  //     })
  //     .catch((err) => alert(err.message))
  //   }
  // }, [page, postsAll, user])

  useEffect(() => {
    if (token) {
      api.search(page, searchQuery)
      .then((data) => {
        setPosts(data.posts)
        setPageQty(Math.ceil(data.total/12))
      })
      .catch((err) => alert(err))
    }
  }, [searchQuery, user, page, postsAll])

  return (
    <GlobalContext.Provider value={{
      postsAll, setPostsAll,
      user, setUser,
      posts, setPosts,
      page, setPage,
      pageQty, setPageQty,
      formDialogState, setFormDialogState,
      searchQuery, setSearchQuery
    }}>
      <div className='app'>
        <FormDialog/>
        <Header/>
        <Routes>
          <Route path='/' element={<PostList/>}/>
          <Route path='post/:postID' element={<PostInfo/>}/>
          <Route path='post/create' element={<CreatePost/>}/>
          <Route path='user/edit' element={<EditUser/>}/>
          <Route path='post/edit/:postID' element={<EditPost/>}/>
        </Routes>
        <Footer/>
      </div>
    </GlobalContext.Provider>
  )
}
