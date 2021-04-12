<script>
  import OptionsSection from '../OptionsSection.svelte';
  import InputFontSizePicker from '../../inputs/InputFontSizePicker.svelte';

  export let cardStore;

  let selectedFontSize = $cardStore.fontSize;

  const fontSizes = ['32px', '36px', '40px', '44px'];

  let fontIndex = fontSizes.findIndex(
    (item) => item === selectedFontSize
  );

  $: cardStore.setFontSize(selectedFontSize);
</script>

<OptionsSection header="Font size">
  <InputFontSizePicker
    bind:selectedFontSize
    {fontSizes}
    defaultValue={fontIndex}
  />
</OptionsSection>
