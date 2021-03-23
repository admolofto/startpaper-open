import { writable } from 'svelte/store';

export const createBookmarkStore = (cardId) => {
  const initValue = {
    url: 'svelte.dev',
    name: 'svelte',
  };

  const { subscribe, set, update } = writable(
    JSON.parse(
      localStorage.getItem(`bookmark_${cardId}`)
    ) || initValue
  );

  subscribe((value) => {
    localStorage.setItem(
      `bookmark_${cardId}`,
      JSON.stringify(value)
    );
  });

  const setUrl = (newUrl) => {
    update((prev) => {
      return { ...prev, url: newUrl };
    });
  };

  const setName = (newName) => {
    update((prev) => {
      return { ...prev, name: newName };
    });
  };

  return {
    subscribe,
    set,
    update,
    setUrl,
    setName,
  };
};
