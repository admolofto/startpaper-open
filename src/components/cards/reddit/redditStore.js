import { writable } from 'svelte/store';

export const createRedditStore = (cardId) => {
  const initialValue = {
    subreddits: null,
  };

  const { subscribe, set, update } = writable(
    JSON.parse(localStorage.getItem(`reddit_${cardId}`)) ||
      initialValue
  );

  subscribe((value) => {
    localStorage.setItem(
      `reddit_${cardId}`,
      JSON.stringify(value)
    );
  });

  const setSubreddits = (newSubreddits) => {
    update((prev) => {
      return { ...prev, subreddits: newSubreddits };
    });
  };

  return {
    subscribe,
    set,
    update,
    setSubreddits,
  };
};
