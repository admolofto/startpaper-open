<script>
  import Pagesbar from './Pagesbar.svelte';
  import MenubarButton from './MenubarButton.svelte';

  export let editmode, setEditmode, addmode, setAddmode;

  const handleEditmodeClick = () => {
    setEditmode(!editmode);
  };

  const handleAddmodeClick = () => {
    setAddmode(!addmode);
  };
</script>

<div class="menubar">
  <div class="menubar__inner">
    <div class="menubar__section menubar__section-left">
      {#if editmode}
        <MenubarButton
          on:click={handleAddmodeClick}
          isActive={addmode}
          icon="grid-add"
          activeIcon="chevrons-left"
        />
      {/if}
    </div>
    <div class="menubar__section-middle">
      <Pagesbar {editmode} />
    </div>
    <div class="menubar__section menubar__section-right">
      <MenubarButton
        on:click={handleEditmodeClick}
        isActive={editmode}
        icon="startpaper"
        activeIcon="check"
        opacity={true}
      />
    </div>
  </div>
</div>

<style>
  .menubar {
    position: relative;
    padding: 1rem;
    z-index: 90;
  }
  .menubar__inner {
    position: relative;
    display: flex;
    justify-content: center;
  }
  .menubar__section {
    position: absolute;
  }
  .menubar__section-left {
    left: 0;
  }
  .menubar__section-right {
    right: 0;
  }
</style>
