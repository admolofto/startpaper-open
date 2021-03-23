<script>
  export let selectedColor = 'black';
  const handleColorClick = (color) => {
    selectedColor = color;
  };

  const colors = [
    'black',
    'white',
    'blue',
    'green',
    'red',
    'yellow',
  ];
</script>

<div class="color-picker">
  {#each colors as color}
    <button
      on:click={() => handleColorClick(color)}
      class="color-picker__color"
      class:color-picker__color--selected={color ===
        selectedColor}
      style="--color: {color}"
    />
  {/each}
</div>

<style>
  .color-picker {
    display: flex;
    align-items: center;
  }
  .color-picker__color {
    width: 1rem;
    height: 1rem;
    border: 1px solid grey;
    background: var(--color);
    border-radius: 5px;
  }
  .color-picker__color--selected {
    border-radius: 100%;
  }
</style>
