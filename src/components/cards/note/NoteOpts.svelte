<script>
  import InputColorPicker from '../../inputs/InputColorPicker.svelte';
  import InputFontSizePicker from '../../inputs/InputFontSizePicker.svelte';
  import OptionsSection from '../options/OptionsSection.svelte';

  export let cardStore;

  let selectedColor = 'black';
  let selectedFontSize = '';

  $: cardStore.setFontColor(selectedColor);
  $: cardStore.setFontSize(selectedFontSize);
</script>

<OptionsSection header="Font color">
  <InputColorPicker bind:selectedColor />
</OptionsSection>
<OptionsSection header="Font size">
  <InputFontSizePicker bind:selectedFontSize />
</OptionsSection>
