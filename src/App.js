import React from 'react';
import './App.css';
import Chart from './Chart'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {streams: [], streamerAvatars: {
      bonkol: 'https://static-cdn.jtvnw.net/jtv_user_pictures/b84ee5dd-cb4e-4c55-8f50-22d14cbb61cc-profile_image-300x300.png', 
      kasix: 'https://static-cdn.jtvnw.net/jtv_user_pictures/882fd15c-f59b-4b81-be59-5bfe0422b89f-profile_image-150x150.png',
      spiralusgmt: 'https://static-cdn.jtvnw.net/jtv_user_pictures/12802718-2d2a-4dd0-bc52-ab4771b7da06-profile_image-150x150.png',
      kalach444: 'https://static-cdn.jtvnw.net/jtv_user_pictures/da13ba10-dabf-4de4-a0c5-e0876339f8bb-profile_image-150x150.png',
      inet_saju: 'https://static-cdn.jtvnw.net/jtv_user_pictures/0477eda1-3ced-4401-a8d0-141b9c5ab618-profile_image-150x150.png',
      ewroon: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ewroon-profile_image-13a9eaf00f468486-150x150.png'
    }, Channelsearch: '', sortOrder: 'oldToNew'}
    this.fetchStreams = this.fetchStreams.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
  }
  async fetchStreams(){
    try{
      const res = await fetch('https://pansprezynka.herokuapp.com/streams', {method: 'GET'})
      const parsedRes = await res.json()
      // console.log(parsedRes)
      this.setState({streams: parsedRes})
    }
    catch(error){
      console.log(error)
    }
  }
  componentDidMount(){
    this.fetchStreams()
  }
  handleChange(event){
    this.setState({Channelsearch: event.target.value})
  }
  handleSortChange(event){
    this.setState({sortOrder: event.target.value})
  }


  render(){
    if(this.state.sortOrder === 'newToOld') {this.state.streams.reverse()}
    const chartsList = this.state.streams.map((stream)=>{
      if(this.state.Channelsearch === ''){
        return <Chart stats={stream.stats} name={stream.channelName} key={stream._id} avatar={this.state.streamerAvatars[stream.channelName]} createdAt={stream.createdAt} updatedAt={stream.updatedAt}/>
      }
      if(this.state.Channelsearch === stream.channelName){
        return <Chart stats={stream.stats} name={stream.channelName} key={stream._id} avatar={this.state.streamerAvatars[stream.channelName]} createdAt={stream.createdAt} updatedAt={stream.updatedAt}/>
      }
    })
    return(
      <div className="app-container">
        <div className="top-bar">
              
              <span className='top-bar__input'>
                <input className='search-input' type={'text'} placeholder='Wyszukaj' onChange={this.handleChange} value={this.state.Channelsearch}></input>
              </span>
              <span className='top-bar__sort'>
                <select onChange={this.handleSortChange} value={this.state.sortOrder}>
                  <option value={'oldToNew'}>od najstarszych</option>
                  <option value={'newToOld'}>od najnowszych</option>
                </select>
              </span>
        </div>
        <div className="charts-container">
            {chartsList}
        </div>
      </div>
    )
  }
}

export default App;
