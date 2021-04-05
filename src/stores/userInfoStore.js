import { writable } from 'svelte/store';

const { subscribe, set, update } = writable(
  JSON.parse(localStorage.getItem('userInfo')) || {
    city: 'atlanta',
    time: { hours: '00', minutes: '00', seconds: '00' },
    date: '',
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

const setDate = (newDate) => {
  update((prev) => {
    return { ...prev, date: newDate };
  });
};

export const userInfo = {
  subscribe,
  setCity,
  setTime,
  setDate,
};
