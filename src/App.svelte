<script>
  import Paper from "./components/Paper.svelte";
  import { ThemeWrapper } from "svelte-themer";
  import { themes } from "./themes";
  import { userInfo } from "./stores/userInfoStore";

  $: customScrollbar = $userInfo.customScrollbars;
</script>

<ThemeWrapper {themes} mode="light">
  <div class="paper__main" class:custom-scrollbar={customScrollbar}>
    <Paper />
  </div>
</ThemeWrapper>

<style>
  :global(body) {
    background: var(--theme-colors-background);
  }

  :global(h1, h2, h3, p) {
    color: var(--theme-colors-text);
  }

  /* width */
  :global(.custom-scrollbar *::-webkit-scrollbar) {
    width: 8px;
  }

  /* Track */
  :global(.custom-scrollbar *::-webkit-scrollbar-track) {
    background: none;
  }

  /* Handle */
  :global(.custom-scrollbar *::-webkit-scrollbar-thumb) {
    background: rgba(100, 100, 100, 0.5);
    border-radius: 5px;
    transition: all 300ms;
  }

  /* Handle on hover */
  :global(.custom-scrollbar *::-webkit-scrollbar-thumb:hover) {
    background: #555;
  }
</style>
