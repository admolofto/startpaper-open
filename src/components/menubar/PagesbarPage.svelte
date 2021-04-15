<script>
  import { activePage } from '../../stores/activePageStore';
  import { pages } from '../../stores/pagesStore';
  import MenubarButton from './MenubarButton.svelte';
  import PagesbarPageName from './PagesbarPageName.svelte';
  import Dropdown from '../dropdown/Dropdown.svelte';
  import InputText from '../inputs/InputText.svelte';
  import PageDropdownSetLock from './PagesbarPageDropdownLock.svelte';

  export let page,
    pageIndex,
    editmode,
    newlyAddedPageId,
    setNewlyAddedPageId;

  $: isActivePage = page.id === $activePage;

  let newPageName = page.name;

  $: isPageLocked = $pages[pageIndex].locked;

  let showDropdown = false;
  const setShowDropdown = (bool) => {
    showDropdown = bool;
  };

  let isRenaming = false;
  const setIsRenaming = (bool) => {
    setShowDropdown(false);
    isRenaming = bool;
  };

  const renamePage = () => {
    pages.renamePage(pageIndex, newPageName);
  };

  let isLocking = false;
  const setIsLocking = (bool) => {
    setShowDropdown(false);
    isLocking = bool;
  };

  $: if (newlyAddedPageId === page.id) {
    setTimeout(() => {
      setIsRenaming(true);
      setNewlyAddedPageId('');
    }, 200);
  }

  const handlePageItemClick = () => {
    activePage.setActivePage(page.id);
  };

  const handlePageItemOptionsClick = () => {
    setShowDropdown(true);
  };

  $: dropdownOptions = [];

  $: dropdownOptionsDefault = [
    {
      text: isPageLocked ? 'Unlock' : 'Lock',
      icon: isPageLocked ? 'unlock' : 'lock',
      function: () => {
        setIsLocking(true);
      },
    },
    {
      text: 'Rename',
      icon: 'rename',
      function: () => {
        setIsRenaming(true);
      },
    },
  ];

  $: dropdownOptionsDelete = [
    { divider: true },
    {
      text: 'Delete',
      icon: 'trashcan',
      iconColor: 'red',
      function: () => {
        pages.removePage(pageIndex, page.id);
      },
    },
  ];

  const hideDeleteIfOnlyOnePage = (numberOfPages) => {
    if (numberOfPages > 1) {
      dropdownOptions = [
        ...dropdownOptionsDefault,
        ...dropdownOptionsDelete,
      ];
    } else {
      dropdownOptions = dropdownOptionsDefault;
    }
  };

  $: hideDeleteIfOnlyOnePage($pages.length);
</script>

<div class="page-item">
  <div
    class="page-item__name"
    on:click={handlePageItemClick}
  >
    <PagesbarPageName pageName={page.name} {isActivePage} />
  </div>
  {#if editmode}
    <MenubarButton
      icon="chevron-down"
      size="20"
      style={{
        alt: true,
        borderRadius: '50%',
      }}
      on:click={handlePageItemOptionsClick}
    />
  {/if}
  <div
    class="page-item__dropdown page-item__dropdown-options"
  >
    <Dropdown
      {dropdownOptions}
      {showDropdown}
      {setShowDropdown}
    />
  </div>
  <div
    class="page-item__dropdown page-item__dropdown-input"
  >
    <Dropdown type="input" showDropdown={isRenaming}>
      <InputText
        inputType="text"
        bind:value={newPageName}
        on:change={() => renamePage()}
        on:blur={() => setIsRenaming(false)}
        handleEnterPress={() => setIsRenaming(false)}
      />
    </Dropdown>

    <PageDropdownSetLock
      {isLocking}
      {setIsLocking}
      {pageIndex}
      {isPageLocked}
    />
  </div>
</div>

<style>
  .page-item {
    position: relative;
    display: flex;
    align-items: center;
  }
  .page-item__name {
    margin-right: 0.2rem;
  }
  .page-item__dropdown {
    position: absolute;
    overflow: visible;
    left: 0;
  }
  .page-item__dropdown-options {
    top: 2rem;
  }
  .page-item__dropdown-input {
    top: 1rem;
  }
</style>
