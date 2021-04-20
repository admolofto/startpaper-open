import { writable } from 'svelte/store';
import gridHelp from 'svelte-grid/build/helper/index.mjs';
import { initialLayouts } from '../data/initialLayouts';
import { activePage } from './activePageStore';
import { columns } from './columnsStore';

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

let columnsValue;
columns.subscribe((value) => {
  columnsValue = value;
});

const colsList = columnsValue.columns;

const { item } = gridHelp;

const returnCardIndexForActivePage = (cardId) => {
  return layoutsValue[activePageValue].findIndex(
    (item) => item.id === cardId
  );
};

const generateCardId = () => {
  return 'c' + Math.random().toString(36).substr(2, 9);
};

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
    for (const pageId in prev) {
      isResizable = prev;
      newLayouts[pageId] = prev[pageId].map((card) => {
        isResizable = card.canResize;
        let newCard = { ...card };
        colsList.forEach((col) => {
          newCard[col[1]] = {
            ...card[col[1]],
            draggable: editmode,
            resizable: isResizable ? editmode : false,
          };
        });
        return newCard;
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

      let currentColumn = columnsValue.currentColumn;
      let oldCard = prev[activePageValue][cardIndex];
      let newCard = {
        ...oldCard,
        [currentColumn]: {
          ...oldCard[currentColumn],
          draggable: bool,
          resizable: bool && isResizable ? true : false,
        },
      };
      prev[activePageValue][cardIndex] = newCard;
    }
    return prev;
  });
};

const fixCard = (cardId) => {
  update((prev) => {
    let cardIndex = returnCardIndexForActivePage(cardId)
    let newCard = { ...prev[activePageValue][cardIndex] }
    colsList.forEach((col) => {
      newCard[col[1]] = { ...newCard[col[1]], fixed: !newCard[col[1]].fixed }
    })
    prev[activePageValue][cardIndex] = newCard
    return prev
  })
}

const addCard = (card) => {
  update((prev) => {
    let newCard = {
      id: generateCardId(),
      name: card.name,
      canResize: card.canResize,
    };

    colsList.forEach((col) => {
      newCard[col[1]] = item({
        x: 0,
        y: 0,
        w: card.initW,
        h: card.initH,
        min: card.min,
        max: card.max,
        draggable: true,
        resizable: card.canResize,
        fixed: true,
      });
    });

    colsList.forEach((col) => {
      let findOutPosition = gridHelp.findSpace(
        newCard,
        prev[activePageValue],
        col[1]
      );

      newCard = {
        ...newCard,
        [col[1]]: {
          ...newCard[col[1]],
          ...findOutPosition,
        },
      };
    });

    let cards = prev[activePageValue];
    cards = [...cards, newCard];
    //cards = gridHelp.normalize(cards, cols)
    prev[activePageValue] = cards;
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

const getCardLayout = (cardId) => {
  let cardIndex = returnCardIndexForActivePage(cardId);
  let currentColumn = columnsValue.currentColumn;
  return {
    x:
      layoutsValue[activePageValue][cardIndex][
        currentColumn
      ].x,
    y:
      layoutsValue[activePageValue][cardIndex][
        currentColumn
      ].y,
    w:
      layoutsValue[activePageValue][cardIndex][
        currentColumn
      ].w,
    h:
      layoutsValue[activePageValue][cardIndex][
        currentColumn
      ].h,
  };
};

const returnCardIndex = (cardId) => {
  return returnCardIndexForActivePage(cardId);
};

export const layouts = {
  subscribe,
  set,
  updateLayout,
  addLayout,
  toggleEditmode,
  changeZIndex,
  setCardLock,
  addCard,
  removeCard,
  getCardLayout,
  returnCardIndex,
  fixCard,
};
