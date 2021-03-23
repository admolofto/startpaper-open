<script>
  import { fade } from 'svelte/transition';

  export let renderOutsideArea,
    showOutsideArea = false;
</script>

{#if renderOutsideArea}
  <div
    class="dropdown__outside"
    class:outside-area--show={showOutsideArea}
    transition:fade
    on:click
  />
{/if}

<style>
  .dropdown__outside {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    cursor: default;
  }
  .outside-area--show {
    background: rgba(100, 100, 100, 0.5);
  }
</style>
