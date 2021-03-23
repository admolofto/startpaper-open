<script>
  import RangeSlider from 'svelte-range-slider-pips';

  export let selectedFontSize = '',
    fontSizes = ['small', 'medium', 'large', 'x-large'],
    defaultValue = 2;
  let values = [defaultValue];

  $: if (values[0] === 0) {
    selectedFontSize = fontSizes[0];
  } else if (values[0] === 1) {
    selectedFontSize = fontSizes[1];
  } else if (values[0] === 2) {
    selectedFontSize = fontSizes[2];
  } else {
    selectedFontSize = fontSizes[3];
  }
</script>

<div class="w-40">
  <RangeSlider bind:values step={1} max={3} />
</div>
