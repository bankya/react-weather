import React, { Component } from 'react';
import Axios from 'axios';
import WeatherIconFiles from './WeatherIconFiles'
import logo from './logo.svg';
import './App.css';

// props: weatherCode, time
class WeatherIcon extends Component {
  constructor(props) {
    super(props);

    const rootFolder = '/weather-icons/';
    const imgKey = this.props.weatherCode + '-' + this.props.time;
    this.imgPath = rootFolder + WeatherIconFiles[imgKey] + '.svg';
  }

  render() {
    return (
      <div className='WeatherIcon'>
        <img src={this.imgPath} alt={this.imgPath}></img>
      </div>
    );
  }
}

class Temperature extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCelsius: true,
    }
  }

  c2f(temp) {
    return parseFloat(temp) * (9 / 5) + 32;
  }

  getTemperature() {
    if (!this.state.displayCelsius) {
      return this.c2f(this.props.temp);
    }

    return this.props.temp; 
  }

  render() {
    const temperatureClass = this.props.isHigh ? 'TemperatureHigh' : 'TemperatureLow';

    return (
      <p className={temperatureClass}>{this.getTemperature()}</p>
    );
  }
}

class Day extends Component {
  render() {
    return(
      <p className='Day'>{this.props.day}</p>
    );
  }
}

class WeatherCard extends Component {
  render() {
    return (
    <div className='WeatherCard'>
      <Day day={this.props.day}></Day>
      <WeatherIcon weatherCode={this.props.weatherCode} time={this.props.time}></WeatherIcon>
      <div className='TemperatureContainer'>
        <Temperature temp={this.props.highTemp} isHigh={true}></Temperature>
        <Temperature temp={this.props.lowTemp} isHigh={false}></Temperature>
      </div>
    </div>
    );
  }
}

function App() {
  return (
    <div>
      <WeatherCard
      day='Wed'
      weatherCode='200'
      time='day'
      highTemp={33.4}
      lowTemp={30.4}>

      </WeatherCard>
    </div>
  );
}

export default App;
