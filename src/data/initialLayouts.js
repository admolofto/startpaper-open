import gridHelp from 'svelte-grid/build/helper/index.mjs';

const { item } = gridHelp;

export const initialLayouts = {
  p00: [
    {
      id: 'c03',
      6: item({
        x: 2,
        y: 1,
        w: 1,
        h: 1,
        resizable: false,
        draggable: false,
      }),
      name: 'Bookmark',
      canResize: false,
    },
    {
      id: 'c12',
      6: item({
        x: 1,
        y: 0,
        w: 1,
        h: 2,
        resizable: true,
        draggable: false,
      }),
      name: 'Poster',
      canResize: false,
    },
    {
      id: 'c12234',
      6: item({
        x: 3,
        y: 1,
        w: 2,
        h: 1,
        resizable: false,
        draggable: false,
      }),
      name: 'Stock',
      canResize: false,
    },
    {
      id: 'c00',
      6: item({
        x: 1,
        y: 0,
        w: 4,
        h: 1,
        resizable: false,
        draggable: false,
      }),
      name: 'Message',
      canResize: true,
    },
    {
      id: 'c01',
      6: item({
        x: 1,
        y: 2,
        w: 2,
        h: 3,
        resizable: false,
        draggable: false,
      }),
      name: 'Photo',
      canResize: true,
    },
    {
      id: 'c02',
      6: item({
        x: 3,
        y: 2,
        w: 2,
        h: 3,
        resizable: false,
        draggable: false,
      }),
      name: 'Note',
      canResize: true,
    },
  ],
  p01: [
    {
      id: 'c07',
      6: item({
        x: 1,
        y: 1,
        w: 1,
        h: 1,
        resizable: false,
        draggable: false,
      }),
      name: 'Bookmark',
      canResize: false,
    },
    {
      id: 'c04',
      6: item({
        x: 1,
        y: 0,
        w: 4,
        h: 1,
        resizable: false,
        draggable: false,
      }),
      name: 'Message',
      canResize: true,
    },
    {
      id: 'c05',
      6: item({
        x: 1,
        y: 2,
        w: 2,
        h: 3,
        resizable: false,
        draggable: false,
      }),
      name: 'Photo',
      canResize: true,
    },
    {
      id: 'c06',
      6: item({
        x: 3,
        y: 2,
        w: 2,
        h: 3,
        resizable: false,
        draggable: false,
      }),
      name: 'Note',
      canResize: true,
    },
  ],
};
