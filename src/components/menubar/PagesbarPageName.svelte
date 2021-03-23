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
    color: darkgrey;
  }
  .page-name--active {
    color: black;
    text-decoration: underline;
  }
</style>
