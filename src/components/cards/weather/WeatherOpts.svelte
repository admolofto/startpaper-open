<script>
  import InputText from '../../inputs/InputText.svelte';
  import OptionsSection from '../OptionsSection.svelte';

  export let cardStore;

  let valueZipCode = $cardStore.zipCode;

  const handleChangeName = () => {
    cardStore.setZipCode(valueZipCode);
  };
</script>

<OptionsSection layout="y" header="Zip code">
  <InputText
    bind:value={valueZipCode}
    on:change={handleChangeName}
  />
</OptionsSection>
