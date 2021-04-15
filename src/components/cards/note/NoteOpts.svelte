<script>
  import Icon from '../../Icon.svelte';
  import InputFontSizePicker from '../../inputs/InputFontSizePicker.svelte';
  import OptionsSection from '../OptionsSection.svelte';

  export let cardStore;

  let selectedColor = $cardStore.fontColor;
  let selectedFontSize = $cardStore.fontSize;

  const fontSizes = ['16px', '18px', '24px', '28px'];

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
<OptionsSection header="Syntax">
  <a
    href="https://www.markdownguide.org/basic-syntax/#headings"
  >
    <Icon icon="help" />
  </a>
</OptionsSection>
