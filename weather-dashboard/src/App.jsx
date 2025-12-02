import { useEffect, useState } from "react"
import { getWeatherDetailsApi } from "./api-service/weather-api";
import './App.css'
import { LoaderComponent } from "./components/LoaderComponent";


function App() {

  const [getWeatherDetails, setGetWeatherDetails] = useState({});
  const [city, setCity] = useState('london');
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState('')

  const getWeatherData = async () => {
    try {
      setIsDataLoading(true);
      const res = await fetch(getWeatherDetailsApi(city))
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      const data = await res.json();
      setGetWeatherDetails(data);
      setIsDataLoading(false)
    } catch (error) {
      console.log('error', error)
      setIsDataLoading(false);
      setError(error?.message)
    }
  }

  useEffect(() => {
    getWeatherData()
  }, [])

  console.log(error);


  const iconCode = getWeatherDetails?.weather?.[0] && getWeatherDetails?.weather[0]?.icon;
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : "";




  return (
    <div className="container">
      <div className="card">
        {
          isDataLoading && <LoaderComponent />
        }
        {
          error && <div className="error-message">{error}</div>
        }
        {(!isDataLoading && !error) && <>
          <div className="icon-wrapper">
            <img src={iconUrl} height={150} />
          </div>

          <div className="city-name">
            {getWeatherDetails?.name}
          </div>
          <div className="info-wrapper">
            <div>
              <div className="title">Temperature</div>
              <div className="title-info">{getWeatherDetails?.main?.temp ? `${getWeatherDetails?.main?.temp} °C` : 'N/A'} </div>
            </div>
            <div>
              <div className="title">Weather</div>
              <div className="title-info">{getWeatherDetails?.weather?.[0]?.main || 'N/A'}</div>
            </div>
          </div>

          <div className="info-wrapper">
            <div>
              <div className="title">Wind Speed</div>
              <div className="title-info">{getWeatherDetails?.wind?.speed ? `${getWeatherDetails?.wind?.speed} Km/h` : 'N/A'} </div>
            </div>
            <div>
              <div className="title">Humidity</div>
              <div className="title-info">{getWeatherDetails?.main?.humidity || 'N/A'}</div>
            </div>
          </div>
        </>
        }


      </div>
    </div>
  )
}

export default App
