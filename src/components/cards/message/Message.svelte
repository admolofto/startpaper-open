<script>
  export let cardStore, cardId;

  $: font = $cardStore.font;
  $: fontSize = $cardStore.fontSize;
  $: fontColor = $cardStore.fontColor;
</script>

<div class={`message`}>
  <h1
    class="message__text"
    style="--font-size: {fontSize}; --font-color: {fontColor}; --font: {font};"
  >
    {$cardStore.customMessage}
  </h1>
</div>

<style>
  .message {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .message__text {
    text-align: center;
    font-size: var(--font-size);
    color: var(--font-color);
    font-family: var(--font);
  }
</style>
