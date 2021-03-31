<script>
  import InputColorPicker from '../../inputs/InputColorPicker.svelte';
  import OptionsSection from '../OptionsSection.svelte';
  import InputFontSizePicker from '../../inputs/InputFontSizePicker.svelte';

  export let cardStore;

  let selectedColor = $cardStore.fontColor;
  let selectedFontSize = $cardStore.fontSize;

  const fontSizes = ['32px', '36px', '40px', '44px'];

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
  <InputFontSizePicker
    bind:selectedFontSize
    {fontSizes}
    defaultValue={fontIndex}
  />
</OptionsSection>
