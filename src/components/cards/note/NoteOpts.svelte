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

<div class="flex flex-col space-y-5">
  <OptionsSection header="Font color">
    <InputColorPicker bind:selectedColor />
  </OptionsSection>
  <OptionsSection header="Font size">
    <p class="text-sm">Aa</p>
    <InputFontSizePicker bind:selectedFontSize />
    <p class="text-lg">Aa</p>
  </OptionsSection>
</div>
