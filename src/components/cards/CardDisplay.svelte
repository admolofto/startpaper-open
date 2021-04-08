<script>
  import CardTemplate from './CardTemplate.svelte';
  import { cardLibrary } from '../../data/cardLibrary';

  export let isDragging,
    editmode,
    cardId,
    cardName,
    flippedCardId,
    flipCard,
    optionsFlippedCardId;

  const handleFlipClick = () => {
    if (!isDragging) {
      flipCard(cardId, 'back');
    }
  };

  $: isFlipped = flippedCardId === cardId;
  $: isOptionsFlipped = optionsFlippedCardId === cardId;

  const cardLibraryIndex = cardLibrary.findIndex(
    (card) => card.name === cardName
  );
  const cardDisplay = cardLibrary[cardLibraryIndex].display;
</script>

<div
  class="card-display"
  class:card-display--flipped={isFlipped ||
    isOptionsFlipped}
  class:card-display--editmode={editmode}
>
  <div
    class="card-display__inner"
    class:card-display__inner--flipped={isFlipped}
  >
    {#if !isFlipped && editmode}
      {#if !isOptionsFlipped}
        <button
          on:click={handleFlipClick}
          class="card-display__options-button"
        />
      {/if}
    {/if}
    <div
      class="card-display__card card-display__card-front"
      class:hidden={isFlipped}
    >
      <CardTemplate
        background={cardDisplay.background}
        padding={cardDisplay.padding}
        overflow={cardDisplay.overflow}
        {editmode}
      >
        <slot>Front</slot>
      </CardTemplate>
    </div>

    <div class="card-display__card card-display__card-back">
      <slot name="back">Back</slot>
    </div>
  </div>
</div>

<style>
  .card-display {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all;
    transition-duration: 225ms;
    perspective: 1000px;
  }
  .card-display--editmode:hover {
    transform: scale(1.04);
  }
  .card-display--flipped {
    transform: scale(1.04);
  }
  .card-display__inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: all;
    transition-duration: 500ms;
    transform-style: preserve-3d;
  }
  .card-display__inner--flipped {
    transform: rotateY(180deg);
  }
  .card-display__options-button {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 70;
  }
  .card-display__card {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotateY(0deg);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .card-display__card-front {
    border-radius: 10px;
  }
  .card-display__card-back {
    transform: rotateY(180deg);
  }
</style>
