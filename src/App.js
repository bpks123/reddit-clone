import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePages/HomePage';
import SubmitPostPage from './pages/SubmitPostPage/SubmitPostPage';
import CommentPage from './pages/CommentPage/CommentPage';
import EditPostPage from './pages/EditPostPage/EditPostPage';
import CommunityPage from './pages/CommunityPage/CommunityPage';
function App() {
  return (
    <div>
      <Navbar/>
      
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/submitpost" element={<SubmitPostPage/>} />
          <Route path="/comment/:postId" element={<CommentPage />} />
          <Route path='/editPost' element={<EditPostPage/>}/>
          <Route path="/community/:channelId" element={<CommunityPage />} />
          
      </Routes>
    </div>
  );
}

export default App;
