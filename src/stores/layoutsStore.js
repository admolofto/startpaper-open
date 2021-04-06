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

$: console.log(columnsValue);

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
      console.log(pageId);
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

TODO: Don't create a new card. Only update the draggable/resizable of the currentColumn

const setCardLock = (cardId, bool) => {
  update((prev) => {
    let cardIndex = returnCardIndexForActivePage(cardId);
    if (cardIndex !== -1) {
      let isResizable =
        prev[activePageValue][cardIndex].canResize;
      console.log(columnsValue.currentColumn);
      let newCard = {
        ...prev[activePageValue][cardIndex][
          columnsValue.currentColumn
        ],
        draggable: bool,
        resizable: bool && isResizable ? true : false,
      };
      prev[activePageValue][cardIndex][
        columnsValue.currentColumn
      ] = newCard;
    }
    return prev;
  });
};

const addCard = (card) => {
  update((prev) => {
    let newCard = {
      id: generateCardId(),
      name: card.name,
      canResize: card.canResize,
    };

    colsList.forEach((col) => {
      console.log(col);
      newCard[col[1]] = item({
        x: 0,
        y: 0,
        w: card.initW,
        h: card.initH,
        min: card.min,
        max: card.max,
        draggable: true,
        resizable: card.canResize,
      });
    });

    colsList.forEach((col) => {
      let findOutPosition = gridHelp.findSpace(
        newCard,
        prev[activePageValue],
        col[1]
      );

      console.log(findOutPosition);

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
