import { writable } from 'svelte/store';
import gridHelp from 'svelte-grid/build/helper/index.mjs';
import { initialLayouts } from '../data/initialLayouts';
import { activePage } from './activePageStore';

const { subscribe, set, update } = writable(
  JSON.parse(localStorage.getItem('layouts')) ||
    initialLayouts
);

let layoutsValue;
subscribe((value) => {
  localStorage.setItem('layouts', JSON.stringify(value));
  layoutsValue = value;
});

let activePageValue;
activePage.subscribe((value) => {
  activePageValue = value;
});

const { item } = gridHelp;

const returnCardIndexForActivePage = (cardId) => {
  return layoutsValue[activePageValue].findIndex(
    (item) => item.id === cardId
  );
};

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

const changeZIndex = (cardId, zIndex) => {
  let cardIndex = returnCardIndexForActivePage(cardId);
  setTimeout(() => {
    if (cardIndex !== -1) {
      let elements = document.getElementsByClassName(
        'svlt-grid-item'
      );
      elements[cardIndex].style.zIndex = zIndex;
    }
  }, 200);
};

const setCardLock = (cardId, bool) => {
  update((prev) => {
    let cardIndex = returnCardIndexForActivePage(cardId);
    if (cardIndex !== -1) {
      let isResizable =
        prev[activePageValue][cardIndex].canResize;
      let newCard = {
        ...prev[activePageValue][cardIndex][cols],
        draggable: bool,
        resizable: bool && isResizable ? true : false,
      };
      prev[activePageValue][cardIndex][cols] = newCard;
    }
    return prev;
  });
};

const addCard = (card) => {
  update((prev) => {
    let newCard = {
      id: generateCardId(),
      [cols]: item({
        x: 0,
        y: 0,
        w: card.initW,
        h: card.initH,
        min: card.min,
        max: card.max,
        draggable: true,
        resizable: card.canResize,
      }),
      name: card.name,
      canResize: card.canResize,
    };

    let findOutPosition = gridHelp.findSpace(
      newCard,
      prev[activePageValue],
      cols
    );

    newCard = {
      ...newCard,
      [cols]: { ...newCard[cols], ...findOutPosition },
    };

    let cards = prev[activePageValue];
    cards = [...cards, newCard];
    // Do I need this?
    //cards = gridHelp.normalize(cards, cols)
    prev[activePageValue] = cards;
    console.log(prev);
    return prev;
  });
};

const removeCard = (cardID) => {
  update((prev) => {
    let layout = prev[activePageValue].filter(
      (value) => value.id !== cardID
    );
    prev[activePageValue] = layout;
    return prev;
  });
};

const getCardDimensions = (cardId) => {
  let cardIndex = returnCardIndexForActivePage(cardId);
  console.log(cardIndex);
  console.log(layoutsValue[activePageValue]);
  return {
    w: layoutsValue[activePageValue][cardIndex][cols].w,
    h: layoutsValue[activePageValue][cardIndex][cols].h,
  };
};

export const layouts = {
  subscribe,
  updateLayout,
  addLayout,
  toggleEditmode,
  changeZIndex,
  setCardLock,
  addCard,
  removeCard,
  getCardDimensions,
};
