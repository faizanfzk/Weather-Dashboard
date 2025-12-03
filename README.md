<h1>Weather Dashboard</h1>
<p>A simple and responsive Weather Application built with React.js and the OpenWeatherMap API.
Users can search for any city and instantly view temperature, weather conditions, wind speed, humidity, and weather-specific UI backgrounds.</p>
<h2>Features</h2>
<ul>
  <li>Search weather by city name</li>
  <li>Dynamic background gradients based on weather condtion.</li>
  <li>Debounced Search for Api Calls (To prevent unnecessagry api call on every character)</li>
  <li>Error handling (Api Error, Invalid City, Empty search)</li>
  <li>Loading Indicator while fetching details.</li>
  <li>Refresh Button (To get the latest info)</li>
  <li>Fully resposive UI</li>
</ul>
<h2>Tech Stack</h2>
<ul>
  <li>
    React.js
  </li>
  <li>OpenWeatherMap Api</li>
</ul>

<h2>Api Integration Details</h2>
<ul>
<li>OpenWeatherMap Current Weather Data API. To get the Api go to the website <a href='https://home.openweathermap.org'>https://home.openweathermap.org</a>, generate you Api key and use it in your Api</li>
  <li>Used debouncing to reduce the unnecessary Api calls.</li>
  <li>1000 Api calls are free per day as per the documentation.</li>
</ul>
<h2>Installation</h2>
<ul>
  <li>Clone the repository</li>
  <li>Run npm install</li>
  <li>Then run npm run dev to run the server.</li>
</ul>
