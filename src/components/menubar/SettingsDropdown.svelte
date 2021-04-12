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

  const handleAppearanceClick = () => {
    setIsRenaming(true);
  };
</script>

<Dropdown {showDropdown} {setShowDropdown}>
  <DropdownItem
    on:click={handleAppearanceClick}
    text="Appearance"
  />
  <DropdownItem divider={true} />
  <DropdownItem
    icon="trashcan"
    text="Delete"
    iconColor="red"
  />
</Dropdown>
