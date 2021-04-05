import { writable } from 'svelte/store';

export const createMessageStore = (cardId) => {
  const initialValue = {
    isCustomMessage: false,
    customMessage: 'Good Evening',
    font: 'serif',
    fontColor: 'black',
    fontSize: '44px',
    messageOption: 'greeting',
    backgroundImg:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2850&q=80',
  };

  const { subscribe, set, update } = writable(
    JSON.parse(localStorage.getItem(`message_${cardId}`)) ||
      initialValue
  );

  subscribe((value) => {
    localStorage.setItem(
      `message_${cardId}`,
      JSON.stringify(value)
    );
  });

  const setFont = (newFont) => {
    update((prev) => {
      return { ...prev, font: newFont };
    });
  };

  const setFontColor = (newFontColor) => {
    update((prev) => {
      return { ...prev, fontColor: newFontColor };
    });
  };

  const setFontSize = (newFontSize) => {
    update((prev) => {
      return { ...prev, fontSize: newFontSize };
    });
  };

  const setBackgroundImg = (imgPath) => {
    update((prev) => {
      return { ...prev, backgroundImg: imgPath };
    });
  };

  const setMessageOption = (newMessageOption) => {
    update((prev) => {
      return { ...prev, messageOption: newMessageOption };
    });
  };

  return {
    subscribe,
    set,
    update,
    setFont,
    setFontColor,
    setFontSize,
    setBackgroundImg,
    setMessageOption,
  };
};
