<script>
  import { layouts } from "../../stores/layoutsStore";
  import Icon from "../Icon.svelte";

  export let cardId, cardName, flipCard, isCardInLastColumn;

  const handleRemoveClick = () => {
    flipCard(cardId);
    layouts.removeCard(cardId);
  };
</script>

<div class="options-template" class:last-column={isCardInLastColumn}>
  <div class="options-template__header">
    <h1 class="options-template__header--title">
      {cardName}
    </h1>
    <div>
      <button on:click={handleRemoveClick}>
        <Icon icon="trashcan" size="25" color="red" />
      </button>
    </div>
  </div>

  <div class="options-template__options-slot">
    <slot />
  </div>
</div>

<style>
  .options-template {
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    width: max-content;
    padding: 1rem;
    background: var(--theme-colors-card);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
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
  .last-column {
    right: 0;
  }
</style>
