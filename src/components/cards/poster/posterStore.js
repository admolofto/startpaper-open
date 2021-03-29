import { writable } from 'svelte/store';

export const createPosterStore = (cardId) => {
  const initialValue = {
    isRepositioning: false,
    objPos: { X: 50, Y: 50 },
    movieName: 'Aniara',
    movieYear: '2018',
    path:
      'https://i.ibb.co/BTnt3J5/aniara-9fbf-2500x4000.jpg',
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

  const setObjPos = (axis, newObjPos) => {
    update((prev) => {
      return {
        ...prev,
        objPos: { ...prev.objPos, [axis]: newObjPos },
      };
    });
  };

  const setPath = (newPath) => {
    update((prev) => {
      return {
        ...prev,
        path: newPath,
      };
    });
  };

  const setIsRepositioning = (bool) => {
    update((prev) => {
      return {
        ...prev,
        isRepositioning: bool,
      };
    });
  };

  return {
    subscribe,
    set,
    update,
    setIsRepositioning,
    setObjPos,
    setPath,
  };
};
