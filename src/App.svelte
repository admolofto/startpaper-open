<script>
  import Paper from './components/Paper.svelte';
</script>

<div>
  <Paper />
</div>

<style>
  :global(body) {
    background: rgb(251, 251, 252);
  }

  :global(h1, h2, h3) {
    color: var(--header-color);
  }
</style>
