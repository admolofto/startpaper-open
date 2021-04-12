<script>
  import Icon from '../Icon.svelte';

  export let icon = '',
    iconColor = 'black',
    text = '',
    divider = false;

  let iconSize = '20';
</script>

{#if !divider}
  <button
    class="dropdown-item text-left hover:bg-gray-100 text-sm"
    on:click
  >
    <div class="dropdown-item__icon">
      <Icon {icon} size={iconSize} color={iconColor} />
    </div>
    <p>
      {text}
    </p>
  </button>
{:else}
  <div class="dropdown-item--divider" />
{/if}

<style>
  .dropdown-item {
    display: flex;
    align-items: center;
    padding: 0 0.25rem;
    height: 2rem;
    width: 100%;
  }
  .dropdown-item:hover {
    background: rgba(220, 230, 230, 1);
  }
  .dropdown-item__icon {
    width: 2rem;
  }
  .dropdown-item--divider {
    width: 100%;
    border-top: 1px solid var(--theme-colors-border);
    margin: 0.25rem 0;
  }
</style>
