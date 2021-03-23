<script>
  import CardDisplay from './CardDisplay.svelte';
  import { cardLibrary } from '../../data/cardLibrary';
  import DetectDrag from './DetectDrag.svelte';
  import OptionsTemplate from './options/OptionsTemplate.svelte';
  import DetectOutsideClick from '../../utils/DetectOutsideClick.svelte';

  export let cardId, cardName, editmode;

  let isFlipped = false;
  const setIsFlipped = (bool) => {
    isFlipped = bool;
    console.log(isFlipped);
  };

  const cardIndex = cardLibrary.findIndex(
    (item) => item.name === cardName
  );

  const cardFront = cardLibrary[cardIndex].cardFront;
  const cardOpts = cardLibrary[cardIndex].cardOpts;
  const cardStore = cardLibrary[cardIndex].createCardStore(
    cardId
  );

  // Stop rendering card's front to resolve rendering issues when changing some settings.
  let hideBack = false;
  let hideBackInterval;
  $: if (isFlipped) {
    hideBackInterval = setInterval(() => {
      hideBack = true;
    }, 150);
  } else {
    hideBack = false;
    clearInterval(hideBackInterval);
  }
</script>

{#if isFlipped}
  <DetectOutsideClick
    handleOutsideClick={() => setIsFlipped(false)}
  />
{/if}

<DetectDrag let:isDragging>
  <CardDisplay
    {isDragging}
    {editmode}
    {cardId}
    {isFlipped}
    {setIsFlipped}
  >
    <div class="card-logic__slot">
      {#if !hideBack}
        <svelte:component
          this={cardFront}
          {cardStore}
          {cardId}
        />
      {/if}
    </div>
    <div class="card-logic__slot" slot="back">
      <OptionsTemplate {cardId} {cardName}>
        <svelte:component
          this={cardOpts}
          {cardStore}
        /></OptionsTemplate
      >
    </div>
  </CardDisplay>
</DetectDrag>

<style>
  .card-logic__slot {
    width: 100%;
    height: 100%;
  }
</style>
