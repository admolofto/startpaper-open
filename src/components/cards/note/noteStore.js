import { writable } from 'svelte/store';

export const createNoteStore = (cardId) => {
  const initialValue = {
    contents: 'Write *anything*...',
    font: 'serif',
    fontColor: 'black',
    fontSize: 'large',
  };

  const { subscribe, set, update } = writable(
    JSON.parse(localStorage.getItem(`note_${cardId}`)) ||
      initialValue
  );

  subscribe((value) => {
    localStorage.setItem(
      `note_${cardId}`,
      JSON.stringify(value)
    );
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
