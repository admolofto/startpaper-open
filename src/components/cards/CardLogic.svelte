<script>
  import CardDisplay from './CardDisplay.svelte';
  import { cardLibrary } from '../../data/cardLibrary';
  import DetectDrag from './DetectDrag.svelte';
  import OptionsTemplate from './OptionsTemplate.svelte';

  export let cardId,
    cardName,
    editmode,
    flippedCardId,
    flipCard,
    optionsFlippedCardId;

  const cardIndex = cardLibrary.findIndex(
    (item) => item.name === cardName
  );

  const cardFront = cardLibrary[cardIndex].cardFront;
  const cardOpts = cardLibrary[cardIndex].cardOpts;
  const cardStore = cardLibrary[cardIndex].createCardStore(
    cardId
  );
  $: isCardFlipped = flippedCardId === cardId;

  let hideBack = false;
  // See if we need to add this. If so, need to fix photo reposition functionality.
  // let hideBackInterval;
  // $: if (flippedCardId === cardId) {
  //   if (optionsFlippedCardId !== cardId)
  //     hideBackInterval = setInterval(() => {
  //       hideBack = true;
  //     }, 150);
  // } else {
  //   hideBack = false;
  //   clearInterval(hideBackInterval);
  // }
</script>

<DetectDrag let:isDragging>
  <CardDisplay
    {isDragging}
    {editmode}
    {cardId}
    {flippedCardId}
    {flipCard}
    {optionsFlippedCardId}
  >
    <div class="card-logic__slot">
      {#if !hideBack}
        <svelte:component
          this={cardFront}
          {cardStore}
          {cardId}
          {flipCard}
          {isCardFlipped}
        />
      {/if}
    </div>
    <div class="card-logic__slot" slot="back">
      <OptionsTemplate {cardId} {cardName} {flipCard}>
        <svelte:component
          this={cardOpts}
          {cardStore}
          {cardId}
          {flipCard}
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
