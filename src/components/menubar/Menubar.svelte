<script>
  import Pagesbar from './Pagesbar.svelte';
  import MenubarButton from './MenubarButton.svelte';
  import { ThemeToggle } from 'svelte-themer';
  import SettingsDropdown from './SettingsDropdown.svelte';

  export let editmode, setEditmode, addmode, setAddmode;

  let showSettings = false
  const setShowSettings = (bool) => {
    showSettings = bool
  }

  const handleEditmodeClick = () => {
    setEditmode(!editmode);
  };

  const handleAddmodeClick = () => {
    setAddmode(!addmode);
  };

  const handleSettingsClick = () => {
    setShowSettings(true)
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
      {#if editmode}
        <MenubarButton
          on:click={handleSettingsClick}
          icon="settings"
        />
        <div class="menubar__settings--dropdown">
          <SettingsDropdown showDropdown={showSettings} setShowDropdown={setShowSettings} />
        </div>
      {/if}
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
    position: fixed;
    width: 100%;
    padding: 1rem;
    z-index: 90;
    background: var(--theme-colors-background);
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

  .menubar__settings--dropdown {
    position: absolute;
    height: 30px;
    width: 30px;
  }
</style>
