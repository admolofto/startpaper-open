<script>
  import { fade } from "svelte/transition";

  export let renderOutsideArea,
    showOutsideArea = false;
</script>

{#if renderOutsideArea}
  <div class="detect-outside" on:click />
  {#if showOutsideArea}
    <div
      class="detect-outside detect-outside__show-area"
      transition:fade={{ duration: 200 }}
    />
  {/if}
{/if}

<style>
  .detect-outside {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    cursor: default;
  }
  .detect-outside__show-area {
    z-index: 98;
    background: rgba(100, 100, 100, 0.5);
  }
</style>
