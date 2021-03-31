<script>
  import InputColorPicker from '../../inputs/InputColorPicker.svelte';
  import InputFontSizePicker from '../../inputs/InputFontSizePicker.svelte';
  import OptionsSection from '../OptionsSection.svelte';

  export let cardStore;

  let selectedColor = $cardStore.fontColor;
  let selectedFontSize = $cardStore.fontSize;

  const fontSizes = ['14px', '18px', '24px', '28px'];

  let fontIndex = fontSizes.findIndex(
    (item) => item === selectedFontSize
  );

  $: console.log(fontIndex);

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
