import { writable } from 'svelte/store';

export const createPosterStore = (cardId) => {
  const initialValue = {
    isRepositioning: false,
    objPos: { X: 50, Y: 50 },
    path:
      'https://images.unsplash.com/photo-1560525821-d5615ef80c69?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80',
  };

  const { subscribe, set, update } = writable(
    JSON.parse(localStorage.getItem(`poster_${cardId}`)) ||
      initialValue
  );

  subscribe((value) => {
    localStorage.setItem(
      `poster_${cardId}`,
      JSON.stringify(value)
    );
  });

  return {
    subscribe,
    set,
    update,
  };
};
