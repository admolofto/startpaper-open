<script>
  export let pageName, isActivePage;
</script>

<h1
  class="page-name"
  class:page-name--active={isActivePage}
>
  {pageName}
</h1>

<style>
  .page-name {
    font-size: large;
    color: var(--theme-colors-page-active);
    opacity: 0.5;
  }
  .page-name--active {
    opacity: 1;
  }
</style>
