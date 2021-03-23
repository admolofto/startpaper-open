import { writable } from 'svelte/store';

export const createNoteStore = () => {
  const { subscribe, set, update } = writable({
    contents: 'Write *anything*...',
    font: 'serif',
    fontColor: 'black',
    fontSize: 'large',
  });

  const setContents = (newContent) => {
    update((prev) => {
      return { ...prev, contents: newContent };
    });
  };

  const setFont = (newFont) => {
    update((prev) => {
      return { ...prev, font: newFont };
    });
  };

  const setFontSize = (newFontSize) => {
    update((prev) => {
      return { ...prev, fontSize: newFontSize };
    });
  };

  const setFontColor = (newFontColor) => {
    update((prev) => {
      return { ...prev, fontColor: newFontColor };
    });
  };

  return {
    subscribe,
    set,
    update,
    setContents,
    setFont,
    setFontColor,
    setFontSize,
  };
};
