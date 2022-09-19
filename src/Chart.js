import React from 'react';
import './Chart.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';




class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.avgViewers = this.calculateAvg('currentViewers')
        this.avgChatters = this.calculateAvg('currentChatters')
        this.customTooltip = this.customTooltip.bind(this)
        this.formatXAxis = this.formatXAxis.bind(this)
    }

    formatXAxis(tickItem) {
        let date = new Date(tickItem)
        let timeString = date.toLocaleTimeString()
        return timeString.substring(0, timeString.length - 3)
    }
    formatDate(date) {
        return new Date(date).toLocaleString()
    }
    calculateAvg(type) {
        let sum = 0
        let counter = 1
        for (let sample of this.props.stats) {
            sum = sum + sample[type]
            counter++
        }
        return Math.round(sum / counter)
    }
    customTooltip({ active, payload, label }) {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{this.formatDate(label)}</p>
                    <p style={{ color: 'var(--purple-color)' }} className="label">{`Liczba widzów : ${payload[0].value}`}</p>
                    <p style={{ color: 'var(--green-color' }} className="label">{`Liczba chattersów : ${payload[1].value}`}</p>
                    <p className="label">{`Różnica : ${Math.round((payload[0].value - payload[1].value) / payload[0].value * 100)}%`}</p>
                </div>
            );
        }

        return null;
    };

    render() {
        return (
            <div className="chart">
                <span className="chart__channel">
                    <a target={'_blank'} rel="noreferrer" href={'https://www.twitch.tv/' + this.props.name}>
                        <span className='channel__logo-name'>
                            <span className='channel__logo' style={{ backgroundImage: `url(${this.props.avatar})` }}></span>
                            <span className='channel__name'>{this.props.name}</span>
                        </span>
                    </a>


                    <span className="chart__stream-time">{["Stream trwał od: ", this.formatDate(this.props.createdAt), " do ", this.formatDate(this.props.updatedAt)]}</span>

                    <span className='chart__stream-avg'>
                        <span className='purple-text'>Średnia liczba widzów: {this.avgViewers}</span>
                        <span className='green-text'>Średnia liczba chattersów: {this.avgChatters}</span>
                        <span>Różnica: {this.avgViewers - this.avgChatters + ' (' + Math.round((this.avgViewers - this.avgChatters) / this.avgViewers * 100) + '%)'}</span>
                    </span>
                </span>
                <div className='chart__graph'>
                <ResponsiveContainer height={'85%'} minHeight={'320px'} >
                    <LineChart
                        data={this.props.stats}
                        margin={{
                            top: 5,
                            left: -35
                        }
                        }>
                        <XAxis dataKey="time" tickFormatter={this.formatXAxis} stroke={'var(--white-color)'} />
                        <YAxis stroke={'var(--white-color)'} />
                        <Tooltip content={this.customTooltip} cursor={true} wrapperStyle={{ border: 'none', outline: 'none' }} contentStyle={{ backgroundColor: 'var(--grey-color)', borderRadius: '10px', color: 'var(--white-color)', border: 'none', outline: 'none', }} />
                        <Legend layout="horizontal" alignmentBaseline='central' align='center' />
                        <Line type="monotone" dataKey="currentViewers" legendType='circle' strokeWidth={3} name='Liczba widzów' tickFormatter={this.formatName} stroke={'var(--purple-color)'} dot={false} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="currentChatters" legendType='circle' strokeWidth={3} name='Liczba chattersów' stroke={'var(--green-color)'} dot={false} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>

                </div>
                
            </div>
        )
    }
}

export default Chart


