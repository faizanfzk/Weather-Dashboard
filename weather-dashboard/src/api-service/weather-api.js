
const key = import.meta.env.VITE_WEATHER_KEY;

export const getWeatherDetailsApi = (city)=>{
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
}