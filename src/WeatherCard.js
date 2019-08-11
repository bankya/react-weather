import React, { Component } from 'react';
import WeatherIconFiles from './WeatherIconFiles'
import './WeatherCard.css';

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

  k2c(temp) {
    return parseFloat(temp) - 273.15;
  }

  getTemperature() {
    const tempCelsius = this.k2c(this.props.temp);

    if (!this.state.displayCelsius) {
      return parseInt(this.c2f(tempCelsius));
    }

    return parseInt(tempCelsius); 
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

// props: day, weatherCode, time, highTemp, lowTemp
export default class WeatherCard extends Component {
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