<script>
  import CardDisplay from './CardDisplay.svelte';
  import { cardLibrary } from '../../data/cardLibrary';
  import DetectDrag from './DetectDrag.svelte';
  import OptionsTemplate from './OptionsTemplate.svelte';
  import { columns } from '../../stores/columnsStore';
  import { layouts } from '../../stores/layoutsStore';
  import { activePage } from '../../stores/activePageStore';

  export let cardId,
    cardName,
    editmode,
    flippedCardId,
    flipCard,
    optionsFlippedCardId;

  const cardLibraryIndex = cardLibrary.findIndex(
    (item) => item.name === cardName
  );

  const cardFront = cardLibrary[cardLibraryIndex].cardFront;
  const cardOpts = cardLibrary[cardLibraryIndex].cardOpts;
  const cardStore = cardLibrary[
    cardLibraryIndex
  ].createCardStore(cardId);
  $: isCardFlipped = flippedCardId === cardId;

  $: cardIndex = layouts.returnCardIndex(cardId);
  $: cardPosX =
    $layouts[$activePage][cardIndex][$columns.currentColumn]
      .x;

  $: isCardInLastColumn = false;

  const checkIfCardInLastColumn = (posX) => {
    let currentColumn = $columns.currentColumn;
    isCardInLastColumn = posX === currentColumn - 1;
  };

  $: checkIfCardInLastColumn(cardPosX);

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
      <OptionsTemplate
        {cardId}
        {cardName}
        {flipCard}
        {isCardInLastColumn}
      >
        <svelte:component
          this={cardOpts}
          {cardStore}
          {cardId}
          {flipCard}
          {isCardInLastColumn}
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
