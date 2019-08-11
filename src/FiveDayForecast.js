import React, { Component } from 'react';
import WeatherCard from './WeatherCard';
import axios from 'axios';
import './FiveDayForecast.css';
import owmConfig from './.owm.config'

export default class FiveDayForecast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      determinedWeatherForecast: false,
    };

    this.getFiveDayForecast(props.latitude, props.longitude);
  }

  getFiveDayForecast(latitude, longitude) {
    const url = 'https://api.openweathermap.org/data/2.5/forecast';
    
    axios.get(url, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: owmConfig.API_KEY,
      }
      })
      .then((response) => {
        this.setState(() => {
          return {
            determinedWeatherForecast: true,
            weatherForecast: response.data.list,
            numForecasts: response.data.cnt,
          }
        });
      })
      .catch((err) => {

      });
  }

  dayOrNight(hour) {
    const morningHour = 6;
    const nightHour = 19;
    const isDay = hour > morningHour && hour < nightHour;

    return isDay ? 'day' : 'night';
  }

  date2day(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  }

  createCards(weatherForecast, numForecasts) {
    return weatherForecast.filter((forecast, idx) => {
      return idx % (numForecasts / 5) === 0; // Five day forecast
    }).map((forecast) => {
      const date = new Date(forecast.dt * 1000); // Convert seconds to milliseconds
      const day = this.date2day(date);
      const weatherCode = forecast.weather[0].id;
      const time = this.dayOrNight(date.getHours());
      const highTemp = forecast.main.temp_max;
      const lowTemp = forecast.main.temp_min;

      return (
        <li key={day}>
          <WeatherCard
            day={day}
            weatherCode={weatherCode}
            time={time}
            highTemp={highTemp}
            lowTemp={lowTemp}
          ></WeatherCard>
        </li>
      )
    });
  }

  render() {
    if (this.state.determinedWeatherForecast) {
      let weatherCards = this.createCards(this.state.weatherForecast, this.state.numForecasts);
      
      return (
        <div className='FiveDayForecast'>
          <ul>
            { weatherCards }
          </ul>
        </div>
      )
    } else {
      return (
        (
          <div>
            Loading Forecast
          </div>
        )
      )
    }
  }
}
