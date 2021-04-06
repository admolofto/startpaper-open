import { writable } from 'svelte/store';

const { subscribe, set, update } = writable(
  JSON.parse(localStorage.getItem('columns')) || {
    columns: [
      [1380, 7],
      [1210, 6],
      [1040, 5],
      [870, 4],
      [700, 3],
    ],
    currentColumn: 0,
  }
);

subscribe((value) => {
  localStorage.setItem('columns', JSON.stringify(value));
});

// Update functions

const setCurrentColumn = (newCurrentColumn) => {
  update((prev) => {
    return { ...prev, currentColumn: newCurrentColumn };
  });
};

export const columns = {
  subscribe,
  setCurrentColumn,
};
