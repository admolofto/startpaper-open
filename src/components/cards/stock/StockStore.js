import { writable } from 'svelte/store';

export const createStockStore = () => {
  const { subscribe, set, update } = writable({
    symbol: 'CRSR',
    logo: 'https://logo.clearbit.com/corsair.com',
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
