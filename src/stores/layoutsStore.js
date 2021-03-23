import { writable } from 'svelte/store';
import gridHelp from 'svelte-grid/build/helper/index.mjs';
import { initialLayouts } from '../data/initialLayouts';
import { activePage } from './activePageStore';

const { subscribe, set, update } = writable(
  JSON.parse(localStorage.getItem('layoutsStore')) ||
    initialLayouts
);

subscribe((value) => {
  localStorage.setItem('layouts', JSON.stringify(value));
});

let activePageValue;
activePage.subscribe((value) => {
  activePageValue = value;
});

const { item } = gridHelp;

const generateCardId = () => {
  return 'c' + Math.random().toString(36).substr(2, 9);
};

const cols = 6;

// Update functions

const updateLayout = (newLayout) => {
  update((prev) => {
    return { ...prev, [activePageValue]: newLayout };
  });
};

const addLayout = (pageId) => {
  update((prev) => {
    return { ...prev, [pageId]: [] };
  });
};

const toggleEditmode = (editmode) => {
  update((prev) => {
    let newLayouts = {};
    let isResizable = false;
    for (const property in prev) {
      isResizable = prev;
      newLayouts[property] = prev[property].map((card) => {
        isResizable = card.canResize;
        return {
          ...card,
          [cols]: {
            ...card[cols],
            draggable: editmode,
            resizable: isResizable ? editmode : false,
          },
        };
      });
    }
    return newLayouts;
  });
};

export const layouts = {
  subscribe,
  updateLayout,
  addLayout,
  toggleEditmode,
};
