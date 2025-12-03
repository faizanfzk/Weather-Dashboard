import { useCallback, useState } from "react"
import { getWeatherDetailsApi } from "./api-service/weather-api";
import './App.css'
import { LoaderComponent } from "./components/LoaderComponent";
import SearchComponent from "./components/search/SearchComponent";
import { debounce } from "./helper/debounce";


function App() {

  const [getWeatherDetails, setGetWeatherDetails] = useState({});
  const [city, setCity] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState('')

  const getWeatherData = useCallback(async (city) => {
    try {
      setIsDataLoading(true);
      const res = await fetch(getWeatherDetailsApi(city))
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message);
      }

      setGetWeatherDetails(data);
      setIsDataLoading(false)
    } catch (error) {
      console.log('error', error)
      setIsDataLoading(false);
      setError(error?.message)
    }
  }, []);

  const iconCode = getWeatherDetails?.weather?.[0] && getWeatherDetails?.weather[0]?.icon;
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : "";


  const debouncedFetch = useCallback(
    debounce((value) => {
      getWeatherData(value);
      setIsDataLoading(false)
    }, 600),
    [getWeatherData]
  );

  const handleSearch = useCallback((value) => {
    setCity(value);
    setIsDataLoading(true)
    setError('')
    debouncedFetch(value);
  }, [debouncedFetch]);



  return (
    <div className={"container"}>
      <div className={`card ${getWeatherDetails?.weather?.[0]?.main}`}>

        <div className="search-wrapper">
          <SearchComponent placeholder={'Search Location'}
            value={city}
            onSearchChange={handleSearch}
          />
        </div>
        {
          isDataLoading && <LoaderComponent />
        }
        {
          error && <div className="error-message">{error}</div>
        }

        {(!isDataLoading && !error && city) && <>
          <div className="icon-wrapper">
            <img src={iconUrl} height={150} />
          </div>

          <div className={`city-name ${getWeatherDetails?.weather?.[0]?.main}`}>
            {getWeatherDetails?.name}
          </div>
          <div className="info-wrapper">
            <div>
              <div className={`title ${getWeatherDetails?.weather?.[0]?.main}`}>Temperature</div>
              <div className="title-info">{getWeatherDetails?.main?.temp ? `${getWeatherDetails?.main?.temp} °C` : 'N/A'} </div>
            </div>
            <div>
              <div className={`title ${getWeatherDetails?.weather?.[0]?.main}`}>Weather</div>
              <div className="title-info">{getWeatherDetails?.weather?.[0]?.main || 'N/A'}</div>
            </div>
          </div>

          <div className="info-wrapper">
            <div>
              <div className={`title ${getWeatherDetails?.weather?.[0]?.main}`}>Wind Speed</div>
              <div className="title-info">{getWeatherDetails?.wind?.speed ? `${getWeatherDetails?.wind?.speed} Km/h` : 'N/A'} </div>
            </div>
            <div>
              <div className={`title ${getWeatherDetails?.weather?.[0]?.main}`}>Humidity</div>
              <div className="title-info">{`${getWeatherDetails?.main?.humidity }%`|| 'N/A'}</div>
            </div>
          </div>
        </>
        }
        {
          !city && <>Please Enter the city name to get weather</>
        }


      </div>
    </div>
  )
}

export default App
