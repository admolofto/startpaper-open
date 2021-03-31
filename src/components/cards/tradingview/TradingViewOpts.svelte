<script>
  import InputText from '../../inputs/InputText.svelte';
  import OptionsSection from '../OptionsSection.svelte';

  export let cardStore;

  let value = $cardStore.symbol;

  const handleChange = () => {
    cardStore.setSymbol(value);
  };
</script>

<OptionsSection header="Symbol" layout="y">
  <InputText bind:value on:change={handleChange} />
</OptionsSection>
