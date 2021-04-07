import { writable } from 'svelte/store';

const { subscribe, set, update } = writable(
  JSON.parse(localStorage.getItem('theme')) || 'light'
);

subscribe((value) => {
  localStorage.setItem('theme', JSON.stringify(value));
});

// Update functions

const setTheme = (newTheme) => {
  set(newTheme);
};

export const theme = {
  subscribe,
  setTheme,
};
