import { writable } from 'svelte/store';

const { subscribe, set, update } = writable(
  JSON.parse(localStorage.getItem('userInfo')) || {
    city: 'atlanta',
    time: '00:00',
  }
);

subscribe((value) => {
  localStorage.setItem('userInfo', JSON.stringify(value));
});

// Update functions

const setTime = (newTime) => {
  update((prev) => {
    return { ...prev, time: newTime };
  });
};

const setCity = (newCity) => {
  update((prev) => {
    return { ...prev, city: newCity };
  });
};

export const userInfo = {
  subscribe,
  setCity,
  setTime,
};
