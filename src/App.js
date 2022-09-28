import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import ChartsList from './ChartsList';
import NotFound from './NotFound';
import About from './About'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/lista' element={[<TopBar/>,<About/>]}/>
        <Route path='/' element={[<TopBar/>,<ChartsList/>]}/>
        <Route path='/:channelName' element={[<TopBar/>,<ChartsList/>]}/>
        <Route path='*' element={[<TopBar/>,<NotFound/>]}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
