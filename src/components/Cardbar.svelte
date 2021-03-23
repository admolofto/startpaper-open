<script>
  import { cardLibrary } from '../data/cardLibrary';
  import { layouts } from '../stores/layoutsStore';
  import { fly } from 'svelte/transition';
  import { quintInOut } from 'svelte/easing';

  export let addmode;

  const handleCardClick = (card) => {
    layouts.addCard(card);
  };
</script>

{#if addmode}
  <div
    class="cardbar"
    transition:fly={{
      duration: 450,
      x: -225,
      opacity: 0.7,
      easing: quintInOut,
    }}
  >
    {#each cardLibrary as card}
      <div class="cardbar__card">
        <button
          class="cardbar__card--button"
          on:click={() => handleCardClick(card)}
        />
        <svelte:component
          this={card.cardFront}
          cardStore={card.createCardStore()}
        />
        <h1 class="cardbar__card--name">{card.name}</h1>
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
    border-radius: 5px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
    background: rgba(220, 200, 200, 0.06);
    width: 225px;
    overflow-y: scroll;
    height: calc(100vh - 4rem);
  }
  .cardbar__card {
    position: relative;
    margin-top: 2rem;
    transition: all;
  }
  .cardbar__card:hover {
    transform: scale(1.03);
  }
  .cardbar__card--button {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .cardbar__card--name {
    text-align: center;
    font-size: small;
  }
</style>
