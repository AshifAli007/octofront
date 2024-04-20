// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import LoginSignup from './components/LoginSignup';
import 'react-notifications-component/dist/theme.css'
import Home from './components/Home';
import './App.css';
import MainLayout from './components/MainLayout';
import Settings from './components/Settings';
import FileUpload from './components/FileUpload';
import Users from './components/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginSignup />} />
        <Route exact path="/home" element={<MainLayout><Home /></MainLayout>} />
        <Route exact path="/settings" element={<MainLayout><Settings /></MainLayout>} />
        <Route exact path="/fileupload" element={<MainLayout><FileUpload /></MainLayout>} />
        <Route exact path="/users" element={<MainLayout><Users /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
