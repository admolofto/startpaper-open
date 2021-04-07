import { writable } from 'svelte/store';

export const createPhotoStore = (cardId) => {
  const initialValue = {
    isRepositioning: false,
    objPos: { X: 50, Y: 50 },
    path:
      'https://images.unsplash.com/photo-1476041026529-411f6ae1de3e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1900&q=80',
  };

  const { subscribe, set, update } = writable(
    JSON.parse(localStorage.getItem(`photo_${cardId}`)) ||
      initialValue
  );

  subscribe((value) => {
    localStorage.setItem(
      `photo_${cardId}`,
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
