<script>
  import { onMount } from "svelte";

  import Icon from "../Icon.svelte";

  export let error = false,
    inputType = "text",
    value = "",
    maxlength = -1,
    autoHighlight = false,
    handleEnterPress = () => {};

  let type = "text";

  let inputElement;

  $: if (inputType === "password") {
    type = "password";
  }

  const handleInput = (e) => {
    value = e.target.value;
  };

  const handleShowHideClick = () => {
    console.log("run");
    type === "password" ? (type = "text") : (type = "password");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEnterPress();
    }
  };

  onMount(() => {
    if (autoHighlight) {
      inputElement.select();
    }
  });
</script>

<div class="text-input">
  <input
    class="text-input__input"
    bind:this={inputElement}
    class:password={inputType === "password"}
    class:error
    {type}
    {value}
    {maxlength}
    on:input={handleInput}
    on:keydown={handleKeyDown}
    on:blur
    on:change
    autofocus
  />
  {#if inputType === "password"}
    <div class="text-input__show-button">
      <button on:click={handleShowHideClick}>
        <Icon
          icon={type === "password" ? "open-eye" : "closed-eye"}
          size="20"
        />
      </button>
    </div>
  {/if}
</div>

<style>
  .text-input {
    position: relative;
    width: 100%;
    max-width: 15rem;
  }
  .text-input__input {
    height: 2.5rem;
    padding: 0.5rem;
    width: 100%;
    border-radius: 5px;
    border: 1px solid rgba(220, 230, 230, 1);
  }
  .password {
    padding-right: 2rem;
  }
  .error {
    outline: red;
  }
  .text-input__show-button {
    position: absolute;
    top: 0;
    right: 0.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 1rem;
  }
</style>
