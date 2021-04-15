import gridHelp from 'svelte-grid/build/helper/index.mjs';

const { item } = gridHelp;

export const initialLayouts = {
  p00: [
    {
      id: 'c000',
      8: item({
        x: 3,
        y: 0,
        w: 2,
        h: 1,
        resizable: false,
        draggable: false,
        fixed: true,
      }),
      7: item({
        x: 2,
        y: 0,
        w: 3,
        h: 1,
        resizable: false,
        draggable: false,
        fixed: true,
      }),
      6: item({
        x: 2,
        y: 0,
        w: 2,
        h: 1,
        resizable: false,
        draggable: false,
        fixed: true,
      }),
      5: item({
        x: 1,
        y: 0,
        w: 3,
        h: 1,
        resizable: false,
        draggable: false,
        fixed: true,
      }),
      4: item({
        x: 1,
        y: 0,
        w: 2,
        h: 1,
        resizable: false,
        draggable: false,
        fixed: true,
      }),
      3: item({
        x: 0,
        y: 0,
        w: 3,
        h: 1,
        resizable: false,
        draggable: false,
        fixed: true,
      }),
      2: item({
        x: 0,
        y: 0,
        w: 2,
        h: 1,
        resizable: false,
        draggable: false,
        fixed: true,
      }),
      name: 'Message',
      canResize: true,
    },
  ],
};
