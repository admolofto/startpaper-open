<script>
  import Grid from "svelte-grid";
  import gridHelp from "svelte-grid/build/helper/index.mjs";
  import { layouts } from "../stores/layoutsStore";
  import { activePage } from "../stores/activePageStore";
  import CardLogic from "./cards/CardLogic.svelte";
  import LockedGrid from "./LockedGrid.svelte";
  import { pages } from "../stores/pagesStore";
  import DetectOutsideClick from "../utils/DetectOutsideClick.svelte";
  import { onMount } from "svelte";
  import { columns } from "../stores/columnsStore";

  export let editmode;

  let gridContainer;

  $: pageIndex = $pages.findIndex((item) => item.id === $activePage);

  $: isLocked = $pages[pageIndex]?.locked;

  const setIsLocked = (bool) => {
    isLocked = bool;
  };

  const rowHeight = 130;
  const gap = [10, 10];

  $: staticWidth = "1040px";
  $: cols = $columns.columns;

  $: if (!$columns.dynamic) {
    let staticCols = $columns.staticColumns;
    if (staticCols === 2) {
      staticWidth = "375px";
    } else if (staticCols === 3) {
      staticWidth = "700px";
    } else if (staticCols === 4) {
      staticWidth = "870px";
    } else if (staticCols === 5) {
      staticWidth = "1040px";
    } else if (staticCols === 6) {
      staticWidth = "1210px";
    } else if (staticCols === 7) {
      staticWidth = "1380px";
    } else if (staticCols === 8) {
      staticWidth = "1550px";
    }
  }

  $: items = $layouts[$activePage];

  const onChange = () => {
    items = gridHelp.normalize(items, $columns.currentColumn);
    layouts.updateLayout(items);
  };

  let flippedCardId = "";
  let optionsFlip = false;
  let optionsFlippedCardId = "";

  const flipCard = (cardId, side = "front", opts = { optionsFlip: false }) => {
    if (side === "front") {
      if (!opts.optionsFlip) {
        layouts.changeZIndex(cardId, "10");
        layouts.setCardLock(cardId, true);
      } else {
        optionsFlip = true;
        optionsFlippedCardId = cardId;
      }
      flippedCardId = "";
    } else {
      if (!opts.optionsFlip) {
        layouts.changeZIndex(cardId, "100");
        layouts.setCardLock(cardId, false);
      }
      flippedCardId = cardId;
      optionsFlip = false;
      optionsFlippedCardId = "";
    }
  };

  const handleOutsideClick = () => {
    flipCard(flippedCardId);
  };

  const handleEnterPress = (e) => {
    if (e.code === "Enter") {
      flipCard(flippedCardId);
    }
  };

  $: if (flippedCardId !== "") {
    document.addEventListener("keydown", handleEnterPress);
  } else {
    document.removeEventListener("keydown", handleEnterPress);
  }

  onMount(async () => {
    if ($columns.dynamic) {
      let resObs = new ResizeObserver((e) => {
        let width = e[0].contentRect.width;
        let currentCol;
        cols.forEach((col) => {
          if (width === col[0]) {
            currentCol = col[1];
          }
        });
        columns.setCurrentColumn(currentCol);
        if (flippedCardId !== "") {
          flipCard(flippedCardId);
        }
      }).observe(gridContainer);
    }
  });
</script>

<DetectOutsideClick
  on:click={handleOutsideClick}
  showOutsideArea={true}
  renderOutsideArea={flippedCardId !== "" || optionsFlip}
/>

<div class="grid--container">
  <div
    class="grid"
    class:grid-dynamic={$columns.dynamic}
    class:grid-static={!$columns.dynamic}
    style="--static-width: {staticWidth}"
    bind:this={gridContainer}
  >
    {#if !isLocked}
      <Grid
        bind:items
        on:change={onChange}
        let:item
        let:dataItem
        bind:cols
        {rowHeight}
        {gap}
        fastStart
        scroller={document.documentElement}
      >
        <CardLogic
          cardId={dataItem.id}
          cardName={dataItem.name}
          {editmode}
          {flippedCardId}
          {flipCard}
          {optionsFlippedCardId}
        />
      </Grid>
    {:else}
      <LockedGrid {setIsLocked} />
    {/if}
  </div>
</div>

<style>
  @media screen and (min-width: 375px) {
    .grid-dynamic {
      width: 375px;
    }
  }
  @media screen and (min-width: 700px) {
    .grid-dynamic {
      width: 700px;
    }
  }
  @media screen and (min-width: 870px) {
    .grid-dynamic {
      width: 870px;
    }
  }
  @media screen and (min-width: 1040px) {
    .grid-dynamic {
      width: 1040px;
    }
  }
  @media screen and (min-width: 1210px) {
    .grid-dynamic {
      width: 1210px;
    }
  }
  @media screen and (min-width: 1380px) {
    .grid-dynamic {
      width: 1380px;
    }
  }
  @media screen and (min-width: 1550px) {
    .grid-dynamic {
      width: 1550px;
    }
  }
  .grid--container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 4.1rem;
  }
  .grid {
    flex: none;
  }
  .grid-static {
    width: var(--static-width);
  }
  :global(.svlt-grid-active) {
    opacity: 1 !important;
  }
  :global(.svlt-grid-shadow) {
    background: none !important;
  }
</style>
