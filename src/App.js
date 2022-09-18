import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import ChartsList from './ChartsList';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { searchInputVal: '' }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  handleSearchSubmit(inputVal) {
    this.setState({ searchInputVal: inputVal })
  }


  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={[<TopBar onSearchSubmit={this.handleSearchSubmit} />, <ChartsList query={this.state.searchInputVal} />]} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
