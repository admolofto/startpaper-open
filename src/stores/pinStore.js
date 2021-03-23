import { writable } from 'svelte/store';

const { subscribe, set, update } = writable(
  JSON.parse(localStorage.getItem('pin')) || ''
);

subscribe((value) => {
  localStorage.setItem('pin', JSON.stringify(value));
});

// Update functions

const setPin = (newPin) => {
  set(newPin);
};

export const pin = {
  subscribe,
  setPin,
};
