<script>
  import marked from 'marked';
  import CardTemplate from '../CardTemplate.svelte';

  export let cardStore, cardId;

  let textareaElement = null;
  let value = $cardStore.contents;
  let focus = false;

  $: font = $cardStore.font || 'serif';
  $: fontSize = $cardStore.fontSize;
  $: fontColor = $cardStore.fontColor;

  const handleMousedown = () => {
    focus = true;
    setTimeout(() => {
      textareaElement.focus();
    }, 100);
  };

  const handleBlur = () => {
    focus = false;
  };

  const handleChange = () => {
    cardStore.setContents(value);
  };
</script>

<div
  class="note"
  style="--font: {font}; --font-color: {fontColor}; --font-size: {fontSize};"
  on:mousedown={handleMousedown}
>
  {#if focus}
    <textarea
      class="note__textarea"
      bind:value
      on:change={handleChange}
      on:blur={handleBlur}
      bind:this={textareaElement}
    />
  {:else}
    {@html marked(value)}
  {/if}
</div>

<style>
  .note {
    width: 100%;
    height: 100%;
    font-family: var(--font);
    color: var(--font-color);
    font-size: var(--font-size);
  }
  :global(.note h1) {
    font-size: 120%;
    font-weight: bold;
  }
  :global(.note h2) {
    font-size: 110%;
    font-weight: bold;
  }
  :global(.note h3) {
    font-size: 100%;
    font-weight: bold;
  }
  :global(.note blockquote) {
    padding-left: 1rem;
  }
  :global(.note ol) {
    list-style: decimal;
    list-style-position: outside;
    padding-left: 1rem;
  }
  :global(.note ul) {
    list-style: disc;
    list-style-position: outside;
    padding-left: 1rem;
  }
  .note__textarea {
    width: 100%;
    height: 100%;
    background: none;
    outline: none;
    resize: none;
  }
</style>
