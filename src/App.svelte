<script>
  import Paper from './components/Paper.svelte';
  import { ThemeWrapper } from 'svelte-themer';
  import { themes } from './themes';
</script>

<ThemeWrapper {themes}>
  <Paper />
</ThemeWrapper>

<style>
  :global(body) {
    background: var(--theme-colors-background);
  }

  :global(h1, h2, h3, p) {
    color: var(--theme-colors-text);
  }
</style>
