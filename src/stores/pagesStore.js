import { writable } from 'svelte/store';
import { activePage } from './activePageStore';

const initialPages = [
  { id: 'p00', name: 'Home' },
  { id: 'p01', name: 'News' },
];

const { subscribe, set, update } = writable(
  JSON.parse(localStorage.getItem('pages')) || initialPages
);

subscribe((value) => {
  localStorage.setItem('pages', JSON.stringify(value));
});

const generatePageId = () => {
  return 'p' + Math.random().toString(36).substr(2, 9);
};

let activePageValue;
activePage.subscribe((value) => {
  activePageValue = value;
});

// Pages update functions

const setPages = (newPages) => {
  set(newPages);
};

const renamePage = (pageIndex, newPageName) => {
  update((prev) => {
    prev[pageIndex] = {
      ...prev[pageIndex],
      name: newPageName,
    };
    return prev;
  });
};

const setPageLockStatus = (pageIndex, lockStatus) => {
  update((prev) => {
    prev[pageIndex] = {
      ...prev[pageIndex],
      locked: lockStatus,
    };
    return prev;
  });
};

const addPage = () => {
  let genId = generatePageId();
  update((prev) => {
    prev.push({
      id: genId,
      name: 'Untitled',
    });
    return prev;
  });
  return genId;
};

const removePage = (pageIndex, PageId) => {
  update((prev) => {
    if (activePageValue === PageId) {
      if (pageIndex === 0) {
        activePage.set(prev[1].id);
      } else {
        activePage.set(prev[pageIndex - 1].id);
      }
    }
    prev.splice(pageIndex, 1);
    return prev;
  });
};

export let pages = {
  subscribe,
  setPages,
  renamePage,
  setPageLockStatus,
  addPage,
  removePage,
};
