<script>
  import { layouts } from '../../stores/layoutsStore';
  import { pages } from '../../stores/pagesStore';
  import MenubarButton from './MenubarButton.svelte';
  import PagesbarDnD from './PagesbarDnD.svelte';

  export let editmode;

  let newlyAddedPageId = '';

  const setNewlyAddedPageId = (id) => {
    newlyAddedPageId = id;
  };

  const handleAddPageClick = () => {
    setNewlyAddedPageId(pages.addPage());
    layouts.addLayout(newlyAddedPageId);
  };
</script>

<div class="pages-menu">
  <PagesbarDnD
    {editmode}
    {newlyAddedPageId}
    {setNewlyAddedPageId}
  />
  {#if editmode}
    <div class="pages-menu__button--add-page">
      <MenubarButton
        on:click={handleAddPageClick}
        icon="plus-sign-square"
      />
    </div>
  {/if}
</div>

<style>
  .pages-menu {
    position: relative;
    display: flex;
  }
  .pages-menu__button--add-page {
    position: absolute;
    display: flex;
    right: -3rem;
    justify-content: center;
    align-items: center;
  }
</style>
