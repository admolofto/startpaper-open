<script>
  import { cardLibrary } from '../data/cardLibrary';
  import { layouts } from '../stores/layoutsStore';
  import { fly } from 'svelte/transition';
  import { quintInOut } from 'svelte/easing';
  import CardTemplate from './cards/CardTemplate.svelte';

  export let addmode;

  const handleCardClick = (card) => {
    layouts.addCard(card);
  };
</script>

{#if addmode}
  <div
    class="cardbar shadow-lg"
    transition:fly={{
      duration: 450,
      x: -225,
      opacity: 0.7,
      easing: quintInOut,
    }}
  >
    {#each cardLibrary as card, cardIndex}
      <div class="cardbar__card--container">
        <div
          class="cardbar__card"
          style="height: {card.preview.h === 1
            ? '110px'
            : `${
                card.preview.h * 110
              }px`};
            width: {card.preview.w === 1
            ? '193px'
            : `${card.preview.w * 193}`}
            "
        >
          <button
            class="cardbar__card--button"
            on:click={() => handleCardClick(card)}
          />
          <CardTemplate padding={card.display.padding}>
            <svelte:component
              this={card.cardFront}
              cardStore={card.createCardStore()}
              cardId={cardIndex}
            />
          </CardTemplate>

          <h1 class="cardbar__card--name">{card.name}</h1>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .cardbar {
    position: fixed;
    top: 4rem;
    z-index: 99;
    padding: 1rem;
    border-radius: 10px;
    width: 240px;
    overflow-y: scroll;
    height: calc(100vh - 4rem);
  }
  .cardbar:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: var(--theme-colors-background);
    opacity: 0.5;
  }
  .cardbar__card--container {
    margin: 2rem 0 4rem 0;
    height: fit-content;
  }
  .cardbar__card {
    position: relative;
    transition: all 300ms;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 10px;
  }
  .cardbar__card:hover {
    transform: scale(1.05);
  }
  .cardbar__card--button {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  .cardbar__card--name {
    text-align: center;
    font-size: small;
    font-weight: 700;
    margin-top: 0.5rem;
  }
</style>
