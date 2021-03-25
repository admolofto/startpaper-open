<script>
  import Icon from '../Icon.svelte';
  export let isActive = false,
    size = '30',
    icon,
    opacity = false,
    activeIcon = '',
    style = {
      hoverBackground: 'rgba(220, 230, 230, 1)',
      borderRadius: '5px',
    };
</script>

<button
  class="menubar__button"
  style="--border-radius: {style.borderRadius}; --hover-background: {style.hoverBackground};"
  on:click
>
  {#if !isActive}
    <Icon {icon} {size} {opacity} />
  {:else}
    <Icon icon={activeIcon} {size} />
  {/if}
</button>

<style>
  .menubar__button {
    border-radius: var(--border-radius);
    padding: 0.1rem;
    width: fit-content;
    height: fit-content;
  }
  .menubar__button:hover {
    background: var(--hover-background);
  }
</style>
