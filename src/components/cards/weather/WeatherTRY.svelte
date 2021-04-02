<script>
  import { onMount } from 'svelte';

  import Icon from '../../Icon.svelte';
  import CardTemplate from '../CardTemplate.svelte';

  export let cardStore;

  $: inputLocation = $cardStore.location;

  const apiKey = '6f61d621adc291e9601e23286e428163';

  $: fetchWeather(inputLocation);

  const getCoordinates = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject
      );
    });
  };

  const fetchWeather = async (inputLocation) => {
    const position = await getCoordinates();
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    cardStore.setWeatherData({
      deg: toImperial(jsonResponse.main.temp),
      icon: jsonResponse.weather[0].icon,
      main: jsonResponse.weather[0].main,
      location: jsonResponse.location,
      description: jsonResponse.weather[0].main,
    });
  };

  const toImperial = (deg) => {
    return Math.round((deg * 9) / 5 - 459.67);
  };

  onMount(() => {
    if (($cardStore.weatherData.deg = '')) {
      fetchWeather(inputLocation);
    }
  });
</script>

<CardTemplate>
  <div class="weather">
    <div class="weather__location">
      <div class="weather__location--icon">
        <Icon icon="map-pin" size="12" />
      </div>
      <p class="weather__location--text">
        {$cardStore.weatherData.location}
      </p>
    </div>
    <p class="weather__temp">
      {$cardStore.weatherData.deg}°
    </p>
    <!-- <img
      class="weather__symbol"
      src="http://openweathermap.org/img/wn/{$cardStore
        .weatherData.icon}@2x.png"
      alt="icon not found"
    /> -->
  </div>
</CardTemplate>

<style>
  .weather {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 2fr;
    grid-template-areas:
      'location location'
      'temp symbol';
  }
  .weather__location {
    grid-area: location;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
  .weather__location--icon {
    margin-right: 0.25rem;
  }
  .weather__temp {
    grid-area: temp;
    text-align: end;
    font-size: 28px;
    font-weight: 500;
  }
  .weather__symbol {
    grid-area: symbol;
    margin-top: -0.7rem;
    margin-left: -0.1rem;
  }
</style>
