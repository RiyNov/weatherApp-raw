import React, { Component } from 'react';
import './App.css';

import Titles from './components/titles/Titles';
import Form from './components/form/Form';
import Weather from './components/weather/weather';

const API_KEY = 'a4c2151840b2367f9c099b9bcb12efe0';

class App extends Component {

  state = {
    temperature : undefined,
    city : undefined,
    country : undefined,
    humidity : undefined,
    description : undefined,
    error : undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const API_URL = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${city},${country}&units=metric&appid=${API_KEY}`);
    const data = await API_URL.json();
    if(city && country)
    {
      this.setState({
        temperature : data.list[0].main.temp,
        city : data.list[0].name,
        country : data.list[0].sys.country,
        humidity : data.list[0].main.humidity,
        description : data.list[0].weather[0].description,
        error : ''
      })
    } else
    {
      this.setState({
        temperature : undefined,
        city : undefined,
        country : undefined,
        humidity : undefined,
        description : undefined,
        error : 'Please enter the City and Country'
      })
    }
  }


  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Titles/>
              </div>
              <div className="col-xs-7 form-container">
                <Form getWeather = {this.getWeather}/>
                <Weather
                  temperature = {this.state.temperature}
                  city = {this.state.city}
                  country = {this.state.country}
                  humidity = {this.state.humidity}
                  description = {this.state.description}
                  error = {this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
