<script>
  import DetectOutsideClick from '../../utils/DetectOutsideClick.svelte';

  import DropdownItem from './DropdownItem.svelte';

  export let showDropdown = true,
    type = 'options',
    dropdownOptions = [
      {
        divider: false,
        text: 'text',
        icon: 'icon',
        iconColor: 'black',
        function: () => {},
      },
    ],
    setShowDropdown = () => {},
    handleOutsideClick = () => setShowDropdown(false);
</script>

{#if showDropdown}
  <DetectOutsideClick
    renderOutsideArea={showDropdown}
    on:click={handleOutsideClick}
  />

  <div
    class="dropdown"
    class:dropdown-input={type === 'input'}
  >
    {#if type === 'options'}
      {#each dropdownOptions as option}
        {#if !option.divider}
          <DropdownItem
            on:click={() => option.function()}
            text={option.text}
            icon={option.icon}
            iconColor={option.iconColor}
          />
        {:else}
          <DropdownItem divider={true} />
        {/if}
      {/each}
    {:else}
      <slot />
    {/if}
  </div>
{/if}

<style>
  .dropdown {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 100;
    width: 8rem;
    background: var(--theme-colors-card);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 5px;
    border: 1px solid var(--theme-colors-border);
    padding: 0.25rem 0;
    overflow: visible;
  }
  .dropdown-input {
    width: 8rem;
  }
</style>
