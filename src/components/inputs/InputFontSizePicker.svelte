<script>
  import RangeSlider from 'svelte-range-slider-pips';

  export let selectedFontSize = '',
    fontSizes = ['14px', '18px', '22px', '26px'],
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

<div class="font-size-picker">
  <p class="font-size-picker__label-small">Aa</p>
  <div class="font-size-picker__range-slider">
    <RangeSlider bind:values step={1} max={3} />
  </div>
  <p class="font-size-picker__label-large">Aa</p>
</div>

<style>
  .font-size-picker {
    display: flex;
    align-items: center;
  }
  .font-size-picker__range-slider {
    width: 8rem;
  }
  .font-size-picker__label-small {
    font-size: small;
  }
  .font-size-picker__label-large {
    font-size: large;
  }
</style>
