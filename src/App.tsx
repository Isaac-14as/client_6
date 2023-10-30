import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Subscriptions from './components/subscriptions/Subscriptions';
import Entry from './components/auth/Entry';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { subAPI } from './services/subService';
import LoginUserForm from './components/auth/LoginUserForm';
import RegisterUserForm from './components/auth/RegisterUserForm';
import Profile from './components/auth/Profile';
import SubPage from './components/subscriptions/SubPage';
import Trainer from './components/trainers/Trainer';
import StartPage from './components/startPage/startPage';

function App() {
  const {data: subI} = subAPI.useGetAllSubQuery({})
  console.log(subI)
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>

        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/entry/*" element={<Entry />} />
          <Route path="/sub" element={<Subscriptions subs={subI} />} />
          <Route path="/sub/:id" element={<SubPage subs={subI} />} />
          <Route path="/trainers" element={<Trainer />} />
        </Routes>

        <Footer/>
      </div>
    </BrowserRouter>



  );
}

export default App;
