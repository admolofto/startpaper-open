import { writable } from 'svelte/store';

const { subscribe, set, update } = writable(
  JSON.parse(localStorage.getItem('themeName')) || 'Light'
);

subscribe((value) => {
  localStorage.setItem('themeName', JSON.stringify(value));
});

// Update functions

export const themeName = {
  subscribe,
  set,
};
