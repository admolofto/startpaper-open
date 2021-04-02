<script>
  import Icon from '../../Icon.svelte';
  import CardTemplate from '../CardTemplate.svelte';

  const apiKey = '6f61d621adc291e9601e23286e428163';

  export let cardStore;

  $: inputZipCode = $cardStore.zipCode || '11105';
  $: promise = fetchWeather(inputZipCode);

  const fetchWeather = async (zipCode) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return {
      deg: toImperial(jsonResponse.main.temp),
      icon: jsonResponse.weather[0].icon,
      location: jsonResponse.name,
      description: jsonResponse.weather[0].main,
    };
  };

  const toImperial = (deg) => {
    return Math.round((deg * 9) / 5 - 459.67);
  };
</script>

<CardTemplate>
  {#await promise}
    <p>00° ...</p>
  {:then data}
    <div class="weather">
      <div class="weather__location">
        <div class="weather__location--icon">
          <Icon icon="map-pin" size="12" />
        </div>
        <p class="weather__location--text">
          {data.location}
        </p>
      </div>
      <p class="weather__temp">{data.deg}°</p>
      <img
        class="weather__symbol"
        src="http://openweathermap.org/img/wn/{data.icon}@2x.png"
        alt="icon not found"
      />
    </div>
  {:catch error}
    <p>{error.message}</p>
  {/await}
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
    font-size: 26px;
    font-weight: 500;
  }
  .weather__symbol {
    grid-area: symbol;
    margin-top: -0.4rem;
    margin-left: -0.1rem;
  }
</style>
