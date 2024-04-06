import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePages/HomePage';
import SubmitPostPage from './pages/SubmitPostPage/SubmitPostPage';
function App() {
  return (
    <div>
      <Navbar/>
      
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/submitpost" element={<SubmitPostPage/>} />

      </Routes>
    </div>
  );
}

export default App;
