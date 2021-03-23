<script>
  import { pages } from '../../stores/pagesStore';
  import DropdownItem from '../dropdown/DropdownItem.svelte';
  import Dropdown from '../dropdown/Dropdown.svelte';

  export let showDropdown,
    setShowDropdown,
    setIsRenaming,
    setIsLocking,
    pageIndex,
    page;
  let iconSize = '18';

  const handleRenameClick = () => {
    setIsRenaming(true);
  };
  const handleDeleteClick = () => {
    pages.deletePage(pageIndex, page.id);
  };
  const handleLockClick = () => {
    setIsLocking(true);
  };
</script>

<Dropdown {showDropdown} {setShowDropdown}>
  <DropdownItem
    on:click={handleLockClick}
    icon="lock"
    text="Lock"
  />
  <DropdownItem
    on:click={handleRenameClick}
    icon="rename"
    text="Rename"
  />
  {#if $pages.length > 1}
    <DropdownItem divider={true} />
    <DropdownItem
      icon="trashcan"
      text="Delete"
      iconColor="red"
      on:click={handleDeleteClick}
    />
  {/if}
</Dropdown>
