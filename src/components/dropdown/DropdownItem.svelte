<script>
  import App from "../../App.svelte";
  import Icon from "../Icon.svelte";
  import Toggle from "svelte-toggle";
  import InputNumberPicker from "../inputs/InputNumberPicker.svelte";

  export let icon = "",
    iconColor = "black",
    text = "",
    divider = false,
    header = false,
    toggle = false,
    toggleStatus = false,
    noHover = false,
    numberPicker = false;

  let iconSize = "20";
</script>

{#if divider}
  <div class="dropdown-item--divider" />
{:else if header}
  <div class="dropdown-item--header">
    <h1>{text}</h1>
  </div>
{:else if toggle}
  <button
    class="dropdown-item dropdown-item--toggle"
    class:hover={!noHover}
    on:click
  >
    <p>{text}</p>
    <Toggle toggled={toggleStatus} small hideLabel />
  </button>
{:else if numberPicker}
  <div class="dropdown-item dropdown-item--toggle" class:hover={!noHover}>
    <p>{text}</p>
    <InputNumberPicker />
  </div>
{:else}
  <button class="dropdown-item" class:hover={!noHover} on:click>
    <div class="dropdown-item__icon">
      <Icon {icon} size={iconSize} color={iconColor} />
    </div>
    <p>
      {text}
    </p>
  </button>
{/if}

<style>
  .dropdown-item {
    display: flex;
    align-items: center;
    padding: 0 0.25rem;
    height: 2rem;
    width: 100%;
    padding: 0 0.5rem;
  }
  .hover:hover {
    background: var(--theme-colors-hover);
  }
  .dropdown-item__icon {
    width: 2rem;
  }
  .dropdown-item--divider {
    width: 100%;
    border-top: 1px solid var(--theme-colors-border);
    margin: 0.25rem 0;
  }
  .dropdown-item--header {
    padding-left: 0.5rem;
    font-size: 14px;
    font-weight: 500;
  }
  .dropdown-item--toggle {
    justify-content: space-between;
  }
</style>
