import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePages/HomePage';
import SubmitPostPage from './pages/SubmitPostPage/SubmitPostPage';
import CommentPage from './pages/CommentPage/CommentPage';
import EditPostPage from './pages/EditPostPage/EditPostPage';
import CommunityPage from './pages/CommunityPage/CommunityPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RedditPremium from './pages/RedditPremium/RedditPremium';
import SearchPages from './pages/SearchPages/SearchPages';
import Sildebar from './components/Sildebar/Sildebar';
import { useLocation } from 'react-router-dom'
import Popular from './pages/Popular/Popular';
function App() {
   const location = useLocation();
   let getpath=true

  console.log("pathName is: ",location.pathname)
  if(location.pathname==='/redditpremium' || location.pathname.startsWith('/community')){
    getpath=false
    console.log("Congrats you are premium page")
  }
  else{
    getpath=true
  }
  return (
    <div>
      <Navbar/>
      {getpath && <Sildebar/>}
      
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/submitpost" element={<SubmitPostPage/>} />
          <Route path="/comment/:postId" element={<CommentPage />} />
          <Route path='/editPost' element={<EditPostPage/>}/>
          <Route path="/community/:channelId" element={<CommunityPage />} />
          <Route path='/profile/:userId' element={<ProfilePage/>}/>
          <Route path="/redditpremium" element={<RedditPremium />} />
          <Route path="/search" element={<SearchPages />} />
          <Route path="/popular" element={<Popular />} />

      </Routes>
    </div>
  );
}

export default App;
