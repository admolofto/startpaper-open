<script>
  import { layouts } from '../../../stores/layoutsStore';
  import Icon from '../../Icon.svelte';

  export let cardId, cardName, flipCard;

  const handleDoneClick = () => {
    flipCard(cardId);
  };

  const handleRemoveClick = () => {
    layouts.removeCard(cardId);
  };
</script>

<div class="options-template">
  <div class="options-template__header">
    <h1 class="options-template__header--title">
      {cardName}
    </h1>
    <button on:click={handleRemoveClick}>
      <Icon icon="trashcan" />
    </button>
  </div>

  <div class="options-template__options-slot">
    <slot />
  </div>

  <button
    class="options-template__done-button"
    on:click={handleDoneClick}
  >
    Done
  </button>
</div>

<style>
  .options-template {
    min-width: 100%;
    min-height: 100%;
    width: max-content;
    padding: 1rem;
    background: white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 5px;
  }
  .options-template__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .options-template__header--title {
    font-size: x-large;
    margin-right: 0.5rem;
  }
  .options-template__options-slot {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;
  }
  .options-template__done-button {
    margin-top: 0.5rem;
  }
</style>
