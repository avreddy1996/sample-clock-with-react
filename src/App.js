import React from 'react';
import './app.css';

class App extends React.Component{
    render(){
        return <div><Panel /></div>;
    }
}
class Panel extends React.Component{
    constructor(props){
        super();
        this.state = {
            isDigital : true
        }
        this.toggleClock = this.toggleClock.bind(this);
    }
    toggleClock(){
        this.setState((prevStat)=>({
            isDigital : !prevStat.isDigital
        }))
    }
    render(){
        return <div><button className='clock-toggle-button' type="button" onClick={()=>this.toggleClock()}>Show {this.state.isDigital?'Analog':'Digital'}</button>
        <ClockDisplay isDigital={this.state.isDigital} /></div>
    }
}
class ClockDisplay extends React.Component{
    render(){
        if(this.props.isDigital){
            return <Clock />
        }else{
            return <Analog />
        }
    }
}
class Analog extends React.Component{
    constructor(props){
        super();
        this.state = {
            hoursHand : {'':''},
            minutesHand : {},
            secondsHand : {}
        }
    }
    componentDidMount(){
        this.setTime();
        this.startClock();
    }
    componentWillUnmount(){
        clearInterval(this.time);
    }
    startClock(){
        this.time = setInterval(()=>{
            this.setTime();
        },1000);
    }
    setTime(){
        let date = new Date();
        let hoursDeg = -90 + (360/12)*date.getHours();
        let minutesDeg = -90 + (360/60)*date.getMinutes();
        let secondsDeg = -90 + (360/60)*date.getSeconds();
        this.setState({
            hoursHand : {'transform': 'rotate('+hoursDeg+'deg)'},
            minutesHand : {'transform': 'rotate('+minutesDeg+'deg)'},
            secondsHand : {'transform' : 'rotate('+secondsDeg+'deg)'}
        })
    }
    render(){
        return <div className='clock'><div className='clock-background'><div className='clock-dial'></div>
        <div className='hours-hand' style={this.state.hoursHand}></div>
        <div className='minutes-hand' style={this.state.minutesHand}></div>
        <div className='seconds-hand' style={this.state.secondsHand}></div>
        </div></div>
    }
}
class Clock extends React.Component{
    constructor(props){
        super();
        this.state = {
            time: new Date()
        }
    }
    componentDidMount(){
        this.runClock();
    }
    componentWillUnmount(){
        clearInterval(this.time)
    }
    runClock(){
        this.time = setInterval(()=>{
            this.setState({
                time: new Date()
            })
        },1000)
    }
    render(){
        return <div className='clock'><h1>{this.state.time.toLocaleTimeString()}</h1></div>
    }
}
export default App