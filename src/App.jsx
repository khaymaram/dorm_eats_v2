import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import OpenRecipe from './components/OpenRecipe';
import StartPage from './components/StartPage';
import supabase from './supabase-client';


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<StartPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/recipe/:id" element={<OpenRecipe />} />
        </Routes>
      </BrowserRouter>
      
  );
}

export default App;
