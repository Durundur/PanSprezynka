import React from 'react'
import './ChartsList.css'
import Chart from './Chart'
import { Link } from 'react-router-dom'
import NotFound from './NotFound'
import Loading from './Loading'


class ChartsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { streams: [], requestStatus: '' }
    this.chartsView = this.chartsView.bind(this)
  }
  async fetchStreams(query) {
    if (query === undefined || query === null || query === ' ') {
      query = 'streams'
    }
    else {
      query = 'streams/user/' + query
    }
    try {
      this.setState({ requestStatus: 'loading' })
      const res = await fetch('https://pansprezynka-server.fly.dev/' + query, { method: 'GET' })
      if (res.ok) {
        const parsedRes = await res.json()
        let status
        parsedRes.length === 0 ? status = 'dataNotFound' : status = 'finished'
        this.setState({ streams: parsedRes, requestStatus: status })
      }
      else {
        this.setState({ streams: [], requestStatus: 'dataNotFound' })
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  componentDidMount() {
    this.fetchStreams(this.props.query)
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.fetchStreams(this.props.query)
    }
  }
  chartsView() {
    const status = this.state.requestStatus
    if (status === 'finished') {
      return <><h5><Link to={''}>Ostatnie streamy</Link></h5>{this.state.streams.map((stream) => {
        return <Chart key={stream._id} stats={stream.stats} name={stream.channelName} avatar={stream.channelImg} createdAt={stream.createdAt} updatedAt={stream.updatedAt} />
      })}</>
    }
    if (status === 'loading') {
      return <Loading />
    }
    else {
      return <NotFound />
    }
  }


  render() {
    // const chartsList = this.state.streams.map((stream) => {
    //   return <Chart key={stream._id} stats={stream.stats} name={stream.channelName} avatar={stream.channelImg} createdAt={stream.createdAt} updatedAt={stream.updatedAt} />
    // })



    return (
      <div className="charts-container">
        {/* {chartsList.length ? <><h5><Link to={''}>Ostatnie streamy</Link></h5>
          {chartsList}</> : <NotFound />} */}
        {this.chartsView()}
      </div>
    )
  }
}

export default ChartsList