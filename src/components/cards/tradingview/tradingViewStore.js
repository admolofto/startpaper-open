import { writable } from 'svelte/store';

export const createTradingViewStore = (cardId) => {
  const initialValue = {
    symbol: 'CRSR',
    logo: 'https://logo.clearbit.com/corsair.com',
  };

  const { subscribe, set, update } = writable(
    JSON.parse(
      localStorage.getItem(`tradingView_${cardId}`)
    ) || initialValue
  );

  subscribe((value) => {
    localStorage.setItem(
      `tradingView_${cardId}`,
      JSON.stringify(value)
    );
  });

  const setSymbol = (newSymbol) => {
    update((prev) => {
      return { ...prev, symbol: newSymbol };
    });
  };

  const setLogo = (newLogo) => {
    update((prev) => {
      return { ...prev, logo: newLogo };
    });
  };

  return {
    subscribe,
    set,
    update,
    setSymbol,
    setLogo,
  };
};
