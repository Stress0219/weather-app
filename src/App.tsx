import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

function App() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=ed61abb5f4541ab83d848606d66312d7`;
      
          axios.get<WeatherData>(url).then((response) => {
            setData(response.data);
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  const searchLocation = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=ed61abb5f4541ab83d848606d66312d7`;

      const response = await axios.get<WeatherData>(url);
      setData(response.data);
      setLocation("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchLocation();
  };

  return (
    <div className="app">
      <form className="search" onSubmit={handleSearch}>
        <input
          value={location}
          onChange={handleInputChange}
          placeholder="Enter Location"
          type="text"
        />
        <button type="submit" className="search_button">Search</button>
      </form>
      <div className="container">
        {data ? (
          <div>
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                <h1>{data.main.temp.toFixed()}ºF</h1>
              </div>
              <div className="description">
                <p>{data.weather[0].main}</p>
              </div>
            </div>
            <div className="bottom">
              <div className="feels">
                <p className="bold">{data.main.feels_like.toFixed()}ºF</p>
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                <p className="bold">{data.main.humidity}%</p>
                <p>Humidity</p>
              </div>
              <div className="wind">
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
