import React, { Component } from 'react';
import FiveDayForecast from './FiveDayForecast';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      determinedLocation: false,
    };

    this.getUserLocation().then((loc) => {
      const { longitude, latitude } = loc;
      this.setState(() => {
        return {
          determinedLocation: true,
          longitude: longitude,
          latitude: latitude,
        }
      });
    }).catch((err) => {
      alert(err);
    });
  }

  getUserLocation() {
    return new Promise(function(resolve, reject) {
      if ("geolocation" in navigator) { /* geolocation is available */
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }, (positionError) => reject(positionError),
        {maximumAge: 60000, timeout: 10000, enableHighAccuracy: true});
      } else { /* geolocation IS NOT available */
        reject(new Error('No Location Support'));
      }
    });
  }

  render() {
    if (this.state.determinedLocation) {
      return (
        <div>
          <FiveDayForecast latitude={this.state.latitude} longitude={this.state.longitude}></FiveDayForecast>
        </div>
      );
    } else {
      return (
        <div>Determining Location...</div>
      )
    }
  }
}
