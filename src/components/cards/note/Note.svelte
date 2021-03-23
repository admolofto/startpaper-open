<script>
  import marked from 'marked';
  import CardTemplate from '../CardTemplate.svelte';

  export let cardStore;

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
</script>

<CardTemplate>
  <div
    class="note"
    style="--font: {font}; --font-color: {fontColor}; --font-size: {fontSize};"
    on:mousedown={handleMousedown}
  >
    {#if focus}
      <textarea
        class="note__textarea"
        bind:value
        on:blur={handleBlur}
        bind:this={textareaElement}
      />
    {:else}
      {@html marked(value)}
    {/if}
  </div>
</CardTemplate>

<style>
  .note {
    width: 100%;
    height: 100%;
    font-family: var(--font);
    color: var(--font-color);
    font-size: var(--font-size);
  }
  .note__textarea {
    width: 100%;
    height: 100%;
    background: none;
    outline: none;
    resize: none;
  }
</style>
