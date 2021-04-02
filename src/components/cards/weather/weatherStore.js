import { writable } from 'svelte/store';

export const createWeatherStore = (cardId) => {
  const initialValue = {
    zipCode: '30047',
    weatherData: {
      deg: '58',
      icon: '01d',
      location: 'New York',
      description: 'Clear',
    },
  };

  const { subscribe, set, update } = writable(
    JSON.parse(localStorage.getItem(`weather_${cardId}`)) ||
      initialValue
  );

  subscribe((value) => {
    localStorage.setItem(
      `weather_${cardId}`,
      JSON.stringify(value)
    );
  });

  const setZipCode = (newZipCode) => {
    update((prev) => {
      return { ...prev, zipCode: newZipCode };
    });
  };

  const setWeatherData = (newWeatherData) => {
    update((prev) => {
      return { ...prev, weatherData: newWeatherData };
    });
  };

  return {
    subscribe,
    set,
    update,
    setZipCode,
    setWeatherData,
  };
};
