<script>
  export let handleOutsideClick = () => {};
</script>

<div
  class="dropdown__outside"
  on:click={handleOutsideClick}
/>

<style>
  .dropdown__outside {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    cursor: default;
    background: rgba(100, 100, 100, 0.5);
  }
</style>
