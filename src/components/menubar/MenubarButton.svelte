<script>
  import Icon from '../Icon.svelte';
  export let isActive = false,
    size = '30',
    icon,
    opacity = false,
    activeIcon = '',
    style = {
      borderRadius: '5px',
      alt: false
    };
</script>

<button
  class="menubar__button"
  class:alt-style={style.alt}
  style="--border-radius: {style.borderRadius};"
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
    background: var(--theme-colors-hover);
  }
  .alt-style:hover {
    background: var(--theme-colors-hover-alt)
  }

</style>
