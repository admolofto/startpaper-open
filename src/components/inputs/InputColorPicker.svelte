<script>
  export let selectedColor = 'black';
  const handleColorClick = (color) => {
    selectedColor = color;
  };

  const colors = [
    'black',
    'white',
    'blue-600',
    'green-600',
    'red-600',
    'yellow-400',
  ];
</script>

<div class="flex items-center space-x-3">
  {#each colors as color}
    <button
      on:click={() => handleColorClick(color)}
      class={`w-6 h-6 border border-gray-400 bg-${color} ${
        selectedColor === color
          ? 'rounded-full'
          : 'rounded-sm'
      }`}
    />
  {/each}
</div>
