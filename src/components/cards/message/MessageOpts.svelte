<script>
  import InputColorPicker from '../../inputs/InputColorPicker.svelte';
  import OptionsSection from '../options/OptionsSection.svelte';
  import InputFontSizePicker from '../../inputs/InputFontSizePicker.svelte';

  export let cardStore;

  let selectedColor = $cardStore.fontColor;
  let selectedFontSize = $cardStore.fontSize;

  const fontSizes = [
    'medium',
    'large',
    'x-large',
    'xx-large',
  ];

  let fontIndex = fontSizes.findIndex(
    (item) => item === selectedFontSize
  );

  $: cardStore.setFontColor(selectedColor);
  $: cardStore.setFontSize(selectedFontSize);
</script>

<OptionsSection header="Font color">
  <InputColorPicker bind:selectedColor />
</OptionsSection>
<OptionsSection header="Font size">
  <p class="text-sm">Aa</p>
  <InputFontSizePicker
    bind:selectedFontSize
    {fontSizes}
    defaultValue={fontIndex}
  />
  <p class="text-lg">Aa</p>
</OptionsSection>
