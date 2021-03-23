import { writable } from 'svelte/store';

const { subscribe, set, update } = writable(
  JSON.parse(localStorage.getItem('activePage')) || 'p00'
);

subscribe((value) => {
  localStorage.setItem('activePage', JSON.stringify(value));
});

// Update functions

const setActivePage = (newActivePage) => {
  set(newActivePage);
};

export const activePage = {
  subscribe,
  setActivePage,
};
