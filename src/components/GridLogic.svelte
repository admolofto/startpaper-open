<script>
  import Grid from 'svelte-grid';
  import { layouts } from '../stores/layoutsStore';
  import { activePage } from '../stores/activePageStore';
  import CardLogic from './cards/CardLogic.svelte';
  import LockedGrid from './LockedGrid.svelte';
  import { pages } from '../stores/pagesStore';
  import DetectOutsideClick from '../utils/DetectOutsideClick.svelte';

  export let editmode;

  $: activePageIndex = $pages.findIndex(
    (item) => item.id === $activePage
  );
  $: isLocked = $pages[activePageIndex].locked;
  const setIsLocked = (bool) => {
    isLocked = bool;
  };

  const rowHeight = 130;
  const gap = [10, 10];

  let cols = [
    [1500, 6],
    [1024, 6],
    [500, 6],
  ];

  $: items = $layouts[$activePage];

  const onChange = () => {
    layouts.updateLayout(items);
  };

  let flippedCardId = '';
  let optionsFlip = false;
  let optionsFlippedCardId = '';

  const flipCard = (
    cardId,
    side = 'front',
    opts = { optionsFlip: false }
  ) => {
    if (side === 'front') {
      if (!opts.optionsFlip) {
        layouts.changeZIndex(cardId, '10');
        layouts.setCardLock(cardId, true);
      } else {
        optionsFlip = true;
        optionsFlippedCardId = cardId;
      }
      flippedCardId = '';
    } else {
      if (!opts.optionsFlip) {
        layouts.changeZIndex(cardId, '100');
        layouts.setCardLock(cardId, false);
      }
      flippedCardId = cardId;
      optionsFlip = false;
      optionsFlippedCardId = '';
    }
  };

  const handleOutsideClick = () => {
    flipCard(flippedCardId);
  };
</script>

<DetectOutsideClick
  on:click={handleOutsideClick}
  showOutsideArea={true}
  renderOutsideArea={flippedCardId !== '' || optionsFlip}
/>

<div class="grid">
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

<style>
  .grid {
    padding-top: 3rem;
  }
  :global(.svlt-grid-active) {
    opacity: 1 !important;
  }
  :global(.svlt-grid-shadow) {
    background: none !important;
  }
</style>
