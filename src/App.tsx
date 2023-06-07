import { useState } from "react"
import Axios  from "axios";

function App() {

  const [data,setData] = useState({});

  const [location,setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ed61abb5f4541ab83d848606d66312d7`

  return (
    <div className="app">
      <div className="container">
        <div className="top">
          <div className="location">
            <p>Havana</p>
          </div>
          <div className="temp">
            <h1>305ºF</h1>
          </div>
          <div className="description">
            <p>Clear</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">307ºF</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">52%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">3 MPH</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
