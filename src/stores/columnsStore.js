import { writable } from 'svelte/store';

const { subscribe, set, update } = writable(
  JSON.parse(localStorage.getItem('columns')) || {
    columns: [
      [1550, 8],
      [1380, 7],
      [1210, 6],
      [1040, 5],
      [870, 4],
      [700, 3],
      [375, 2],
    ],
    staticColumns: 5,
    currentColumn: 0,
    dynamic: true,
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

const setDynamic = (bool) => {
  update((prev) => {
    return { ...prev, dynamic: bool }
  })
}

const setStaticColumns = (numOfCols) => {
  update((prev) => {
    return { ...prev, staticColumns: numOfCols }
  })
}

const incrementStaticColumns = () => {
  update((prev) => {
    return { ...prev, staticColumns: prev.staticColumns + 1 }
  })
}

const decrementStaticColumns = () => {
  update((prev) => {
    return { ...prev, staticColumns: prev.staticColumns - 1 }
  })
}

export const columns = {
  subscribe,
  setCurrentColumn,
  setDynamic,
  setStaticColumns,
  incrementStaticColumns,
  decrementStaticColumns,
};
