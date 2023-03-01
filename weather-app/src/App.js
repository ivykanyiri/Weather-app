import axios from 'axios';
import {useState} from 'react';

function App() {
  const [data, setData] = useState({});
  const [location , setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=2a8ececcf34c57b2fa8932d5f5db027a`;

  const searchLocation = (e) => {
    if (e.key === "Enter"){
      axios.get(url)
        .then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation("");
    } 
  }

  return (
    <div className="app">
      <div className="search">
        <input className='search-input' type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyUp = {searchLocation}
        placeholder='Search Location...'
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}              
            </div>
            <div className="desc">
            {data.weather ? <p>{data.weather[0].main}</p> : null}                          
            </div>
          </div>
        </div>

        {data.name != null && 
          <div className="bottom">
          <div className="feels">
          {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}              
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}              
            <p>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}MPH</p> : null}              
            <p>Wind Speed</p>
          </div>
        </div>
        }        
      </div>
    </div>
  );
}

export default App;
