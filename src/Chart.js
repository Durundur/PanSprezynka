import React from 'react';
import './Chart.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Outlet, Link } from "react-router-dom";



class Chart extends React.Component{
    constructor(props)
    {
        super(props)
        this.purple1= '#BF94FF'
        this.black1= "#1F1F23";
        this.white1="#EFEFF1";
        this.green1 = '#00db84'
        this.black2 = '#FFFFFF26'
        this.black3 = '#FFFFFF33'
        this.black4 = '#3e3e44'
        this.avgViewers = this.calculateAvg('currentViewers')
        this.avgChatters = this.calculateAvg('currentChatters')
        this.customTooltip = this.customTooltip.bind(this)
    }
    
    formatXAxis(tickItem){
        let date = new Date(tickItem)
        return date.getHours()+":"+date.getMinutes()
    }
    formatDate(date){
        return new Date(date).toLocaleString('en-GB', {timeZone: 'Europe/Warsaw'})
    }
    calculateAvg(type){
        let sum = 0
        let counter = 1
        for(let sample of this.props.stats){
            sum = sum + sample[type]
            counter++
        }
        return Math.round(sum/counter)
    }
    customTooltip({ active, payload, label }){
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip" style={{backgroundColor: '#3e3e44',color: '#EFEFF1', padding:'10px'}}>
              <p className="label">{label}</p>
              <p style={{color: '#BF94FF'}} className="label">{`Liczba widzów : ${payload[0].value}`}</p>
              <p style={{color: '#00db84'}} className="label">{`Liczba chattersów : ${payload[1].value}`}</p>
              <p className="label">{`Różnica : ${Math.round((payload[0].value - payload[1].value)/payload[0].value*100)}%`}</p>
            </div>
          );
        }
      
        return null;
      };

    render(){
        return(
            <div className="chart">
                <span className="chart__channel">
                    <span className='channel__logo-name'>
                        
                        <span className='channel__logo' style={{backgroundImage: `url(${this.props.avatar})`}}></span>
                        <span className='channel__name'>{this.props.name}</span>
                        
                    </span>
                    
                    <span className="chart__stream-time">{["Stream trwał od: ",this.formatDate(this.props.createdAt)," do ",this.formatDate(this.props.updatedAt)]}</span>

                    <span className='chart__stream-avg'>
                        <span>Średnia liczba widzów: {this.avgViewers}</span>
                        <span>Średnia liczba chattersów: {this.avgChatters}</span>
                        <span>Różnica: {this.avgViewers - this.avgChatters + ' ('+Math.round((this.avgViewers - this.avgChatters)/this.avgViewers*100) + '%)'}</span>
                    </span>
                </span>
                
                    <ResponsiveContainer minHeight="350px" >
                        <LineChart
                            data={this.props.stats}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }
                            }>
                        
                        <XAxis dataKey="time" tickFormatter={this.formatXAxis}  stroke={this.white1} />
                        <YAxis stroke={this.white1}/>
                        <Tooltip content={this.customTooltip} cursor={true} wrapperStyle={{border: 'none', outline:'none'}} contentStyle={{backgroundColor: '#3e3e44',borderRadius: '10px',color: '#EFEFF1', border: 'none', outline:'none',}} />
                        {/* <Tooltip  cursor={true} wrapperStyle={{border: 'none', outline:'none'}} contentStyle={{backgroundColor: '#3e3e44',color: '#EFEFF1', border: 'none', outline:'none',}} /> */}
                        <Legend layout="horizontal" alignmentBaseline='central' align='center'/>
                        <Line type="monotone" dataKey="currentViewers" legendType='circle' strokeWidth={3} name='Liczba widzów' tickFormatter={this.formatName} stroke={this.purple1} dot={false} activeDot={{r:6}}/>
                        <Line type="monotone" dataKey="currentChatters" legendType='circle' strokeWidth={3} name='Liczba chattersów' stroke={this.green1} dot={false} activeDot={{r:6}}/>
                        </LineChart>
                    </ResponsiveContainer>
            </div>
        )
    }
}

export default Chart


//ucinanie 0 przy godzinach
//request śledzenia kanału
//footer
//input
// linki do kanłow