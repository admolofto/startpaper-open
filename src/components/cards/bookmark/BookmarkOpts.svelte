<script>
  import InputText from '../../inputs/InputText.svelte';
  import OptionsSection from '../options/OptionsSection.svelte';

  export let cardStore;

  let valueName = $cardStore.name;
  let valueUrl = $cardStore.url;

  const handleChangeName = () => {
    cardStore.setName(valueName);
  };

  const handleChangeUrl = () => {
    cardStore.setUrl(valueUrl);
  };
</script>

<OptionsSection layout="y" header="Name">
  <InputText
    bind:value={valueName}
    on:change={handleChangeName}
  />
</OptionsSection>
<OptionsSection layout="y" header="URL">
  <InputText
    bind:value={valueUrl}
    on:change={handleChangeUrl}
  />
</OptionsSection>
