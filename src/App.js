import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import ChartsList from './ChartsList';
import NotFound from './NotFound';
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={[<TopBar/>,<ChartsList/>]}></Route>
      <Route path='/:channelName' element={[<TopBar/>,<ChartsList/>]}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
