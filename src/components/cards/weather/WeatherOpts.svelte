<script>
  import InputText from '../../inputs/InputText.svelte';
  import OptionsSection from '../OptionsSection.svelte';
  import Select from 'svelte-select';


  export let cardStore;

  let valueZipCode = $cardStore.zipCode;

  const handleChangeName = () => {
    cardStore.setCity(valueCity);
  };
</script>

<OptionsSection layout="y" header="Zip code">
  <InputText
    bind:value={valueZipCode}
    on:change={handleChangeName}
  />
</OptionsSection>
