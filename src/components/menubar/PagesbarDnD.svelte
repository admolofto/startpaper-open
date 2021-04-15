<script>
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';
  import { pages } from '../../stores/pagesStore';
  import PagesbarPage from './PagesbarPage.svelte';

  export let editmode,
    newlyAddedPageId,
    setNewlyAddedPageId;

  let items;
  pages.subscribe((value) => {
    items = value;
  });

  const dragOptions = {
    flipDurationMs: 300,
    dropTargetStyle: {
      outline: 'none',
      background: 'rgba(220, 230, 230, 1)',
      borderRadius: '10px',
    },
  };

  const handleDndConsider = (e) => {
    pages.setPages(e.detail.items);
  };

  const handleDndFinalize = (e) => {
    pages.setPages(e.detail.items);
  };
</script>

<section
  class="drag-menu"
  use:dndzone={{ items, ...dragOptions }}
  on:consider={handleDndConsider}
  on:finalize={handleDndFinalize}
>
  {#each items as item, itemIndex (item.id)}
    <div
      class="drag-menu__drag-item"
      animate:flip={{
        duration: dragOptions.flipDurationMs,
      }}
    >
      <PagesbarPage
        page={item}
        pageIndex={itemIndex}
        {editmode}
        {newlyAddedPageId}
        {setNewlyAddedPageId}
      />
    </div>
  {/each}
</section>

<style>
  .drag-menu {
    display: flex;
    /* this will allow the dragged element to scroll the list */
    padding: 0.1rem;
  }
  .drag-menu__drag-item {
    padding: 0.1rem 0.3rem;
    margin: 0 0.5rem;
    border-radius: 5px;
    cursor: pointer !important;
  }
  .drag-menu__drag-item:hover {
    background: var(--theme-colors-hover);
  }
</style>
